import {Circle, Point} from 'pixi.js';

export function rectRect(r1: PIXI.Rectangle, r2: PIXI.Rectangle): boolean {
  return !(r1.top > r2.bottom
      || r1.bottom < r2.top
      || r1.left > r2.right
      || r1.right < r2.left);
}

export function circCirc(r1: PIXI.Circle, r2: PIXI.Circle): boolean {
  const bothRadius = r1.radius + r2.radius;
  const diff = new Point(
      r1.x - r2.x,
      r1.y - r2.y,
  );
  const distance = Math.sqrt(diff.x*diff.x + diff.y*diff.y);

  return distance <= bothRadius;
}
