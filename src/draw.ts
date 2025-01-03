import Mx from "mxdraw";
import { getSnappedPoint } from "./drawAssist";

export const drawLine = async () => {
  const getPoint = new Mx.MrxDbgUiPrPoint();

  getPoint.setMessage("\nchoose start point");
  getPoint.go(async (status: number) => {
    if (status != Mx.MrxDbgUiPrBaseReturn.kOk) return;
    let pt1 = getPoint.value();
    let line = new Mx.MxDbLine();
    line.pt1 = pt1;
    getPoint.setMessage("\n choose end point");

    getPoint.setUserDraw((pt: any, pw: any) => {
      line.pt2 = pt;
      pw.drawCustomEntity(line);
    });
    let pt2 = await getPoint.go();
    line.pt2 = pt2!;
    Mx.MxFun.getCurrentDraw().addMxEntity(line);
  });
};

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

export const drawEllipse = async () => {
  const getPoint = new Mx.MrxDbgUiPrPoint();
  const ellipse = new Mx.MxDbEllipse();
  const pt1 = await getPoint.go();
  if (!pt1) return;
  ellipse.point1 = pt1;
  getPoint.setUserDraw((currentPoint, worldDraw) => {
    ellipse.point2 = currentPoint;
    worldDraw.drawCustomEntity(ellipse);
  });
  // 获取下一次鼠标点击的位置
  const pt2 = await getPoint.go();
  if (!pt2) return;
  ellipse.point2 = pt2;
  const mxDraw = Mx.MxFun.getCurrentDraw();
  mxDraw.addMxEntity(ellipse);
};

export const drawCircle = async () => {
  const getPoint = new Mx.MrxDbgUiPrPoint();
  const mxObj = Mx.MxFun.getCurrentDraw();
  const obj = new Mx.MxDbCircleShape();

  getPoint.setMessage("\nchoose center point");
  const center = await getPoint.go();
  if (!center) return;
  obj.center = center;
  getPoint.setUserDraw((currentPoint, worldDraw) => {
    obj.innerRadius = currentPoint;
    worldDraw.drawCircle(obj.center, obj.center.distanceTo(currentPoint));
  });

  getPoint.setMessage("\nchoose circle edge point");
  const pt = await getPoint.go();
  if (!pt) return;
  obj.xRadius = obj.yRadius = obj.center.distanceTo(pt);
  obj.isClosedToCenter = false;
  mxObj.addMxEntity(obj);
};
