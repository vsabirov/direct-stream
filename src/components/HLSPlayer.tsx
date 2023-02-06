import React, { useEffect, useRef } from "react";

import Hls from "hls.js";

import HLSPlayerProps from "../models/HLSPlayerProps";

import "./HLSPlayer.scss";

const HLSPlayer: React.FC<HLSPlayerProps> = (props: HLSPlayerProps) => {
  const video: React.MutableRefObject<HTMLVideoElement | null> = useRef(null);
  
  useEffect(() => {
    if(Hls.isSupported()) {
      let hls = new Hls({
        xhrSetup: (xhr: XMLHttpRequest, url: string) => {
          if(url.endsWith(".ts")) {
            url = url.substring(0, url.lastIndexOf("/")) + props.fragSource + "&fid=" + 
                    url.substring(url.lastIndexOf("-"), url.lastIndexOf("."));
            
            xhr.open("GET", url, true);
          }
        }
      });

      hls.loadSource(props.source);
      hls.attachMedia(video.current as HTMLMediaElement);
    }
    else if(video.current?.canPlayType("application/vnd.apple.mpegurl")) {
      video.current.src = props.source;
    }
  }, [video]);

  return (
    <div className="video-player">
      <video ref={video} controls preload="none" />
    </div>
  );
};

export default HLSPlayer;
