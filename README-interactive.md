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

## 1. Setup scene

If you have skipped the previous part, download the project with:

```sh
git clone --branch 1-setup-scene git@github.com:ambroiseRabier/pixijs-first-game-tutorial.git
```

---

Create the scene/stage by adding this code:
```typescript
// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);
```

You can personalize the scene:
```typescript
const app = new PIXI.Application({
  backgroundColor: 0x567d00,
  // width, height, ...
});
```


## 2. Display a sprite

<div class="explanation" markdown>
  Sprite: todo: show the inheritance shema, the base object is some kind of transform like in unity. sprite have some method in bonus. It is used to display a visual (spritesheet too right?).
</div>

Let's create an asset folder:
```sh
mkdir assets
```

There is plenty of free assets you can find on the internet, you should be looking into conditions of use, licence before using them.
This matter most if you publish your game openly on the internet, or if you make money out of your game.

I will be using this png for my character:
https://www.pinclipart.com/pindetail/obJhJJ_svg-royalty-free-library-fighter-clipart-spaceship-spaceship/#

Download and rename it `spaceship.png` in the assets folder.

Webpack is not configured to load images, on CDN install, it would be all.

Add to webpack.config.js:
```js
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      }
```

You can now do `import '../assets/spaceship.png';` and `spaceship.png` will appear in `build/dist` on `npm run build`. (not in `build/dist/assets` folder) 

We can make this better. Add a file named `global.d.ts` in `src` with content:
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

It will allow to do this:
```ts
import spaceship from '../assets/spaceship.png';
app.stage.addChild(PIXI.Sprite.from(spaceship));
```

Nowadays, it is frequent to see the assets being mixed with the scripts using it. If you have a game artist with you, you want to discuss it with him. 
It can make it harder for them to update their assets, they often copy paste a folder of them containing all the usable assets, 
with a folder hierarchy that if 100% into their hands.

However, if you are alone, it will probably be easier to mix thing up by module. Move spaceship.png into src, and remove assets folder. 
It won't make much a difference for a very small game. But when you start adding subfolder, more files, classes, it will help you stay organized.

```ts
import spaceship from './spaceship.png';
```

@Src https://stackoverflow.com/questions/37671342/how-to-load-image-files-with-webpack-file-loader
@Src https://stackoverflow.com/questions/36148639/webpack-not-able-to-import-images-using-express-and-angular2-in-typescript

##

We want to resize the sprite, and turn it 90°. It should be the image itself that should be fixed by the game artist, so that the game artist keep full control and correct feedback over what he is doing.
We are doing it for pedagogic purpose.

```ts
const sprite = PIXI.Sprite.from(spaceship);

// Setup the position of the sprite
sprite.x = app.renderer.width / 2;
sprite.y = app.renderer.height / 2;

// Rotate around the center
sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

// Use radian, not degrees.
sprite.rotation = -Math.PI /2;
sprite.scale = new Point(0.15, 0.15);


app.stage.addChild(sprite);
```
@Src https://github.com/pixijs/pixi.js?utm_source=html5weekly#basic-usage-example

anchor is used for rotation and ? (!= origin) (does it move sprite?)
Rotation is in radian, not degrees.
You can also note, that the sprite is a bit too detailed for his small size I am giving him.


## 3. Gameloop
<div class="teacher-note" markdown>
  Do:
  - Modify a sprite state.
  - Re-render the scene.
</div>

```ts
app.ticker.add(() => {
  // each frame we spin the bunny around a bit
  sprite.rotation += 0.01;
});

```

There is also `requestAnimationFrame` and `setInterval`. Pixijs Ticker class is using the first one underhood.

## 4. Inputs

```ts
let speed = new Point();

// Listen for frame updates
app.ticker.add(() => {
  // each frame we spin the bunny around a bit
  sprite.position.x += speed.x;
  sprite.position.y += speed.y;
});

window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    speed = new Point(0,-1);
  }
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    speed = new Point(0,0);
  }
});
```

keydown happen once when you press, then after a second, it is reapeated. 
Like when you press 0 key on notepad, and if you keep pressing it start writing a line of that character.
keyup is when you release the key.
there is also key event.
You want your game to react on keydown, to be reactive to user inputs.

<div class="exercice" markdown>
Give the loop and the how to listen to input keydown and keyup, how do you make the character move ? 
tip: make a speed variable. of type Point
</div> 

<div class="exercice" markdown>
Diagonal inputs (challenge is you cannot have an event with both inputs at time, so you have to keep track of what keys are actually down)

```ts
let speed = new Point();

const keysPressed: {[key: string]: number}  = {
  'ArrowUp': 0,
  'ArrowDown': 0,
  'ArrowLeft': 0,
  'ArrowRight': 0
};
const keyToSpeed: {[key: string]: Point} = {
  'ArrowUp': new Point(0,-1),
  'ArrowDown': new Point(0,1),
  'ArrowLeft': new Point(-1,0),
  'ArrowRight': new Point(1,0)
};

// Listen for frame updates
app.ticker.add(() => {
  speed = new Point(
      keysPressed['ArrowRight'] - keysPressed['ArrowLeft'],
      keysPressed['ArrowDown'] - keysPressed['ArrowUp']
  );
  // each frame we spin the bunny around a bit
  sprite.position.x += speed.x;
  sprite.position.y += speed.y;
});



window.addEventListener('keydown', (event: KeyboardEvent) => {
  keysPressed[event.key] = 1;
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  keysPressed[event.key] = 0;
});
```

</div> 

## 4. Spawn obstacles

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

## 5. Repeat spawn

the game is gonna be very slow if we do not destroy them.

## 6. Destroy obstacles

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

## 7. Restart
