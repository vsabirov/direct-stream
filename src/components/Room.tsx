import React from "react";

import VideoPlayer from "./VideoPlayer";
import Chat from "./Chat";

import "./Room.scss";

const Room: React.FC = () => {
  return (
    <div className="room">
      <VideoPlayer 
        source={process.env.REACT_APP_VIDEO_SOURCE || "/stream/stream.m3u8"} 
        format={process.env.REACT_APP_VIDEO_FORMAT || "application/vnd.apple.mpegurl"}
      />
      {
        process.env.REACT_APP_IS_CHAT_ENABLED ? <Chat /> : <></>
      }
    </div>
  )
}

export default Room;
