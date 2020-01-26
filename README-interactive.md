<style>
/* Studying vs Working */
.explanation {
  color: darkorange;
}
.action {
  color: red;
}

/* Only appear to the teacher */
.teacher {
  background-color: #c49816;
}

/* Tags */
.vocabulary {

}
.exercice {

}



</style>

<script>
  function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(() => {
  const array = Array.from(document.querySelectorAll('.explanation'));
  array.forEach(e => e.addEventListener('click', () => {console.log(123)}));

  const teacher = document.querySelector('#teacher');
  teacher.addEventListener('change', e => console.log(e.target.checked));
});
</script>

# Introduction

This is a tutorial will guide you for making your first game with [pixijs](https://github.com/pixijs/pixi.js). It is intended for people never having made a game, but that have some basics in programming. The objective is to give you essential/key notions about game programming, so that you are able to make your own game afterward.

Each step is tagged, click on the title to get to the state of the code at start of this step.

## Choose your reading style

<fieldset>
  <legend>I am</legend>

  <input type="radio" name="Iam" id="student" checked>
  <label for="student">Student</label><br/>

  <input type="radio" name="Iam" id="teacher">
  <label for="teacher">Teacher (additionnal content, relevant for teaching this learning material)</label>
</fieldset>

<fieldset>
  <legend>Explanation quantity</legend>
<b></b>
  <input type="radio" name="learning-style" id="studying" checked>
  <label for="studying">I want all available explanations, I like to understand everything. (<b>recommended</b>, <b>verbose</b>)</label><br/>

  <input type="radio" name="learning-style" id="working">
  <label for="working">I want to make it work <b>fast</b>. The less explanations there is, the better.</label>
</fieldset>

<fieldset>
  <legend>Coding simplicity/quality balance</legend>
  <input type="radio" name="balance" id="quality" checked>
  <label for="quality">I want my code to favor best pratices. (<b>recommended</b>) (<b>webpack, typescript, npm</b>)</label><br/>

  <input type="radio" name="balance" id="simplicity">
  <label for="simplicity">I want to keep my code as simple as possible. (<b>CDN install, pure JS</b>)</label>
</fieldset>


# Summary

[TOC]



## 0. Setup project

<div class="explanation vocabulary" markdown>

[Canvas HTML tag][0]: 
  - Use the HTML canvas element with either the `<canvas>` scripting API or the WebGL API to draw graphics and animations.
  - Not to be confused with the canvas API.
  - It define the zone on the webpage that will be available for pixijs to use.

[Canvas API][1]: 
  - The Canvas API provides a means for drawing graphics via JavaScript and the HTML `<canvas>` element. Among other things, it can be used for animation, game graphics, data visualization, photo manipulation, and real-time video processing.
  - Not to confuse with canvas html tag.

[WebGL API][2]: 
  - WebGL (Web Graphics Library) is a JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without the use of plug-ins.

[Canvas vs WebGL API][3]:
  - The Canvas API largely focuses on 2D graphics. The WebGL API, which also uses the `<canvas>` element, draws hardware-accelerated 2D and 3D graphics. 
  - With a library, always prefer WebGL, and you should use a library. You can try canvas or webgl api for curiosity though.
  - WebGL API recent then canvas API.
  - WebGL API performant then canvas API.
  - WebGL API is harder to use then canvas API.

[PixiJs][4]:
  - PixiJS is a rendering library that will allow you to create rich, interactive graphics, cross platform applications, and games without having to dive into the WebGL API or deal with browser and device compatibility.

</div>

<div class="reference" markdown>
[0]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
[1]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
[2]: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
[3]: https://stackoverflow.com/questions/21603350/is-there-any-reason-for-using-webgl-instead-of-2d-canvas-for-2d-games-apps
[4]: https://github.com/pixijs/pixi.js
</div>

<div class="do" style="font-size: larger;" markdown>

/!\ [It is recommended you skip the following part](#1-setup-scene) /!\

</div>


### 0.1 (one file) CDN install

<div class="explanation" markdown>

You can use a [CDN](https://github.com/pixijs/pixi.js?utm_source=html5weekly#cdn-install-via-cdnjs) install, instead of npm and typescript. It is good to know, it can be as simple as that.

</div>

<div class="do" markdown>


src/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
  <script>
    console.log(PIXI);
  </script>
  <!-- OR make an index.js file in the same folder -->
  
</body>
</html>
```

Replace `5.1.3` by latest available version. You can also replace

```html
  <script>
    console.log(PIXI);
  </script>
```

by

```html
<script src="index.js"></script>
```

</div>


### 0.2 Npm/ts/webpack install

#### Npm and Typescript

Note that it will be up to you, to decide when to commit.

<div class="do" markdown>

```sh
cd pixijs-first-game/
git init
touch .gitignore

# Webstorm IDE
echo .idea/ >> .gitignore
echo node_modules/ >> .gitignore
# Build folder
echo dist/ >> .gitignore

npm init -y
npm i --save pixi.js 
npm i --save-dev typescript


# create tsconfig.json
tsc --init
```

Change your `tsconfig.json` to (you can keep commented line):
```json
{
  "compilerOptions": {
    "target": "ESNEXT",
    "module": "ESNext",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

/!\ Commented lines in tsconfig does not show defaults values. This can be misleading.

**target, module**  
We want to work with the latest technology available (but losing in compatibility with old browsers).

**lib**  
We have to add necessary library to work with the browser ans ESNext.

**sourceMap**  
This allow the browser to map outputted JS code to original TS code. Helpful for debugging, but this expose your sources in the final product.

**outDir**  
Where we want our Typescript to compile. Default typescript config output JS file rightn ext to TS files. We do not need it, because we will be using webpack.

**strict**  
Add a couple of rules making the typing system stricter.

**esModuleInterop**
\-

**moduleResolution**  
This look like it should be default, but if you do not decomment this line, Typescript will not find `pixijs` module when trying to import it.

**include** 
We do not need this option, because we will be using webpack. Without webpack, it would allow us, to limit compilation to `src` folder.


Create the files and directory as bellow:
```sh
mkdir src
touch src/index.html
touch src/index.ts
```

</div>

<div class="do" markdown>


src/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
    <script src="bundle.js" type="module"></script>
</body>
</html>
```

src/index.ts
```ts
import * as PIXI from 'pixi.js';

// This should not log undefined.
console.log(PIXI);
```
</div>

#### Webpack

<div class="explanation" markdown>
To allow us to leverage npm packages, we need a javascript bundler. We will be using webpack.
</div>

<div class="do" markdown>

```sh
npm i -D ts-loader webpack webpack-cli
touch webpack.config.js
```

webpack.config.js
```js
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};
```
@See https://github.com/TypeStrong/ts-loader#configuration
@See https://webpack.js.org/guides/getting-started/


You can add a npm script in `package.json` to build:
```json
{
  "scripts": {
      "build": "webpack"
  }
}
```


If you build now, you will end up with a `bundle.js` inside `dist` folder, that is not useful without our `index.html`...
```sh
npm run build
```

Note that webpack does not clean your `dist` folder before building. This is not an issue as it will override needed files anyway. On linus you could replace above npm script with `rm -rf ./dist && npm run build`. I don't remember how you can do it on windows. You can also, most probably do it trough webpack configuration.

@See https://github.com/webpack/webpack-dev-server
@See https://webpack.js.org/configuration/dev-server/#devserver
</div>

<div markdown>

We gonna add our `index.html` to the webpack output.

Add `file-loader` package.
```sh 
npm i -D file-loader
```

In `index.ts` add `import './index.html';`, so that it is added by webpack in dist.

In webpack config, add:
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      },
    ]
  }
}
```

Build and check that `index.html` is put inside `dist` foler.
```sh
npm run build
```

However, if you try to open the `dist/index.html`, you will be blocked by CORS (Cross origin request security). If you are using Webstorm, you can right click on the file and click `run 'index.html'`. When opening the console you should see a log starting with `Object {`. Another way would be to make a webserver in nodejs (using `http-server` package for example), to serve `index.html` without CORS issues.
There is a more practical way of viewing our code in development, using `webpack-dev-server` package.
</div>

#### Webpack dev server

Install the package.
```sh
npm i -D webpack-dev-server
```

In `package.json` add:
```json
{
  "scripts": {
      "start": "webpack-dev-server",
  }
}
```

```sh
npm run start
```
This will create a server watching your file and live reloading your webpage on change.

Open `http://localhost:8080/`, and check your console that you have a log that is not undefined. Should start with `Object {`.

## [1. Setup stage](https://github.com/ambroiseRabier/pixijs-first-game-tutorial/tree/1-setup-stage)

The stage, or scene as it is called in Unity, is the main container of the game.

If you have skipped the previous part, download the project with:

```sh
git clone --branch 1-setup-stage git@github.com:ambroiseRabier/pixijs-first-game-tutorial.git
```

---

Create the scene/stage, you `index.ts` should be:
```ts
import './index.html';
import {Application} from 'pixi.js';


// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);
```

Auto-import on my IDE give me `import Application = PIXI.Application;`, instead of better looking named exports. I guess this is an issue with pixiJS.


You can personalize the scene:
```ts
const app = new Application({
  backgroundColor: 0x567d00,
  // width, height, ...
});
```


## [2. Display a sprite](https://github.com/ambroiseRabier/pixijs-first-game-tutorial/tree/2-display-sprite)

<div class="explanation" markdown>

  Sprite: todo: show the inheritance shema, the base object is some kind of transform like in unity. sprite have some method in bonus. It is used to display a visual (spritesheet too right?).

</div>

<div class="explanation" markdown>

You could create an `assets` folder, it allow to decuple the hierarchy of your code directory form the hierarchy directory of the `assets`. This can be useful to allow your game artist to just organize himself however he like, and quickly update the assets without having any conflicts, with the way developers organize their code. If you are both game artist and developer, like on this tutorial, it will be easier to have only one directory hirearchy.

There is plenty of free assets you can find on the internet, you should be looking into conditions of use, licence before using them. Especially if you make money out of your game, or if you publish your game openly on the internet.

Mixing the tests, assets and scripts together is frequent nowadays, it is a angular2+ guidelines by the way. It make thing easier to find and to scale.

If you want to proceed in that way and you work with a game artist, make sure to communicate with him.

</div>

I will be using this png for my character:
https://www.pinclipart.com/pindetail/obJhJJ_svg-royalty-free-library-fighter-clipart-spaceship-spaceship/#

Download and rename it `spaceship.png`, put it in `src` folder.

Webpack need to be configured to add images in the `dist` folder.

Add to `webpack.config.js`:
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      }
    },
  ]
}
```

<div class="explanation" markdown>

A little explanation on `name: '[name].[ext]'`, because `[path]` is missing, image that are in `src` folder will be in `dist` folder instead of `dist/src` folder. It is fine for this tutorial, but you have a file with the same name and extension in different folder, I suppose this would conflict. You can find the necessary informations in the documentation or internet if this happen to you later.

</div>


For webpack to add the image into the `dist` folder, it need to be used somewhere, add `import './spaceship.png';` inside `index.ts`. `spaceship.png` will appear in `build/dist` when running `npm run build`. Unused file are not bundled automatically, handy.

Restart your development server (`npm start`), and open http://localhost:8080/spaceship.png, you should see the image.

We can make this better, change your `index.ts` so that you have:
```ts
import './index.html';
import {Application, Sprite} from 'pixi.js';
import spaceship from './spaceship.png';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

