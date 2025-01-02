import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import "./App.css";
import { globals, initGlobals } from "./globals";
import {
  drawLine,
  drawPolyLine,
  drawAnyLine,
  test,
  drawEllipse,
  drawCircle,
} from "./draw";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      initGlobals(canvasRef.current);
      const animate = () => {
        requestAnimationFrame(animate);
        globals.controls.update();
        globals.renderer.render(globals.scene, globals.camera);
      };
      animate();

      // update mousePosition
      const updateMousePosition = () => {
        setMousePosition({
          x: globals.mousePosition.x,
          y: globals.mousePosition.y,
        });
      };
      const interval = setInterval(updateMousePosition, 50);
    }
  }, []);

  return (
    <div>
      <h1>yCAMCAD-THREE</h1>
      <button onClick={drawLine}>line</button>
      <button onClick={drawPolyLine}>polyline</button>
      <button onClick={drawAnyLine}>anyline</button>
      <button onClick={drawCircle}>circle</button>
      <button onClick={drawEllipse}>ellipse</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>undefined</button>
      <button onClick={test}>test</button>

      <div className="mouse-position">
        <div>mousePosition</div>
        <div>
          X: {mousePosition.x}, Y: {mousePosition.y}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        id="canvas"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default App;
