import { useEffect, useRef, useState } from "react";
import "./App.css";
import Mx from "mxdraw";
import { drawPolyLine, drawAnyLine } from "./draw";


function App() {
  useEffect(() => {
    Mx.MxFun.createMxObject({
      canvasId: "mxdraw",
      callback: (mxobj, dom) => {
        console.log("load MxDraw finish", mxobj, dom);
      },
    });
  }, []);

  return (
    <div>
      <h1>CADCAM</h1>

      <button onClick={drawPolyLine}>polyline</button>
      <button onClick={drawAnyLine}>anyline</button>

      <div style={{ height: "80vh", overflow: "hidden" }}>
        <canvas id="mxdraw"></canvas>
      </div>
    </div>
  );
}

export default App;
