import './index.html';
import {Application, Sprite, Point} from 'pixi.js';
import spaceshipPng from './spaceship.png';


// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

function createPlayer(): Sprite {
  let _player = Sprite.from(spaceshipPng);

  // Setup the position of the sprite
  _player.x = app.renderer.width / 2;
  _player.y = app.renderer.height / 2;

  // Rotate around the center
  _player.anchor.x = 0.5;
  _player.anchor.y = 0.5;

  // Use radian, not degrees.
  _player.rotation = -Math.PI /2;
  _player.scale = new Point(0.15, 0.15);

  return _player;
}

const player = createPlayer();

app.stage.addChild(player);

let playerSpeed = new Point();

const keysPressed: {[key: string]: number}  = {
  'ArrowUp': 0,
  'ArrowDown': 0,
  'ArrowLeft': 0,
  'ArrowRight': 0
};


// Listen for frame updates
app.ticker.add(() => {
  playerSpeed = new Point(
      keysPressed['ArrowRight'] - keysPressed['ArrowLeft'],
      keysPressed['ArrowDown'] - keysPressed['ArrowUp']
  );
  // each frame we spin the bunny around a bit
  player.position.x += playerSpeed.x;
  player.position.y += playerSpeed.y;
});


window.addEventListener('keydown', (event: KeyboardEvent) => {
  keysPressed[event.key] = 1;
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  keysPressed[event.key] = 0;
});
