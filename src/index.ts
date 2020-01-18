import * as PIXI from 'pixi.js';
import './index.html';
import spaceship from './spaceship.png';
import Point = PIXI.Point;

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
  backgroundColor: 0x567d00,
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

const sprite = PIXI.Sprite.from(spaceship);

// Setup the position of the bunny
sprite.x = app.renderer.width / 2;
sprite.y = app.renderer.height / 2;

// Rotate around the center
sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

// Use radian, not degrees.
sprite.rotation = -Math.PI /2;
sprite.scale = new Point(0.15, 0.15);


app.stage.addChild(sprite);
