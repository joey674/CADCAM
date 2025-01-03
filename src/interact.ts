import * as THREE from "three";
import { globals } from "./globals";
import { Point } from "./geometry";

/**
 * get left click
 */
export function getLeftClick(): Promise<void> {
  return new Promise((resolve) => {
    const onClick = () => {
      globals.renderer.domElement.removeEventListener("click", onClick);
      resolve();
    };

    globals.renderer.domElement.addEventListener("click", onClick);
  });
}

/**
 * get right click
 */
export function getRightClick(): Promise<void> {
  return new Promise((resolve) => {
    const onRightClick = (event: MouseEvent) => {
      event.preventDefault();
      globals.renderer.domElement.removeEventListener(
        "contextmenu",
        onRightClick
      );
      resolve();
    };

    globals.renderer.domElement.addEventListener("contextmenu", onRightClick);
  });
}

/**
 * select Object
 */
export function selectObject(): Promise<THREE.Object3D> {
  return new Promise((resolve) => {
    const onClick = (event: MouseEvent) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, globals.camera);

      const intersects = raycaster.intersectObjects(globals.scene.children);
      if (intersects.length > 0) {
        globals.renderer.domElement.removeEventListener("click", onClick);
        resolve(intersects[0].object);
      }
    };

    globals.renderer.domElement.addEventListener("click", onClick);
  });
}

/* export const test = async () => {
  console.log("test");
  const points = [];
  points.push(new THREE.Vector3(10, 10, 0));
  points.push(new THREE.Vector3(-10, 10, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry);
  globals.scene.add(line);
};

export const drawLine = async () => {
  console.log("drawLine");
  const points = [];
  const pt1 = await getLeftClick();
  points.push(new THREE.Vector3(pt1.x, pt1.y, 0));

  const pt2 = await getLeftClick();
  points.push(new THREE.Vector3(pt2.x, pt2.y, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry);
  globals.scene.add(line);
};

export const drawPolyLine = async () => {
  console.log("drawPolyLine");
  const points = [];

  while (true) {
    const pt = getLeftClick();
    const stop = getRightClick();
    const result = await Promise.race([pt, stop]);
    console;

    if (result.isRightClick) {
      console.log("stop");
      break;
    } else {
      console.log("add point");
      points.push(new THREE.Vector3(result.x, result.y, 0));
    }
  }

  if (points.length > 1) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry);
    globals.scene.add(line);
  }
};

export const drawAnyLine = async () => {
  console.log("drawAnyLine");
};
 */
