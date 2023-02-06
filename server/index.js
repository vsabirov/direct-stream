const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { randomBytes } = require("crypto");
const { config } = require("./config");
const fs = require("fs");

__dirname = process.cwd();

const server = express();

// Generate a secret stream key for the broadcaster. 
// They use this value to gain access to the RTMP publish command.
const publishKey = Buffer.from(randomBytes(16)).toString("base64");

// Serve static files and the ui app from the "build" directory.
server.use(express.static(path.join(__dirname, "build")));
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Middleware for the API endpoints.
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

// Broadcast security.
server.post("/publish", (req, res) => {
  if(req.body.call !== "publish") {
    res.status(400).send();

    return;
  }

  if(req.body.name !== publishKey) {
    res.status(401).send();

    return;
  }

  res.status(200).send();
});

server.get("/play", (req, res) => {
  if(config.passKey && req.query.key !== config.passKey) {
    res.status(401).send();

    return;
  }

  const path = `/var/local/directstream/hls/${publishKey}.m3u8`;
  if(!fs.existsSync(path)) {
    res.status(404).send();

    return;
  }
  
  res.writeHead(200, {
    "Content-Type": "application/vnd.apple.mpegurl",
    "Cache-Control": "no-cache"
  });

  fs.createReadStream(path).pipe(res);
});

server.get("/frag", (req, res) => {
  if(config.passKey && req.query.key !== config.passKey) {
    res.status(401).send();

    return;
  }

  const path = `/var/local/directstream/hls/${publishKey}${req.query.fid}.ts`;
  if(!fs.existsSync(path)) {
    res.status(404).send();

    return;
  }

  res.writeHead(200, {
    "Content-Type": "video/mp2t",
    "Cache-Control": "no-cache"
  });

  fs.createReadStream(path).pipe(res);
});

// Chat functionality.
const chat = [];

server.get("/chat", (req, res) => {
  if(config.isChatEnabled === false) {
    res.status(403).send();

    return;
  }

  res.json({
    messages: chat
  });
});

server.post("/chat", (req, res) => {
  if(config.isChatEnabled === false) {
    res.status(403).send();

    return;
  }

  if(!req.body.message || !req.body.author) {
    res.status(400).send();

    return;
  }
  
  if(chat.length >= config.maxChatMessages) {
    chat.shift();
  }

  chat.push(req.body);

  res.status(201).send();
});

server.listen(config.port, () => {
  console.info(`Internal server is listening at port ${config.port}, serving ui from ${__dirname}.\n`);
  
  console.info(`If you're running this from a docker container packed with nginx configurations,
the stream UI will be available at port 80 in the browser.
You can start a stream by configuring RTMP custom connection to rtmp://<your_hostname>/stream.\n
Your secret key is: ${publishKey}
Use this value as the stream key in your streaming software.`
  );
});
