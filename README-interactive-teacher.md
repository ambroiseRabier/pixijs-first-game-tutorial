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


# Summary

[TOC]

## 0. Setup project

<div class="objectives" markdown>
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

<div class="recommendations" markdown>
I recommend quickly explaining both setup. And giving the student the project ready to use with pixijs. 
It is not the purpose of this tutorial to explain npm/ts/webpack.
Make sure everyone can `npm start` and `npm build`, or at least log pixijs in console if they use CDN install (if no nodeJS installable on PC right now).
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
  What the student should be able to do afterward:
  - Create a sprite from an image.
  - Add a sprite on the scene.
  - Make the change visible by rendering.

  What student should understand:
  - What a sprite is.

  What student will do:
  - Load an image/asset async.
  - Make a sprite out of an image.
  - Spawn the sprite on the scene.

</div>

## 3. Gameloop
<div class="teacher-note" markdown>
  What the student should be able to do afterward:
  - Modify a sprite state.
  - Re-render the scene.
  
  What student should understand:
  
  What student will do:

</div>

## 4. Inputs
<div class="teacher-note" markdown>
  What the student should be able to do afterward:
  
  What student should understand:
  
  What student will do:

</div>


<div class="exercice" markdown>
Give the loop and the how to listen to input keydown and keyup, how do you make the character move ? 
tip: make a speed variable. of type Point
</div> 

<div class="exercice" markdown>
Diagonal inputs (challenge is you cannot have an event with both inputs at time, so you have to keep track of what keys are actually down)
</div>

## 4. Spawn obstacles
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

## 5. Repeat spawn

<div class="teacher-note" markdown>
  What the student should be able to do afterward:
    - Use setInterval
    - Use a unit vector
  What student should understand:
  
  What student will do:

</div>

<div class="exercice" markdown>
1. Using setInterval, spawn a randomly on the map every X seconds.
2. Using a unit vector, make the rock move toward the player.
3. Using `app.renderer.height` and `app.renderer.width`, spawn the rock outside the map (not too far outside).
</div>

## 6. Destroy obstacles

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

## 7. Restart

<div class="teacher-note" markdown>
  What the student should be able to do afterward:
    x
  What student should understand:
    x
  What student will do:
    reset the game
</div>