app.stage.addChild(Sprite.from(spaceship));
```

`spaceship` will have for value a string containing the path to the file. If it doesn't find it, you get an error at compile time, instead of discovering it in game.

Typescript will complain `Cannot find module './spaceship.png'`, let's fix that:
Add a file named `global.d.ts` in `src` with content:
```ts
declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}
// you can add more when needed
```


<div class="explanation" markdown>

`.d.ts` file are typings information only files. Wht we have added allow Typescript to know that this kind of import is ok. To be clear, you could have added on the line above the import `// @ts-ignore`, and it would still have worked.

</div>


@Src https://stackoverflow.com/questions/37671342/how-to-load-image-files-with-webpack-file-loader
@Src https://stackoverflow.com/questions/36148639/webpack-not-able-to-import-images-using-express-and-angular2-in-typescript
@Src https://webpack.js.org/loaders/file-loader/



## [3. Fixing sprite](https://github.com/ambroiseRabier/pixijs-first-game-tutorial/tree/3-fixing-sprite)

We want to resize the sprite, and turn it 90°. Best would be to have the image fixed by the game artist. This allow him to keep full control of his assets, and have a correct feedback over what how his work look in game.
We are doing it for pedagogic purpose.

index.ts
```ts
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

const player = Sprite.from(spaceshipPng);

// Setup the position of the sprite
player.x = app.renderer.width / 2;
player.y = app.renderer.height / 2;

// Rotate around the center
player.anchor.x = 0.5;
player.anchor.y = 0.5;

// Use radian, not degrees.
player.rotation = -Math.PI /2;
player.scale = new Point(0.15, 0.15);


app.stage.addChild(player);
```
@Src https://github.com/pixijs/pixi.js?utm_source=html5weekly#basic-usage-example

