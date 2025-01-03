import * as THREE from "three";

// 创建鼠标辅助标记
export function createCursorHelper(): THREE.Sprite {
  const material = new THREE.SpriteMaterial({
    color: 0xffffff,
    sizeAttenuation: false, // 禁止随距离缩放
  });

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(10, 10, 1); // 固定大小，屏幕像素单位
  return sprite;
}

// 更新鼠标辅助标记位置
export function updateCursorHelper(
  cursorHelper: THREE.Sprite,
  mousePosition: { x: number; y: number }
) {
  cursorHelper.position.set(mousePosition.x, mousePosition.y, 0);
}
