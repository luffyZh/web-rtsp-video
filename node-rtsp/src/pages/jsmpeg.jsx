import React, { useEffect } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

export default function JsmpegPlayer() {

  useEffect(() => {
    // 根据你后端 RTSP 推流服务转的 WebSocket 地址修改
    new JSMpeg.VideoElement('#video', 'ws://localhost:9999');
  }, []);

  return (
    <div>
      <h1>Jsmpeg Player</h1>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div id="video" style={{ width: 640, height: 360 }}></div>
      </div>
    </div>
  );
}