import * as THREE from "three";
import { globals } from "./globals";
import { Point } from "./geometry";

function getPointsClick(): Promise<Point> {
  return new Promise((resolve) => {
    const onClick = () => {
      let { x, y } = globals.mousePosition;
      globals.renderer.domElement.removeEventListener("click", onClick);
      resolve({ x, y });
    };

    globals.renderer.domElement.addEventListener("click", onClick);
  });
}

export { getPointsClick };

// TODO

// export function getLeftClick() {
//   return new Promise((resolve) => {
//     const onClick = () => {
//       globals.renderer.domElement.removeEventListener("click", onClick);
//       resolve({
//         x: globals.mousePosition.x,
//         y: globals.mousePosition.y,
//         isLeftClick: true,
//       });
//     };

//     globals.renderer.domElement.addEventListener("click", onClick);
//   });
// }
// export function getRightClick() {
//   return new Promise((resolve) => {
//     const onRightClick = (event) => {
//       event.preventDefault();
//       globals.renderer.domElement.removeEventListener(
//         "contextmenu",
//         onRightClick
//       );
//       resolve({
//         x: globals.mousePosition.x,
//         y: globals.mousePosition.y,
//         isRightClick: true,
//       });
//     };

//     globals.renderer.domElement.addEventListener("contextmenu", onRightClick);
//   });
// }

// export const test = async () => {
//   console.log("test");
//   const points = [];
//   points.push(new THREE.Vector3(10, 10, 0));
//   points.push(new THREE.Vector3(-10, 10, 0));

//   const geometry = new THREE.BufferGeometry().setFromPoints(points);
//   const line = new THREE.Line(geometry);
//   globals.scene.add(line);
// };

// export const drawLine = async () => {
//   console.log("drawLine");
//   const points = [];
//   const pt1 = await getLeftClick();
//   points.push(new THREE.Vector3(pt1.x, pt1.y, 0));

//   const pt2 = await getLeftClick();
//   points.push(new THREE.Vector3(pt2.x, pt2.y, 0));

//   const geometry = new THREE.BufferGeometry().setFromPoints(points);
//   const line = new THREE.Line(geometry);
//   globals.scene.add(line);
// };

// export const drawPolyLine = async () => {
//   console.log("drawPolyLine");
//   const points = [];

//   while (true) {
//     const pt = getLeftClick();
//     const stop = getRightClick();
//     const result = await Promise.race([pt, stop]);
//     console;

//     if (result.isRightClick) {
//       console.log("stop");
//       break;
//     } else {
//       console.log("add point");
//       points.push(new THREE.Vector3(result.x, result.y, 0));
//     }
//   }

//   if (points.length > 1) {
//     const geometry = new THREE.BufferGeometry().setFromPoints(points);
//     const line = new THREE.Line(geometry);
//     globals.scene.add(line);
//   }
// };

// export const drawAnyLine = async () => {
//   console.log("drawAnyLine");
// };
