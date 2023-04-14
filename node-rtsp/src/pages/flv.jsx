import React, { useEffect, useRef } from 'react';
import flvjs from 'flv.js';

export default function FlvPlayer() {
  const flvRef = useRef(null);
  useEffect(() => {
    // 根据你后端 RTSP 推流服务转的 WebSocket 地址修改
    const videoElement = document.getElementById('videoElement');
    if (flvjs.isSupported()) {
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: 'ws://localhost:9998',
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvRef.current = flvPlayer;
      // flvPlayer.play();
    }
  }, []);

  return (
    <div>
      <h1>Flv.js Player</h1>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <video id="videoElement" controls></video>
        <button onClick={() => {flvRef?.current?.play()}}>Play</button>
      </div>
    </div>
  );
}