const Stream = require('node-rtsp-stream');
const express =  require("express");
const expressWebSocket = require("express-ws");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath("ffmpeg");
const webSocketStream = require("websocket-stream/stream");
 
// config
const rtspServerPort = 9998;

const app = express();
app.use(express.static(__dirname));
expressWebSocket(app, null, {
    perMessageDeflate: true
});
app.ws("*", (ws) => {
  console.log("rtsp request handle");
    const stream = webSocketStream(ws, {
        binary: true,
        browserBufferTimeout: 1000000
    }, {
        browserBufferTimeout: 1000000
    });
    try {
      ffmpeg("rtsp://localhost:554/test")
        .addInputOption("-rtsp_transport", "tcp", "-buffer_size", "102400")  // 这里可以添加一些 RTSP 优化的参数
        .on("start", function () {
            console.log("Stream started.");
        })
        .on("codecData", function () {
            console.log("Stream codecData.")
          // 摄像机在线处理
        })
        .on("error", function (err) {
            console.log("An error occured: ", err.message);
        })
        .on("end", function () {
            console.log("Stream end!");
          // 摄像机断线的处理
        })
        .outputFormat("flv").videoCodec("libx264").noAudio().pipe(stream);
    } catch (error) {
      console.log(error);
    }
})
app.listen(rtspServerPort);

console.log("express listened on port : " + rtspServerPort)

// // Name of the stream, used to identify it in the API
new Stream({
  name: 'socket',
  streamUrl: 'rtsp://localhost:554/test',
  wsPort: 9999,
  ffmpegOptions: {
    '-stats': '',
    '-r': 20,
    '-s': '1280 720'
  }
});