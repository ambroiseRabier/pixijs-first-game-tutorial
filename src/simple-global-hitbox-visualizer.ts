import {Application, Circle, Rectangle, Graphics} from 'pixi.js';

export class HitboxVisualizer {
  private readonly container: Graphics;
  private used: number = 0;

  constructor(app: Application) {
    this.container = new Graphics();
    app.stage.addChild(this.container);
    app.ticker.add(() => {
      app.stage.addChild(this.container); // make sure it always is at front
      this.container.clear();
    }, undefined, 1); // run before main loop
  }

  displayOnce(hitbox: Circle | Rectangle) {
    this.container.fill.alpha = 0.5;
    this.container.fill.color = 0xFF0000;
    this.container.fill.visible = true;
    this.container.drawShape(hitbox);
  }
}
