import * as PIXI from 'pixi.js';
import './index.html';
import spaceship from '../assets/spaceship.png';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
  backgroundColor: 0x567d00,
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

app.stage.addChild(PIXI.Sprite.from(spaceship));
