const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config").data;

__dirname = process.cwd();

const server = express();

// Serve static files and the ui app from the "build" directory.
server.use(express.static(path.join(__dirname, "build")));
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.use(bodyParser.json());

// Chat functionality.
const chat = [];

server.get("/api/chat", (req, res) => {
  if(config.isChatEnabled === false) {
    res.status(403).send();

    return;
  }

  res.json({
    messages: chat
  });
});

server.post("/api/chat", (req, res) => {
  if(config.isChatEnabled === false) {
    res.status(403).send();

    return;
  }
  
  if(chat.length >= config.maxChatMessages) {
    chat = chat.slice(1);
  }

  chat.push(req.body);

  res.status(201).send();
});

server.listen(config.port, () => {
  console.info(`Internal server is listening at port ${config.port}, serving ui from ${__dirname}.\n`);
  
  console.info(`If you're running this from a docker container packed with nginx configurations,
the stream UI will be available at port 80 in the browser.
You can start a stream by configuring RTMP custom connection to rtmp://<your_hostname>/stream.`
  );
});
