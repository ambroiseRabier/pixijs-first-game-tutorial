import * as PIXI from 'pixi.js';
import './index.html';
import spaceship from './spaceship.png';
import rockImg from './rock.png';
import Point = PIXI.Point;
import Sprite = PIXI.Sprite;
import Rectangle = PIXI.Rectangle;

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
sprite.rotation = -Math.PI / 2;
sprite.scale = new Point(0.15, 0.15);


app.stage.addChild(sprite);

let speed = new Point();
const playerSpeed = 6;

const keysPressed: { [key: string]: number } = {
  'ArrowUp': 0,
  'ArrowDown': 0,
  'ArrowLeft': 0,
  'ArrowRight': 0
};

const allRocks: Rock[] = [];

function rectRect(r1: PIXI.Rectangle, r2: PIXI.Rectangle): boolean {
  return !(r1.top > r2.bottom
      || r1.bottom < r2.top
      || r1.left > r2.right
      || r1.right < r2.left);
}

const stageRect = new Rectangle(0,0, app.renderer.width, app.renderer.height);

// Listen for frame updates
app.ticker.add(() => {
  speed = new Point(
      (keysPressed['ArrowRight'] - keysPressed['ArrowLeft']) * playerSpeed,
      (keysPressed['ArrowDown'] - keysPressed['ArrowUp']) * playerSpeed
  );
  // each frame we spin the bunny around a bit
  sprite.position.x += speed.x;
  sprite.position.y += speed.y;

  for (const rock of allRocks) {
    rock.sprite.position.x += rock.speed * rock.direction.x;
    rock.sprite.position.y += rock.speed * rock.direction.y;

    const outsideScreen = !rectRect(rock.sprite.getBounds(), stageRect);

    if (!outsideScreen) {
      rock.enteredScreenOnce = true;
    }

    if (rock.enteredScreenOnce && outsideScreen) {
      rock.destroy();
      app.stage.removeChild(rock.sprite);
      allRocks.splice(allRocks.indexOf(rock), 1);
      console.log(allRocks.length); // length stay around 16
    }
  }
});

window.addEventListener('keydown', (event: KeyboardEvent) => {
  keysPressed[event.key] = 1;
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  keysPressed[event.key] = 0;
});

type radian = number;

class Rock {
  // prefer composition over inheritance
  // See MVC pattern
  public sprite: Sprite;
  public speed: number;
  public direction: Point;
  public enteredScreenOnce: boolean = false;


  constructor(speed: number, direction: Point, position: Point) {
    const rock = PIXI.Sprite.from(rockImg);
    rock.scale = new Point(0.3, 0.3);
    rock.position = position;
    this.sprite = rock;
    this.speed = speed;
    this.direction = direction;
  }

  public destroy() {

  }
}

function magnitude(x: number, y: number): number {
  return Math.sqrt(x*x +  y*y);
}
function magnitudePoint(p: Point): number {
  return Math.sqrt(p.x*p.x +  p.y*p.y);
}

setInterval(() => {
  // spawn the rock outside of camera (stage == camera because we haven't moved it)
  const sideChosen = Math.floor(Math.random() * 4); // 0, 1, 2, 3

  // should be relative to rock width. I use a arbitrary value for easyness.
  const right = app.renderer.width + 200;
  const left = -200;
  const top = -200;
  const bottom = app.renderer.width - 200;

  const startPositions = [
    new Point(right, Math.random() * app.renderer.height),
    new Point(left, Math.random() * app.renderer.height),
    new Point(Math.random() * app.renderer.width, top),
    new Point(Math.random() * app.renderer.width, bottom),
  ];

  const spawnPoint = startPositions[sideChosen];
  const diff: Point = new Point(
      sprite.position.x - spawnPoint.x,
      sprite.position.y - spawnPoint.y
  );

  const diffMagnitude = magnitudePoint(diff);
  // unit vector
  const towardPlayer = new Point(
      diff.x / diffMagnitude,
      diff.y / diffMagnitude
  );

  const rock = new Rock(
      1,
      towardPlayer,
      spawnPoint
  );

  allRocks.push(rock);

  app.stage.addChild(rock.sprite);
}, 1000);
