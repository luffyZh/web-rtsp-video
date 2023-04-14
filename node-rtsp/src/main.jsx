import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import JsmpegPlayer from './pages/jsmpeg';
import FlvPlayer from './pages/flv';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <a href='/jsmpeg'>Jsmpeg Player</a>
        <br />
        <a href='/flv'>
          Flv.js Player
        </a>
      </div>
    ),
  },
  {
    path: "/jsmpeg",
    element: <JsmpegPlayer />,
  },
  {
    path: "/flv",
    element: <FlvPlayer />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