`anchor` property i used for as roation center. Rotation is in radian, not degree. You can also note that the sprite is a bit to detailed for the small size I have given it.

You can make a function to make it a bit cleaner.
```ts
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
```


## [4. Gameloop](https://github.com/ambroiseRabier/pixijs-first-game-tutorial/tree/4-gameloop)

```ts
app.ticker.add(() => {
  // each frame we spin the bunny around a bit
  sprite.rotation += 0.01;
});
```
@Src https://github.com/pixijs/pixi.js?utm_source=html5weekly#basic-usage-example

There is also `requestAnimationFrame` and `setInterval`. Pixijs Ticker class is using the first one underhood.


## [5. Inputs](https://github.com/ambroiseRabier/pixijs-first-game-tutorial/tree/5-inputs)

You can remove `sprite.rotation += 0.01;`, we won't need it.

Here is a simple example:
```ts
window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
     player.position.y -= 25;
  }
});
```

`'keydown'` is the first event of a key. It iscalled right when you start pressing the key. 


<div class="exercice" markdown>
 
Time for some exercice. How would you make the sprite move only when you press up?
There are tips bellow, do not hesitate to use them, it is up to you, how much self-discovery you want. What is important, is not to find the solution by yourself, but to be able to reproduce this solution later.


<details  class="tip" mardown>
  <summary>Tip 1</summary>

