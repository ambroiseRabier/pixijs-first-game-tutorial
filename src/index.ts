import './index.html';
import {Application, Sprite, Point, Circle, Graphics, Ticker} from 'pixi.js';
import spaceshipPng from './spaceship.png';
import {Obstacle} from './obstacle';
import {circCirc} from './collisions';


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

const allObstacles: Obstacle[] = [];
const player = createPlayer();
// because the player hitbox will be addChilded to the sprite, so that it move along the player,
// it also take the transformation applied on the player, scale and rotation.
// that is why if we want to move the hitbox down on the player, it is the horizontal axis that we have to change.
const playerHitbox = new Circle(-150, 0, 200);
const playerHitboxGraph: Graphics = new Graphics();
playerHitboxGraph.fill.color = 0xFF0000;
playerHitboxGraph.fill.alpha = 0.5;
playerHitboxGraph.fill.visible = true;
playerHitboxGraph.drawShape(playerHitbox);
player.addChild(playerHitboxGraph);

app.stage.addChild(player);

let playerSpeed = new Point();
const playerSpeedMultiplier = 5;

const keysPressed: {[key: string]: number}  = {
  'ArrowUp': 0,
  'ArrowDown': 0,
  'ArrowLeft': 0,
  'ArrowRight': 0
};

// float === bad idea
console.assert(player.scale.x == player.scale.y);

// Listen for frame updates
app.ticker.add(() => {
  playerSpeed = new Point(
      keysPressed['ArrowRight'] - keysPressed['ArrowLeft'],
      keysPressed['ArrowDown'] - keysPressed['ArrowUp']
  );
  // each frame we spin the bunny around a bit
  player.position.x += playerSpeed.x * playerSpeedMultiplier;
  player.position.y += playerSpeed.y * playerSpeedMultiplier;

  const globalPlayerHitboxPos = player.toGlobal(new Point(playerHitbox.x, playerHitbox.y));
  // To make it correct, it should be an elipsis, this will work because scale.
  // Rotation should ideally be taken in account too, making a collision system in account transform is not easy.
  const globalPlayerHitbox = new Circle(globalPlayerHitboxPos.x, globalPlayerHitboxPos.y, playerHitbox.radius * player.scale.x);
  for (let obstacle of allObstacles) {
    obstacle.update();

    const globalObstacleHitboxPos = obstacle.transform.toGlobal(new Point(obstacle.hitbox.x, obstacle.hitbox.y));
    const globalObstacleHitbox = new Circle(globalObstacleHitboxPos.x, globalObstacleHitboxPos.y, obstacle.hitbox.radius);

    if (circCirc(globalPlayerHitbox, globalObstacleHitbox)) {
      console.log('player touched');
      app.ticker.stop(); // note that this does not stop the Spawning of obstacles in setInterval callback bellow
    }
  }
});



window.addEventListener('keydown', (event: KeyboardEvent) => {
  keysPressed[event.key] = 1;
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  keysPressed[event.key] = 0;
});

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

setInterval(() => {
  const obstacle = new Obstacle();
  const randomPos = getObstacleSpawnPoint();

  obstacle.transform.position = randomPos;
  obstacle.init(player.position);
  app.stage.addChild(obstacle.transform);
  allObstacles.push(obstacle);
}, 1000);
