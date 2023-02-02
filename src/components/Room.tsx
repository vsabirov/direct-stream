import React from "react";

import VideoPlayer from "./VideoPlayer";

import "./Room.scss";

const Room: React.FC = () => {
  return (
    <div className="room">
      <VideoPlayer 
        source={process.env.VIDEO_SOURCE || "/stream/stream.m3u8"} 
        format={process.env.VIDEO_FORMAT || "application/vnd.apple.mpegurl"}
      />
    </div>
  )
}

export default Room;
