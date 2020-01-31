import {Container, Point, Sprite, Circle, IPoint, Graphics} from 'pixi.js';
import obstaclePng from './obstacle.png';

function magnitudePoint(p: Point): number {
  return Math.sqrt(p.x*p.x +  p.y*p.y);
}

export class Obstacle {
  public readonly transform: Container = new Container();
  private readonly sprite: Sprite;
  private direction: Point = new Point();

  // hitbox
  public readonly hitbox: Circle;
  private hitboxGraph = new Graphics();

  constructor() {
    this.sprite = Sprite.from(obstaclePng);
    this.sprite.scale = new Point(0.3, 0.3);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.transform.addChild(this.sprite);

    // hitbox
    this.hitbox = new Circle(0, 0, 19); // 19 is arbitrary value
    this.hitboxGraph.fill.alpha = 0.5;
    this.hitboxGraph.fill.color = 0xFF0000;
    this.hitboxGraph.fill.visible = true;
    this.hitboxGraph.drawShape(this.hitbox);
    this.transform.addChild(this.hitboxGraph);
  }

  public init(playerPos: IPoint) {
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
}
