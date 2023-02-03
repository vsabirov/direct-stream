import React, { useEffect, useRef } from "react";

import Hls from "hls.js";

import VideoPlayerProps from "../models/VideoPlayerProps";

import "./VideoPlayer.scss";

const VideoPlayer: React.FC<VideoPlayerProps> = (props: VideoPlayerProps) => {
  const video: React.MutableRefObject<HTMLVideoElement | null> = useRef(null);
  
  useEffect(() => {
    if(Hls.isSupported()) {
      let hls = new Hls();

      hls.loadSource(props.source);
      hls.attachMedia(video.current as HTMLMediaElement);
    }
    else if(video.current?.canPlayType(props.format)) {
      video.current.src = props.source;
    }
  });

  return (
    <div className="video-player">
      <video ref={video} controls preload="none" />
    </div>
  );
};

export default VideoPlayer;
