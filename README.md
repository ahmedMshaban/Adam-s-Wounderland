# Introduction to Programming I Final Project

[Project Link](https://ahmedmshaban.github.io/Introduction-to-Programming-I-Final-Project/)

## Table of Contents

- [How The Game Works](#how-the-game-works)
- [Game Functionality](#game-functionality)
- [Code Dependencies](#code-dependencies)

## How The Game Works

The game consists of a character, collectable items, canyons, clouds, mountains, trees, platforms, enemies, and a flagpole.

The goal of the game to reach the flag and collect as many items as possible.

## Game Functionality

### Move

You can move to the left using the left key or 'A'
You can move to the left using the right key or 'D'
You can jump using up key, 'W', or space.

### Sounds

There are fives type of sounds effects:

- After the player jump.
- After the player collects an item.
- After the player falls or touches an enemy.
- After the game over.
- After the game completed

### Lives

-When the game starts the player will have 3 lives.
-After the player touches the enemies or falls on canyons lives decrease by one.

### Score

The score increases by one when the player collects the collectable items.

### Die

Once the player touches an enemy or falls on a canyon the player will do and back to the start position.

### Restart

After the player finished all three lives, the player can click space on the space key and the game will start over.

### Game over

When the player lost all the 3 lives.

### Game completed

When the player reaches the flagpole.

## Code Dependencies

1- p5.min.js(https://p5js.org/download/).
2- p5.sound.min.js (https://p5js.org/reference/#/libraries/p5.sound).
