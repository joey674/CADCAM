import * as THREE from "three";
import { globals } from "./globals";
import { getPointsClick } from "./interact";

export interface Point {
  x: number;
  y: number;
}

abstract class Geometry {
  abstract draw(): Promise<void>;
  abstract set(...args: any[]): Promise<void>;
  abstract show(): Promise<void>;
  async setLaserProperty(): Promise<void> {
    console.log("not defined yet");
  }
}

class Line extends Geometry {
  private startPoint!: Point;
  private endPoint!: Point;

  async draw(): Promise<void> {
    console.log("drawLine");
    this.startPoint = await getPointsClick();
    this.endPoint = await getPointsClick();
  }

  async set(startPoint: Point, endPoint: Point): Promise<void> {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  async show(): Promise<void> {
    const points = [];
    points.push(new THREE.Vector3(this.startPoint.x, this.startPoint.y, 0));
    points.push(new THREE.Vector3(this.endPoint.x, this.endPoint.y, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry);
    globals.scene.add(line);
  }
}

class Circle extends Geometry {
  private center!: Point;
  private radius!: number;

  async draw(): Promise<void> {
    this.center = await getPointsClick();
    const edge = await getPointsClick();
    this.radius = Math.sqrt(
      (edge.x - this.center.x) ** 2 + (edge.y - this.center.y) ** 2
    );
  }

  async show(): Promise<void> {
    const curve = new THREE.EllipseCurve(
      this.center.x,
      this.center.y,
      this.radius,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    const points = curve.getPoints(1000);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const circle = new THREE.Line(geometry);

    globals.scene.add(circle);
  }

  async set(center: Point, radius: number): Promise<void> {
    this.center = center;
    this.radius = radius;
  }
}

class Curve extends Geometry {
  async draw(): Promise<void> {
    console.log("drawCurve");
  }

  async show(): Promise<void> {
    console.log("showCurve");
  }

  async set(...args: any[]): Promise<void> {
    console.log("setCurve");
  }

  async setLaserProperty(): Promise<void> {
    console.log("setLaserProperty for Curve");
  }
}

export { Line, Circle, Curve };
