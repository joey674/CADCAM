import Mx from "mxdraw";
import { getSnappedPoint } from "./drawAssist";

export const drawPolyLine = async () => {
  let line = new Mx.MxDbPolyline();
  const getPoint = new Mx.MrxDbgUiPrPoint();

  while (true) {
    let pt = await getPoint.go();
    let snappedPt = await getSnappedPoint(pt!);

    if (!snappedPt) break;
    line.addVertexAt(snappedPt);

    getPoint.setUserDraw((currentPoint, worldDrawComment) => {
      let tempPolyline = line.clone();
      tempPolyline.addVertexAt(currentPoint);
      worldDrawComment.drawCustomEntity(tempPolyline);
    });
  }

  Mx.MxFun.getCurrentDraw().addMxEntity(line);
};

export const drawAnyLine = async () => {
  const line = new Mx.MxDbAnyLine();
  const getPoint = new Mx.MrxDbgUiPrPoint();
  const pt1 = await getPoint.go();
  if (!pt1) return;
  line.points.push(pt1);

  getPoint.setUserDraw((currentPoint, worldDrawComment) => {
    line.points.push(currentPoint.clone());
    worldDrawComment.drawCustomEntity(line);
  });

  const pt2 = await getPoint.go();
  if (!pt2) return;
  line.points.push(pt2);

  Mx.MxFun.getCurrentDraw().addMxEntity(line);
};

export const drawEllipse = async () => {};
export const drawCircle = async () => {};
