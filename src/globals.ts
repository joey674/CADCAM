import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class GlobalContext {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  mousePosition: { x: number; y: number };

  constructor(canvas: HTMLCanvasElement) {
    // 场景
    this.scene = new THREE.Scene();

    // 相机
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -20,
      window.innerWidth / 20,
      window.innerHeight / 20,
      window.innerHeight / -20,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 10);
    this.camera.lookAt(0, 0, 0);

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // 控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableRotate = false;
    this.controls.enablePan = true;
    this.controls.screenSpacePanning = true;
    this.controls.enableDamping = true;

    // 鼠标位置
    this.mousePosition = { x: 0, y: 0 };

    // 添加坐标轴辅助线
    const axesHelper = new THREE.AxesHelper(1000);
    this.scene.add(axesHelper);

    // 监听窗口大小调整
    window.addEventListener("resize", this.onResize.bind(this));

    // 监听鼠标移动
    this.initMouseTracking();
  }

  // 窗口大小调整事件
  private onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.left = -width / 20;
    this.camera.right = width / 20;
    this.camera.top = height / 20;
    this.camera.bottom = -height / 20;
    this.camera.updateProjectionMatrix();
  }

  // 初始化鼠标跟踪
  private initMouseTracking() {
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onMouseMove = (event: MouseEvent): void => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);

      const intersection = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, intersection)) {
        this.mousePosition = {
          x: parseFloat(intersection.x.toFixed(2)),
          y: parseFloat(intersection.y.toFixed(2)),
        };
      }
    };

    this.renderer.domElement.addEventListener("mousemove", onMouseMove);
  }
}
export let globals: GlobalContext;

export function initGlobals(canvas: HTMLCanvasElement): GlobalContext {
  globals = new GlobalContext(canvas);
  return globals;
}
