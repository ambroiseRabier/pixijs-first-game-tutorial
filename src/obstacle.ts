import {Point, Sprite, Container} from 'pixi.js';
import obstaclePng from './obstacle.png';

export class Obstacle {
  public readonly transform: Container = new Container();
  private readonly sprite: Sprite;

  constructor() {
    this.sprite = Sprite.from(obstaclePng);
    this.sprite.scale = new Point(0.3, 0.3);
    this.transform.addChild(this.sprite);
  }
}
