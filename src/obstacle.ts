import {Container, Point, Sprite} from 'pixi.js';
import obstaclePng from './obstacle.png';

function magnitudePoint(p: Point): number {
  return Math.sqrt(p.x*p.x +  p.y*p.y);
}

export class Obstacle {
  public readonly transform: Container = new Container();
  private readonly sprite: Sprite;
  private direction: Point = new Point();

  constructor() {
    this.sprite = Sprite.from(obstaclePng);
    this.sprite.scale = new Point(0.3, 0.3);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.transform.addChild(this.sprite);
  }

  public init(playerPos: PIXI.IPoint) {
    const obstacleToPlayer: Point = new Point(
        playerPos.x - this.transform.x,
        playerPos.y - this.transform.y
    );
    const diffMagnitude = magnitudePoint(obstacleToPlayer);

    // unit vector towards player
    this.direction = new Point(
        obstacleToPlayer.x / diffMagnitude,
        obstacleToPlayer.y / diffMagnitude
    );
  }

  public update(): void {
    this.transform.position.x += this.direction.x;
    this.transform.position.y += this.direction.y;
  }

  destroy() {

  }
}