You are going to need `'keyup'` event:
```ts
window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
  }
});
```

</details>

<details  class="tip" mardown>
  <summary>Tip 2</summary>

You need to use the gameloop.
```ts
app.ticker.add(() => {

});

window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
  }
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
  }
});
```

</details>

<details  class="tip" mardown>
  <summary>Tip 3</summary>

You need a playerSpeed variable.
```ts
let playerSpeed: Point = new Point(0,0);

app.ticker.add(() => {

});

window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
  }
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
  }
});
```

</details>

<details  class="solution" mardown>
  <summary>Solution</summary>

```ts
let playerSpeed: Point = new Point(0,0);

app.ticker.add(() => {
  player.position.x += playerSpeed.x;
  player.position.y += playerSpeed.y;
});

window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    playerSpeed = new Point(0,-1);
  }
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    playerSpeed = new Point(0,0);
  }
});
```

</details>

</div>


<div class="explanation" markdown>

Notice that:
- If you later happen to code a one time action on a key event, keep in mind to use `keydown` and not `keyup`, to react as fast as possible to the user.
- You may have found out that keeping you key pressed, will, after a short time, be spamming `keydown` event.

</div>


## [6. Multiple inputs](https://github.com/ambroiseRabier/pixijs-first-game-tutorial/tree/6-multiple-inputs)

<div class="exercice" markdown>

Now let's make the character able to move in 4 directions. You can also chose to add diagonal inputs, 8 directions.
You will need:
- 'ArrowUp'
- 'ArrowDown'
- 'ArrowLeft'
- 'ArrowRight'


<details  class="tip" mardown>
  <summary>Tip 1</summary>

You should keep track of what keys are currently pressed.
```ts
const keysPressed: {[key: string]: number}  = {
  'ArrowUp': 0,
  'ArrowDown': 0,
  'ArrowLeft': 0,
  'ArrowRight': 0
};
```
There is a practical reason to store what keys are pressed, as number (0 or 1), instead of boolean (false or true).

</details>

<details  class="tip" mardown>
  <summary>Tip 2</summary>

Here is how you make use of the previous dictonnary we made.
```ts
window.addEventListener('keydown', (event: KeyboardEvent) => {
  keysPressed[event.key] = 1;
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  keysPressed[event.key] = 0;
});
```

</details>

<details  class="solution" mardown>
  <summary>Solution</summary>


```ts
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
```

</details>

</div> 

<div class="explanation" markdown>

You may notice that if you keep pressed 3 arrow keys, and press the fourth one, the eventi s not triggered, this is probably not an issue with your code:
https://stackoverflow.com/questions/18155457/javascript-keydown-event-not-triggered-when-multiple-keys-are-held-down

