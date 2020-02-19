import {Container, Point, Sprite, Ticker} from 'pixi.js';
import obstaclePng from './obstacle.png';

function magnitudePoint(p: Point): number {
  return Math.sqrt(p.x*p.x +  p.y*p.y);
}

export class Obstacle {
  public readonly transform: Container = new Container();
  private readonly sprite: Sprite;
  private direction: Point = new Point();
  public enteredScreenOnce: boolean = false;
  public get spriteBounds() {
    return this.sprite.getBounds();
  }
  private readonly speedMultiplier = 3;

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

  public update(deltaTime: number): void {
    this.transform.position.x += this.direction.x * deltaTime * this.speedMultiplier;
    this.transform.position.y += this.direction.y * deltaTime * this.speedMultiplier;
  }

  destroy() {

  }
}
