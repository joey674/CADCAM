import React, { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
import "./App.css";
import { createCursorHelper, updateCursorHelper } from "./cursorHelper.ts";
import { globals, initGlobals } from "./globals";
import {
  drawLine,
  drawPolyLine,
  drawAnyLine,
  test,
  drawEllipse,
  drawCircle,
} from "./draw";
import { selectObject } from "./interact";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current && cursorRef.current) {
      // init globals
      initGlobals(canvasRef.current);

      // animate scene
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
      const interval = setInterval(updateMousePosition, 10);

      // create cursor helper
      const changeCursorPosition = (event: MouseEvent) => {
        const cursor = cursorRef.current!;
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
      };
      window.addEventListener("mousemove", changeCursorPosition);
      // 
      selectObject();
    }
  }, []);

  return (
    <div>
      <h1>CADCAM</h1>
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

      <div ref={cursorRef} className="custom-cursor">
      </div>

      <canvas
        ref={canvasRef}
        id="canvas"
        style={{ width: "100%", height: "100%" ,cursor: "none"}}
      />
    </div>
  );
}

export default App;
