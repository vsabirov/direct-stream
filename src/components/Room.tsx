import React from "react";

import HLSPlayer from "./HLSPlayer";
import Chat from "./Chat";

import "./Room.scss";
import RoomProps from "../models/RoomProps";

const Room: React.FC<RoomProps> = (props: RoomProps) => {
  return (
    <div className="room">
      <HLSPlayer
        source={`/play?key=${props.passKey}`}
        fragSource={`/frag?key=${props.passKey}`}
      />
      {
        process.env.REACT_APP_IS_CHAT_ENABLED ? <Chat /> : <></>
      }
    </div>
  )
}

export default Room;
