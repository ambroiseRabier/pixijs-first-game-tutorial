<style>

/* Tags */
.vocabulary {

}
.exercice {

}
.objectives {
}
.recommendations {
}
</style>


# Introduction

Exercices, what to say. more?

# Meta

Exercices should be on stuff that the student has seen before. It should be easy exercices.
Exercice are here to make the student get into it, be part of it. It make them active learner.
Exercices are a fun way to learn, to discover, and be creative, to have fun searching a solution by yourself.
There is no need that the student find the solution at the end. It will be provided.


# Summary

[TOC]

## 0. Setup project

<div class="objectives" markdown>
What the student should be able to do afterward:
  - Install pixiJS from CDN.
  - Install pixiJS with webpack/ts/npm from github template.

What student should understand:
- What canvas and WebGL API is, what is better.
- What canvas html tag is.
- What pixijs is.

What student will do:
- Use npm or use CDN to install pixijs.
- Use pixijs to add a canvas/WebGL in a chosen html tag.
- Check that it work by logging PixiJS API (PixiJS is installed, your main script is linked to the index.html page).
</div>

<div class="recommendations" markdown>
I recommend quickly explaining both setup. And giving the student the project ready to use with pixijs. 
It is not the purpose of this tutorial to explain npm/ts/webpack.
Make sure everyone can `npm start` and `npm build`, or at least log pixijs in console if they use CDN install (if no nodeJS installable on PC right now).
</div>

## 1. Setup stage
<div class="teacher-note" markdown>

What the student should be able to do afterward:
  - Setup a basic pixijs stage.

What student should understand:
  - What the scene/stage is.

What student will do:
  - Define width and height of stage (but it is recommended to keep default).
  - Check that it work by changing scene background color.

</div>


## 2. Display a sprite
<div class="teacher-note" markdown>
  What the student should be able to do afterward:
  - Create a sprite from an image.
  - Add a sprite on the scene.

  What student should understand:
  - What a sprite is.
  - Understand that when adding a child to the stage, it is re-rendered, but most of time, you have to wait for next frame of the gameloop.

  What student will do:
  - Modify webpack and typings to load image.
  - Make a sprite out of an image.
  - Rotate to set the spaceship looking to the top.
  - Translate to set the spaceship in middle of the screen.
  - Scale the spaceship to an acceptable size.
  - Spawn the sprite on the scene.

</div>

## 3. Fixing sprite

## 4. Gameloop
<div class="teacher-note" markdown>
  What the student should be able to do afterward:
    - Use gameloop to make a continuous change to a sprite.
  
  What student should understand:
    - In the gameloop function, you are updating state of elements, and render happens at the end.
    - Each render is called a frame, by default it is capped to 60FPS on pixiJS. (to be confirmed?)
    - Know about setInterval, requestAnimationFrame, pixiJS ticker.
    
  What student will do:
    - Make the sprite rotate on itself smoothly.

</div>

## 5. Inputs
<div class="teacher-note" markdown>
  What the student should be able to do afterward:
    - Capture user inputs and translate them into visible change.
  
  What student should understand:
    - How to capture inputs.
  
  What student will do:
    - Capture keydown ArrowUp input and log it.
    - (exercice) Move character with arrow keys.
</div>


<div class="exercice" markdown>
Knowing how to capture inputs, how do you make the character move? 
</div>
<div class="teacher-note" markdown>
There can be creative solutions to share to the class. There is pleasure in discovery.

```typescript
window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    //sprite.position += ...
  }
});
```
This for example will have the sprite move once, then wait a second, then move continuously.

```typescript
window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    speed = new Point(0,-1);
  }
});
```
You can then do something like this, but you end up with a character that never reset speed.
If you add:

```typescript
window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    speed = new Point(0,0);
  }
});
```
You get something that work for one input, but if you have many inputs, you get clunky controls.

</div>


## 6. Multiple inputs

<div class="exercice" markdown>
Diagonal inputs (challenge is you cannot have an event with both inputs at time, so you have to keep track of what keys are actually down)
</div>

You might be using this bellow, or not.
```ts
const keyToSpeed: {[key: string]: Point} = {
  'ArrowUp': new Point(0,-1),
  'ArrowDown': new Point(0,1),
  'ArrowLeft': new Point(-1,0),
  'ArrowRight': new Point(1,0)
};
```


## 7. Spawn obstacle
<div class="teacher-note" markdown>
  What the student should be able to do afterward:
    x
  What student should understand:
    x
  What student will do:
    Spawn an obstacle, using what student has learned at 2.
</div>

<div class="exercice" markdown>
    Spawn an obstacle using what you have learned at 2.
</div>


## 8. Move obstacle towards player
<div class="teacher-note" markdown>
  What the student should be able to do afterward:
    - Use a unit vector
  What student should understand:
  
  What student will do:
    - Use gameloop and unit vector to move the obstacle towards the player.
</div>

<div class="exercice" markdown>
Using a unit vector and the gameloop, make the rock move toward the player.
</div>


## 9. Repeat spawn randomly outside
<div class="teacher-note" markdown>
  What the student should be able to do afterward:
    - Use setInterval
  What student should understand:
  
  What student will do:
    - Repeat the spawn
</div>

<div class="exercice" markdown>
1. Using setInterval, spawn a randomly on the map every X seconds.
2. Spawn obstacles randomly inside the camera view.
3. Spawn obstacle randomly outside camera view.
</div>

Using `app.renderer.height` and `app.renderer.width`, spawn the rock outside the map (not too far outside).


## 10. Destroy obstacles
<div class="teacher-note" markdown>
  What the student should be able to do afterward:
    - Make an element eligible for garbage collector.
  What student should understand:
    - What is the garbage collector
    - How to trigger the garbage collector
  What student will do:
    - Remove sprite and references to destroy an object
</div>

<div class="exercice" markdown>
When obstacle is leaving the map, and is not visible anymore to the player, destroy it.
</div>

## 11. Restart
<div class="teacher-note" markdown>
  What the student should be able to do afterward:
    x
  What student should understand:
    x
  What student will do:
    reset the game
</div>
