# Overview
This is a streaming service packed into a single Docker Container. It allows you to stream media and view media from the browser.

The stream UI is written using React and TypeScript, and the server for serving app bundles and a little bit of business logic is written in JavaScript using express.

# Capabilities
- Stream media using RTMP from any video streaming software that supports RTMP (OBS, VLC, etc.);
- View the stream from a web application in the browser;
- Chat that doesn't require users to register or specify a name. Supports timeouts, slow-mode and bans.
- Stream recordings. Pull them out of the Docker Container using Docker Volumes.

# Pros
- RTMP networking is handled by an internal NginX RTMP module written in C. Doesn't throttle the business logic server.
- Content and moderation independency: Only You decide what's allowed on your broadcast, and what is not.
- Easy to deploy in a production environment: Build the Image and run the Container. 2 simple commands.
- No useless features. Existing features are configurable.

# Cons
- Relatively slow Docker Image build time. This is due to NginX being compiled from source including the RTMP module, as well as the React app being built and all the NPM packages are being installed.
- Requires your own dedicated server or a VDS if you want to stream to the public internet. This is usually not free.

# Deploying
Deploying this service to a production environment requires Docker to be installed on the system, and a clone/download of this repo available on disk.

Building the Image:
```
docker build . -t direct-stream
```

This might take a couple of minutes, the long build time is normal.

Run the container:
```
docker run -p "80:80" -p "1935:1935" direct-stream -d
```

You're now ready to start streaming and accepting guests on your broadcast.

# Usage

TBD