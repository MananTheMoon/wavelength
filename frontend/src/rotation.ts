import Konva from "konva";

const rotatePoint = ({ x, y }, rad) => {
  const rcos = Math.cos(rad);
  const rsin = Math.sin(rad);
  return { x: x * rcos - y * rsin, y: y * rcos + x * rsin };
};

export const rotateAroundCenter = (node: Konva.Node, rotation) => {
  const topLeft = { x: -603, y: -545 };
  const current = rotatePoint(topLeft, node.rotation() * 0.0174);
  const rotated = rotatePoint(topLeft, rotation * 0.0174);
  const dx = rotated.x - current.x,
    dy = rotated.y - current.y;

  node.rotation(rotation);
  node.x(node.x() + dx);
  node.y(node.y() + dy);
  node.to({
    duration: 1,
    easing: Konva.Easings.EaseIn,
  });
};

export const findAngle = (A, B, C) => {
  var AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
  var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
  var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
  const rad = Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
  return (rad * 180) / Math.PI;
};

export const topCap = (n: number, cap: number) => {
  return n > cap ? cap : n;
};

export const bottomCap = (n: number, cap: number) => {
  return n < cap ? cap : n;
};

export const cap = (n: number, top: number, bottom: number) => {
  return bottomCap(topCap(n, top), bottom);
};
