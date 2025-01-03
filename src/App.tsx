import { useEffect, useRef, useState } from "react";
import "./App.css";
import Mx from "mxdraw";
import { drawPolyLine, drawAnyLine , drawLine, drawEllipse, drawCircle} from "./draw";


function App() {
  useEffect(() => {
    Mx.MxFun.createMxObject({
      canvasId: "mxdraw",
      callback: (mxobj, dom) => {
        console.log("load MxDraw finish", mxobj, dom);
      },
    });

    /* add axis */
    const setAxis= () => {
      let axis = new Mx.MxDbLine();
      axis.pt1 = new THREE.Vector3(-100, 0, 0);
      axis.pt2 = new THREE.Vector3(100, 0, 0);
      Mx.MxFun.getCurrentDraw().addMxEntity(axis);
      axis = new Mx.MxDbLine();
      axis.pt1 = new THREE.Vector3(0, -100, 0);
      axis.pt2 = new THREE.Vector3(0, 100, 0);
      Mx.MxFun.getCurrentDraw().addMxEntity(axis);
    }
    setAxis();

    /* add command hint */
    Mx.MxFun.addCommand("drawLine", () => {
      if (Mx.MxFun.isRunningCommand()) {
          return
      }
      drawLine()
    })
    Mx.MxFun.addCommand("drawCircle", () => {
      if (Mx.MxFun.isRunningCommand()) {
          return
      }
      drawCircle()
    })
    Mx.MxFun.listenForCommandLineInput(({ msCmdTip, msCmdDisplay, msCmdText }) => {
      // console.log(msCmdTip, msCmdDisplay, msCmdText)
      document.getElementById('mxCmdArea')!.innerHTML = msCmdTip;
      document.getElementById("mxCmdArea")!.scrollTop = document.getElementById("mxCmdArea")!.scrollHeight;
    })



  }, []);

  return (
    <div>
      <h1>CADCAM</h1>
      <button onClick={drawLine}>line</button>
      <button onClick={drawPolyLine}>polyline</button>
      <button onClick={drawAnyLine}>anyline</button>
      <button onClick={drawCircle}>circle</button>
      <button onClick={drawEllipse}>ellipse</button>
      {/* <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>test</button> */}


      <div style={{ height: "80vh", overflow: "hidden" }}>
        <canvas id="mxdraw"></canvas>
      </div>
      <div>
        <textarea
          id="mxCmdArea"
          rows={5}
          style={{ width: "100%", overflow: "scroll" }}
          placeholder="command..."
          readOnly 
        > command </textarea>
        <input type="text" id="mxCmdText" />
      </div>
    </div>
  );
}

export default App;
