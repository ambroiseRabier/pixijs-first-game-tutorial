import './index.html';
import {Application, Point, Sprite, Circle, Text, TextStyle} from 'pixi.js';
import spaceshipPng from './spaceship.png';
import {Obstacle} from './obstacle';
import {HitboxVisualizer} from './simple-global-hitbox-visualizer';
import {circCirc} from './collision';


// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

const playerStartPos: Point = new Point(
    app.renderer.width / 2,
    app.renderer.height / 2,
);

function createPlayer(): Sprite {
  let _player = Sprite.from(spaceshipPng);

  // Setup the position of the sprite, we use copyFrom to make a deep copy and not share the reference
  _player.position.copyFrom(playerStartPos);

  // Rotate around the center
  _player.anchor.x = 0.5;
  _player.anchor.y = 0.5;

  // Use radian, not degrees.
  _player.rotation = -Math.PI /2;
  _player.scale = new Point(0.15, 0.15);

  return _player;
}

const allObstacles: Obstacle[] = [];
const player = createPlayer();
const visualizer = new HitboxVisualizer(app);
const playerHitbox = () => new Circle(player.x, player.y - 5, 15);
const obstacleHitbox = (obstacle: Obstacle) => new Circle(obstacle.transform.x, obstacle.transform.y, 18);

app.stage.addChild(player);


const scoreText: Text = new Text('0', new TextStyle({fill: 0xFFFFFF, fontSize: 38}));
scoreText.position.x = playerStartPos.x;
scoreText.position.y = 30;
scoreText.anchor = new Point(0.5, 0.5);

app.stage.addChild(scoreText);


let playerSpeed = new Point();
const playerSpeedMultiplier = 5;

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
  player.position.x += playerSpeed.x * playerSpeedMultiplier;
  player.position.y += playerSpeed.y * playerSpeedMultiplier;

  visualizer.displayOnce(playerHitbox());

  for (let obstacle of allObstacles) {
    obstacle.update();

    visualizer.displayOnce(obstacleHitbox(obstacle));

    if (circCirc(playerHitbox(), obstacleHitbox(obstacle))) {
      app.ticker.stop();
      // ideally clearInterval(obstacleSpawnInterval) should be called here, some kind, in
      // some kind of onPlayerDeath callback, as it will still will be called when app.ticker is stopped.
      setTimeout(() => {
        restart();
        app.ticker.start();
      }, 1000);
    }
  }
});


window.addEventListener('keydown', (event: KeyboardEvent) => {
  keysPressed[event.key] = 1;
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  keysPressed[event.key] = 0;
});

function restart() {
  for (const obs of allObstacles) {
    // let obstacle know it is removed
    obs.destroy();

    // remove from the stage
    app.stage.removeChild(obs.transform);
  }

  // clear the array
  allObstacles.splice(0, allObstacles.length);
  player.position = playerStartPos;

  // stop then restart the interval
  clearInterval(obstacleSpawnInterval);
  obstacleSpawnInterval = startObstacleSpawn();

  // reset score
  scoreText.text = '0';
}

function getObstacleSpawnPoint(): Point {
  // spawn the obstacle outside of camera (stage == camera because we haven't moved it)
  const sideChosen = Math.floor(Math.random() * 4); // 0, 1, 2, 3

  // should be relative to obstacle width/height.
  // But I will use an arbitrary value to make it easier.
  // Also, while no ideal way to do it, this give a small start time for the player.
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

  return spawnPoint;
}

let obstacleSpawnInterval = startObstacleSpawn();

function startObstacleSpawn(): number {
  // setInterval return a number, but somehow, our IDE think it is NodeJS environment and not Browser env.
  // So we workaround the type system by casting to any.
  return setInterval(() => {
    const obstacle = new Obstacle();
    const randomPos = getObstacleSpawnPoint();

    obstacle.transform.position = randomPos;
    obstacle.init(player.position);
    app.stage.addChild(obstacle.transform);
    allObstacles.push(obstacle);
    scoreText.text = (parseInt(scoreText.text) + 1) + '';
  }, 1000) as any;
}












