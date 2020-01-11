# Introduction

This is a tutorial will guide you for making your first game with [pixijs][https://github.com/pixijs/pixi.js]. It is intended for people never having made a game, but that have some basics in programming. The objective is to give you essential/key notions about game programming, so that you are able to make your own game afterward.

Each step is tagged, click on the title to get to the state of the code at start of this step.

# Summary

[TOC]


## 0. Setup project
<div class="teacher-note">

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

<div class="explanation">

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

<div class="reference">
[0]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
[1]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
[2]: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
[3]: https://stackoverflow.com/questions/21603350/is-there-any-reason-for-using-webgl-instead-of-2d-canvas-for-2d-games-apps
[4]: https://github.com/pixijs/pixi.js
</div>

<div class="do">

```sh
cd pixijs-first-game/
git init
npm init
npm i --save pixi.js typescript
touch .gitignore

# .idea folder should be ignored by git, if you are using Webstorm IDE
echo .idea/ >> .gitignore
echo node_modules/ >> .gitignore

# create tsconfig.json
tsc --init

```

</div>

<div class="explanation">

You could use a [CDN][https://github.com/pixijs/pixi.js?utm_source=html5weekly#cdn-install-via-cdnjs] instead of npm, and not use typescript at all.

</div>


## 1. Setup scene
<div class="teacher-note">

What the student should be able to do afterward:
- Write basic scene setup with pxiJS (few lines).

What student should understand:
  - What the scene is.

What student will do:
  - Define width and height of scene.
  - Check that it work by changing scene background color.

</div>


## 2. Display a sprite
<div class="teacher-note">
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

<div class="explanation">
  Sprite: todo: show the inheritance shema, the base object is some kind of transform like in unity. sprite have some method in bonus. It is used to display a visual (spritesheet too right?).
</div>


## 3. Move sprite once
<div class="teacher-note">
  Do:
  - Modify a sprite state.
  - Re-render the scene.
</div>
##