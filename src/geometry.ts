import * as THREE from "three";
import { globals } from "./globals";
import { getLeftClick } from "./interact";

/**
 * Point interface
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Geometry abstract class
 */
abstract class Geometry {
  abstract draw(): Promise<void>;
  abstract set(...args: any[]): Promise<void>;
  abstract show(): Promise<THREE.Object3D>;
  async setLaserProperty(): Promise<void> {
    console.log("not defined yet");
  }
}

/**
 * Line class
 */
export class Line extends Geometry {
  private startPoint!: Point;
  private endPoint!: Point;

  /**
   * set line by drawing
   */
  async draw(): Promise<void> {
    console.log("drawLine");

    await getLeftClick();
    this.startPoint = {
      x: globals.mousePosition.x,
      y: globals.mousePosition.y,
    };

    let tmpLine: THREE.Line | undefined;
    const onMouseMove = async () => {
      if (tmpLine) {
        globals.scene.remove(tmpLine);
      }
      const tmpEndPoint = {
        x: globals.mousePosition.x,
        y: globals.mousePosition.y,
      };

      tmpLine = await this.show(this.startPoint, tmpEndPoint);
    };
    globals.renderer.domElement.addEventListener("mousemove", onMouseMove);

    await getLeftClick();
    this.endPoint = {
      x: globals.mousePosition.x,
      y: globals.mousePosition.y,
    };
    globals.renderer.domElement.removeEventListener("mousemove", onMouseMove);
  }

  /**
   * set line by input data
   * @param startPoint
   * @param endPoint
   */
  async set(startPoint: Point, endPoint: Point): Promise<void> {
    console.log("setLine");
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  /**
   * use self to be default value
   * @param startPoint
   * @param endPoint
   * @returns line object
   */
  async show(
    startPoint: Point = this.startPoint,
    endPoint: Point = this.endPoint
  ): Promise<THREE.Line> {
    console.log("showLine");
    const points = [];
    points.push(new THREE.Vector3(startPoint.x, startPoint.y, 0));
    points.push(new THREE.Vector3(endPoint.x, endPoint.y, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry);
    globals.scene.add(line);
    return line;
  }
}

/**
 * Circle class
 */
export class Circle extends Geometry {
  private centerPoint!: Point;
  private radius!: number;

  /**
   * set circle by drawing
   */
  async draw(): Promise<void> {
    console.log("drawCircle");

    await getLeftClick();
    this.centerPoint = {
      x: globals.mousePosition.x,
      y: globals.mousePosition.y,
    };

    let tmpCircle: THREE.Line | undefined;
    const onMouseMove = async () => {
      if (tmpCircle) {
        globals.scene.remove(tmpCircle);
      }

      const tmpEdgePoint = {
        x: globals.mousePosition.x,
        y: globals.mousePosition.y,
      };
      const tmpRadius = Math.sqrt(
        (tmpEdgePoint.x - this.centerPoint.x) ** 2 +
          (tmpEdgePoint.y - this.centerPoint.y) ** 2
      );
      tmpCircle = await this.show(this.centerPoint, tmpRadius);
    };
    globals.renderer.domElement.addEventListener("mousemove", onMouseMove);

    await getLeftClick();
    const edgePoint = {
      x: globals.mousePosition.x,
      y: globals.mousePosition.y,
    };
    this.radius = Math.sqrt(
      (edgePoint.x - this.centerPoint.x) ** 2 +
        (edgePoint.y - this.centerPoint.y) ** 2
    );
    globals.renderer.domElement.removeEventListener("mousemove", onMouseMove);
  }

  /**
   * show circle
   * @param centerPoint
   * @param radius
   * @returns circle object
   */
  async show(
    centerPoint: Point = this.centerPoint,
    radius: number = this.radius
  ): Promise<THREE.Line> {
    const curve = new THREE.EllipseCurve(
      centerPoint.x,
      centerPoint.y,
      radius,
      radius,
      0,
      2 * Math.PI,
      false
    );
    const points = curve.getPoints(50 * (radius + 1));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const circle = new THREE.Line(geometry);

    globals.scene.add(circle);

    return circle;
  }

  /**
   * set circle by input data
   * @param center
   * @param radius
   */
  async set(center: Point, radius: number): Promise<void> {
    this.centerPoint = center;
    this.radius = radius;
  }
}

// class Curve extends Geometry {
//   async draw(): Promise<void> {
//     console.log("drawCurve");
//   }

//   async show(): Promise<void> {
//     console.log("showCurve");
//   }

//   async set(...args: any[]): Promise<void> {
//     console.log("setCurve");
//   }

//   async setLaserProperty(): Promise<void> {
//     console.log("setLaserProperty for Curve");
//   }
// }
