// import * as THREE from "three";
// import { globals } from "./globals";
import { Line, Circle } from "./geometry";

export const test = async () => {
  console.log("test");
  /*   const points = [];
  points.push(new THREE.Vector3(10, 10, 0));
  points.push(new THREE.Vector3(-10, 10, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry);
  globals.scene.add(line);

  // sleep for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("", globals.scene.children);

  globals.scene.remove(line);
  console.log("", globals.scene.children); */
};

export const drawLine = async () => {
  const line = new Line();
  await line.draw();
  await line.show();
};

export const drawCircle = async () => {
  const circle = new Circle();
  await circle.draw();
  await circle.show();
};

export const drawPolyLine = async () => {};

export const drawAnyLine = async () => {};

export const drawEllipse = async () => {};
