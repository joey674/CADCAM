import Mx from "mxdraw";

const SNAP_RADIUS = 2;
let snapEnabled = true;

export const getSnappedPoint = async (point: THREE.Vector3) => {
  if (!snapEnabled) return point;
  if (!point) return point;

  const entities = Mx.MxFun.getCurrentDraw().getAllMxEntity();
  let closestPoint = null;
  let closestDistance = Number.MAX_VALUE;
  entities.forEach((entity) => {
    if (entity.getTypeName() === "MxDbLine") {
      [entity.pt1, entity.pt2].forEach((pt) => {
        const distance = point.distanceTo(pt);
        if (distance < closestDistance && distance <= SNAP_RADIUS) {
          closestDistance = distance;
          closestPoint = pt;
        }
      });
    } else if (entity.getTypeName() === "MxDbPolyline") {
      entity.points.forEach((pt) => {
        const distance = point.distanceTo(pt);
        if (distance < closestDistance && distance <= SNAP_RADIUS) {
          closestDistance = distance;
          closestPoint = pt;
        }
      });
    }
  });

  return closestPoint || point;
};

export const enableSnap = () => {
  snapEnabled = true;
};

export const disableSnap = () => {
  snapEnabled = false;
};
