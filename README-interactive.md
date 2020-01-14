<style>
.explanation {
    color: red;
}

.teacher {
  background-color: #c49816;
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

### I am:
<div>
  <input type="radio" name="Iam" id="student" checked>
  <label for="student">Student</label>

  <input type="radio" name="Iam" id="teacher">
  <label for="teacher">Teacher (additionnal content relevant for teaching)</label>
</div>

### Explanation quantity:
<div>
  <input type="radio" name="learning-style" id="studying" checked>
  <label for="studying">I want as much **theory and explanations** as possible. (**recommended**, more **verbose**, good if you have time, and are interested as much in doing that in **understanding**)</label>

  <input type="radio" name="learning-style" id="working">
  <label for="working">I want to make it work **fast**. The less explanations there is, the better.</label>
</div>

### Coding simplicity/quality balance:
<div>
  <input type="radio" name="balance" id="quality" checked>
  <label for="quality">I want my code to favor best pratices. (**recommended**) (**webpack, typescript, npm**)</label>

  <input type="radio" name="balance" id="simplicity">
  <label for="simplicity">I want to keep my code as simple as possible. (**CDN install, pure JS**)</label>
</div>


# Summary

[TOC]



## 0. Setup project

<div class="teacher-note" markdown>

What the student should be able to do afterward:
- Setup a project from zero with npm, git, pixiJS, typescript.

What student should understand:
- What canvas and WebGL API is, what is better.
- What canvas html tag is.
- What pixijs is.

What student will do:
- Use npm or use CDN to install pixijs.
- Use pixijs to add a canvas/WebGL in a chosen html tag.
- Check that it work by logging PixiJS API (PixiJS is installed, your main script is linked to the index.html page).

</div>

<div class="explanation" markdown>

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

<div class="do" markdown>

It is recommended you skip the following part and download the project from the start of next step:

```sh
git clone --branch <tag_name> <repo_url> (todo)
```

[Skip to next Step](todo_link_to_next_step)

</div>


### 0.1 (one file) CDN install

<div class="explanation" markdown>

You can use a [CDN][https://github.com/pixijs/pixi.js?utm_source=html5weekly#cdn-install-via-cdnjs] install instead of npm and typescript. It is good to know it can be as simple as that.

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
</body>
</html>
```

</div>


### 0.2 Npm/ts install

<div class="do" markdown>

```sh
cd pixijs-first-game/
git init
npm init
npm i --save pixi.js typescript
touch .gitignore

# .idea folder should be ignored by git, if you are using Webstorm IDE
echo .idea/ >> .gitignore
echo node_modules/ >> .gitignore
echo dist/ >> .gitignore

# create tsconfig.json
tsc --init

mkdir src
touch src/index.html
touch src/index.ts
```

Change your tsconfig.json so that you have:
```json
```
</div>

<div class="explanation" markdown>

I won't explain the typescript configuration, too long and complicated and not the purpose here. (or maybe yes: todo)

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

console.log(PIXI);
```
</div>

<div class="explanation" markdown>
To allow us to leverage npm package, we need a javascript bundler. We will be using webpack.
</div>

<div class="do" markdown>

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

```sh
npm i -D ts-loader webpack webpack-cli webpack-dev-server
```

You can add a npm script in `package.json` to build:
```json
{
  "scripts": {
      "start": "webpack-dev-server",
      "build": "webpack"
  }
}
```

This will create a server watching your file and live reloading your webpage on change.
```sh
npm run start
```

You can build, but if you wanna test the build, you will need an http server (to avoid CORS). If you use Webstorm, you can right click `dist/index.html` then run. Another possibility is to use `http-server` package, but even with that, it only worked on chrome and not Firefox.
```sh
npm run build
```


@See https://github.com/webpack/webpack-dev-server
@See https://webpack.js.org/configuration/dev-server/#devserver
</div>

<div markdown>

do `npm i -D file-loader`

in index.ts add `import './index.html';`, so that it is added by webpack in dist.

add in webpack config:

```js
      {
        test: /\.html/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      },
```

go onto http://localhost:8080/, add a console log, verify that the new console log is displayed.
verify that you can build and start without errors.

</div>


## 1. Setup scene
<div class="teacher-note" markdown>

What the student should be able to do afterward:
- Write basic scene setup with pxiJS (few lines).

What student should understand:
  - What the scene is.

What student will do:
  - Define width and height of scene.
  - Check that it work by changing scene background color.

</div>


## 2. Display a sprite
<div class="teacher-note" markdown>
  KnowHowTo:
  - Create a sprite from an image.
  - Add a sprite on the scene.
  - Make the change visible by rendering.

  Understand:
  - What a sprite is.

  Do:
  - Load an image/asset async.
  - Make a sprite out of an image.
  - Spawn the sprite on the scene.

</div>

<div class="explanation" markdown>
  Sprite: todo: show the inheritance shema, the base object is some kind of transform like in unity. sprite have some method in bonus. It is used to display a visual (spritesheet too right?).
</div>


## 3. Move sprite once
<div class="teacher-note" markdown>
  Do:
  - Modify a sprite state.
  - Re-render the scene.
</div>