You can check for yourself with this snippet:
```ts
  if (Object.values(keysPressed).reduce((a,b) => a+b) == 4) { // 3 is ok, but 4 will not appear with arrow keys
    console.log('4 keys pressed regitered');
  }
```

You could set up a speed multiplier to make the player faster or slower.

</div>


## [7. Spawn obstacle](https://github.com/ambroiseRabier/pixijs-first-game-tutorial/tree/7-spawn-obstacle)

<div class="exercice" markdown>

You can use what you have learned at [step 2](#2-display-sprite) to display an obstacle on stage (not on the player).

You can get the image [here](https://github.com/ambroiseRabier/pixijs-first-game-tutorial/blob/b8b7eec78d27f0b3b65cdf4eb665abac821a6f44/src/rock.png), the asset is free for personal use.

<details  class="solution" mardown>
  <summary>Solution</summary>

```ts
import obstaclePng from './obstacle.png';

function createObstacle(): Sprite {
  let _obstacle = PIXI.Sprite.from(obstaclePng);
  _obstacle.position = new Point(app.renderer.width/2, 0);
  return _obstacle;
}

const obstacle = createObstacle();
app.stage.addChild(obstacle);
```
</details>

</div>


## [8. Refractor obstacle](https://github.com/ambroiseRabier/pixijs-first-game-tutorial/tree/8-refractor-obstacle)

<div class="explanation" markdown>

A little information on PixiJS inherintance shema. I haven't found a shema of pixiJS inheritance shema (if someone find one, I would add it here). But it is quite similar to Flash:

(todo, make a copy of the file locally)
![inheritance shema of flash](https://blog.berniesumption.com/wp-content/uploads/2010/10/DisplayObject_subclasses.jpg)

By looking into the source (ctrl-b on Webstorm on Sprite class). You can find out that:

PIXI.Sprite <- PIXI.Container <- PIXI.DisplayObject

Note that DisplayObject is an abtract class.

</div>

Let's separate obstacle code into his own file.

```sh
touch src/obstacle.ts
```

src/obstacle.ts
```ts
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
```

Remove `createObstacle` function.

src/index.ts
```ts
const obstacle = new Obstacle();

obstacle.transform.position = new Point(app.renderer.width/2, 0);

app.stage.addChild(obstacle.transform);
```

Do not do `sprite.position = new Point(app.renderer.width/2, 0);`, this would also work, but gameplay related position changes will be applied to the `transform`, the `transform` has the position of the obstacle on the scene, and we do not want the position of the sprite to be `app.renderer.width/2` from his position. It might become easier to understand on the next step.

<div class="explanation" markdown>

This is slightly inspired from Unity. You could make use of inheriatnec `export class Obstacle extends Container` to allow you to do `app.stage.addChild(obstacle);`, this can be ok, but it will mix up your class Obstacle methods and fields with the Container methods and fields.
We could give in parameter the stage, to allow Obstacle to addChild the sprite on the stage, or just make sprite public field. But by making `transform` public, we allow the main script to addChild our obstacle, and our Obstacle to handle his internal state himself (addChild his sprite).
Note that there are more then one way to organize yourself.

</div>


## [9. Move obstacle towards player](https://github.com/ambroiseRabier/pixijs-first-game-tutorial/tree/9-move-obstacle-towards-player)

<div class="exercice" markdown>


<details  class="solution" mardown>
  <summary>Solution</summary>



</details>

</div>


## 10. Repeat spawn randomly outside

the game is gonna be very slow if we do not destroy them.

## 11. Destroy obstacles

Garbage collector. remove from scene, and kill any reference.

Collision
```ts
function rectRect(r1: PIXI.Rectangle, r2: PIXI.Rectangle): boolean {
  return !(r1.top > r2.bottom
      || r1.bottom < r2.top
      || r1.left > r2.right
      || r1.right < r2.left);
}
```
this version is better then `&&` version, because it does not try every statement.

Nothing displaying ? of course, you have to make sure they can spawn and enter screen.
they should be destroyed when they are leaving the screen, not before they entered. I chose to use a flag bool to track when they entered at least once the screen.

## 12. Restart


## TEMP


```ts
type radian = number;

function makeRock(position: Point, direction: radian): Sprite {
  const rock = PIXI.Sprite.from(rockImg);
  rock.position = position;
  rock.rotation = direction;
  return rock;
}

const newRock = makeRock(new Point(app.renderer.width/2, app.renderer.height/2), 0);
app.stage.addChild(newRock);
```