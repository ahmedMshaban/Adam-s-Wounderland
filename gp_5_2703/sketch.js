/*

The Game Project 5 - Bring it all together

*/

let gameChar;
let floorPos_y;
let scrollPos;
let clouds;
let mountains;
let trees;
let canyons;
let collectableItems;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar = {
    pos_x: width / 2,
    pos_y: floorPos_y,
    // Boolean variables to control the movement of the game character.
    isLeft: false,
    isRight: false,
    isFalling: false,
    isPlummeting: false,
    world_x: 0,
  };

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Variable to store the real position of the gameChar in the game
  // world. Needed for collision detection.
  gameChar.world_x = gameChar.pos_x - scrollPos;

  // Initialise arrays of scenery objects.
  //Canyons
  canyons = [
    {
      pos_x: 100,
      width: 100,
    },
    {
      pos_x: 800,
      width: 100,
    },
    {
      pos_x: 1500,
      width: 150,
    },
    {
      pos_x: -300,
      width: 150,
    },
  ];

  //Clouds
  clouds = [
    {
      pos_x: 300,
      pos_y: 100,
      scale: 3,
    },
    {
      pos_x: 1000,
      pos_y: 100,
      scale: 2,
    },
    {
      pos_x: 1700,
      pos_y: 120,
      scale: 4,
    },
    {
      pos_x: -200,
      pos_y: 120,
      scale: 2,
    },
    {
      pos_x: -600,
      pos_y: 100,
      scale: 1.5,
    },
  ];

  //Mountains
  mountains = [
    {
      pos_x: 800,
      pos_y: 200,
      wide: 150,
    },
    {
      pos_x: 2000,
      pos_y: 200,
      wide: 120,
    },
    {
      pos_x: -200,
      pos_y: 200,
      wide: 150,
    },
    {
      pos_x: -500,
      pos_y: 200,
      wide: 120,
    },
  ];

  //Tress
  trees = [
    {
      pos_x: 1200,
      pos_y: floorPos_y - 120,
      scale: 1.0,
      shadow_x: 1191,
      shadow_y: floorPos_y - 120 + 5,
    },
    {
      pos_x: -100,
      pos_y: floorPos_y - 120,
      scale: 1.0,
      shadow_x: -109,
      shadow_y: floorPos_y - 120 + 5,
    },
    {
      pos_x: -300,
      pos_y: floorPos_y - 120,
      scale: 1.0,
      shadow_x: -309,
      shadow_y: floorPos_y - 120 + 5,
    },
    {
      pos_x: 500,
      pos_y: floorPos_y - 120,
      scale: 1.0,
      shadow_x: 491,
      shadow_y: floorPos_y - 120 + 5,
    },
  ];

  //CollectableItems
  collectableItems = [
    {
      pos_x: 400,
      pos_y: 405,
      size: 10,
      isFound: false,
    },
    {
      pos_x: 1500,
      pos_y: 405,
      size: 10,
      isFound: false,
    },
    {
      pos_x: 900,
      pos_y: 350,
      size: 10,
      isFound: false,
    },
    {
      pos_x: -300,
      pos_y: 350,
      size: 10,
      isFound: false,
    },
  ];
}

function draw() {
  //fill the sky
  background(201, 229, 211);

  //draw ground
  noStroke();
  fill(142, 211, 208);
  rect(0, floorPos_y, width, 15);
  fill(84, 174, 171);
  rect(0, floorPos_y + 15, width, 15);
  fill(205, 149, 115);
  rect(0, floorPos_y + 30, width, 15);
  fill(247, 204, 198);
  rect(0, floorPos_y + 45, width, height - floorPos_y);

  push();
  translate(scrollPos, 0);

  // Draw clouds.
  drawClouds();

  // Draw mountains.
  drawMountains();

  // Draw trees.
  drawTrees();

  // Draw canyons.
  for (let i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
  }

  // Draw collectable items.
  for (let i = 0; i < collectableItems.length; i++) {
    if (collectableItems[i].isFound == false) {
      drawCollectable(collectableItems[i]);
      //Collectable item interaction
      checkCollectable(collectableItems[i]);
    }
  }

  pop();

  // Draw game character.
  drawGameChar();

  // Logic to make the game character move or the background scroll.
  if (gameChar.isLeft) {
    if (gameChar.pos_x > width * 0.2) {
      gameChar.pos_x -= 5;
    } else {
      scrollPos += 5;
    }
  }

  if (gameChar.isRight) {
    if (gameChar.pos_x < width * 0.8) {
      gameChar.pos_x += 5;
    } else {
      scrollPos -= 5; // negative for moving against the background
    }
  }

  // Logic to make the game character rise and fall.

  if (gameChar.isPlummeting === true && gameChar.pos_y === floorPos_y) {
    gameChar.pos_y -= 100;
  }

  if (gameChar.pos_y < floorPos_y) {
    gameChar.pos_y++;
    gameChar.isFalling = true;
  } else {
    gameChar.isFalling = false;
  }

  // Update real position of gameChar for collision detection.
  gameChar.world_x = gameChar.pos_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.

  if (key == "D" || keyCode == 39) {
    gameChar.isRight = true;
  }
  if (key == "A" || keyCode == 37) {
    gameChar.isLeft = true;
  }
  if (key == "W" || keyCode === 32 || keyCode === 38) {
    gameChar.isPlummeting = true;
  }
}

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.

  if (key == "D" || keyCode == 39) {
    gameChar.isRight = false;
  }
  if (key == "A" || keyCode == 37) {
    gameChar.isLeft = false;
  }
  if (key == "W" || keyCode === 32 || keyCode === 38) {
    gameChar.isPlummeting = false;
  }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.
function drawGameChar() {
  //the game character
  if (gameChar.isLeft && gameChar.isFalling) {
    // Jumping-left game character
    //hair
    fill(0);
    ellipse(gameChar.pos_x, gameChar.pos_y - 63.5, 5, 5);
    ellipse(gameChar.pos_x - 3, gameChar.pos_y - 62.5, 5, 5);
    ellipse(gameChar.pos_x + 3, gameChar.pos_y - 62.5, 5, 5);
    //Head
    fill(237, 201, 178);
    ellipse(gameChar.pos_x, gameChar.pos_y - 52.5, 20, 22);
    //nose
    fill(237, 201, 178);
    ellipse(gameChar.pos_x - 9, gameChar.pos_y - 52.5, 5, 6);
    //left eye
    fill(36, 30, 11);
    ellipse(gameChar.pos_x - 5, gameChar.pos_y - 54.5, 3, 2.5);
    //left cheek
    fill(255, 149, 149);
    ellipse(gameChar.pos_x - 6, gameChar.pos_y - 50.5, 3.5, 1.75);
    //mouth
    stroke(228, 154, 143);
    beginShape();
    curveVertex(gameChar.pos_x - 9, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x - 9, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x - 7, gameChar.pos_y - 45.5);
    curveVertex(gameChar.pos_x - 3, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x - 3, gameChar.pos_y - 47.5);
    endShape();
    //right leg
    noStroke();
    fill(141, 178, 190);
    rect(gameChar.pos_x + 2, gameChar.pos_y - 12.5, 5, 12);
    //right shoe
    fill(0);
    ellipse(gameChar.pos_x + 4, gameChar.pos_y + 0.5, 8, 5);
    //left leg
    fill(141, 178, 190);
    rect(gameChar.pos_x - 5, gameChar.pos_y - 15.5, 5, 12);
    //left shoe
    fill(0);
    ellipse(gameChar.pos_x - 4, gameChar.pos_y - 2.5, 8, 5);
    //Body
    fill(204, 227, 235);
    ellipse(gameChar.pos_x, gameChar.pos_y - 24, 20, 35);
    //left arm
    fill(141, 178, 190);
    ellipse(gameChar.pos_x, gameChar.pos_y - 42.5, 5, 17);
    //left hand
    fill(209, 169, 130);
    ellipse(gameChar.pos_x, gameChar.pos_y - 50.5, 5, 5);
  } else if (gameChar.isRight && gameChar.isFalling) {
    // Jumping-right game character
    //hair
    fill(0);
    ellipse(gameChar.pos_x, gameChar.pos_y - 63.5, 5, 5);
    ellipse(gameChar.pos_x - 3, gameChar.pos_y - 62.5, 5, 5);
    ellipse(gameChar.pos_x + 3, gameChar.pos_y - 62.5, 5, 5);
    //Head
    fill(237, 201, 178);
    ellipse(gameChar.pos_x, gameChar.pos_y - 52.5, 20, 22);
    //nose
    fill(237, 201, 178);
    ellipse(gameChar.pos_x + 9, gameChar.pos_y - 52.5, 5, 6);
    //right eye
    fill(36, 30, 11);
    ellipse(gameChar.pos_x + 5, gameChar.pos_y - 54.5, 3, 2.5);
    //right cheek
    fill(255, 149, 149);
    ellipse(gameChar.pos_x + 6, gameChar.pos_y - 50.5, 3.5, 1.75);
    //mouth
    stroke(228, 154, 143);
    beginShape();
    curveVertex(gameChar.pos_x + 9, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x + 9, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x + 7, gameChar.pos_y - 45.5);
    curveVertex(gameChar.pos_x + 3, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x + 3, gameChar.pos_y - 47.5);
    endShape();
    //left leg
    noStroke();
    fill(141, 178, 190);
    rect(gameChar.pos_x - 5, gameChar.pos_y - 12.5, 5, 12);
    //left shoe
    fill(0);
    ellipse(gameChar.pos_x - 2, gameChar.pos_y + 0.5, 8, 5);
    //right leg
    fill(141, 178, 190);
    rect(gameChar.pos_x + 2, gameChar.pos_y - 15.5, 5, 12);
    //right shoe
    fill(0);
    ellipse(gameChar.pos_x + 6, gameChar.pos_y - 3.5, 8, 5);
    //Body
    fill(204, 227, 235);
    ellipse(gameChar.pos_x, gameChar.pos_y - 24, 20, 35);
    //left arm
    fill(141, 178, 190);
    ellipse(gameChar.pos_x, gameChar.pos_y - 42.5, 5, 17);
    //left hand
    fill(209, 169, 130);
    ellipse(gameChar.pos_x, gameChar.pos_y - 50.5, 5, 5);
  } else if (gameChar.isLeft) {
    //Left standing game character
    //hair
    fill(0);
    ellipse(gameChar.pos_x, gameChar.pos_y - 63.5, 5, 5);
    ellipse(gameChar.pos_x - 3, gameChar.pos_y - 62.5, 5, 5);
    ellipse(gameChar.pos_x + 3, gameChar.pos_y - 62.5, 5, 5);
    //Head
    fill(237, 201, 178);
    ellipse(gameChar.pos_x, gameChar.pos_y - 52.5, 20, 22);
    //nose
    fill(237, 201, 178);
    ellipse(gameChar.pos_x - 9, gameChar.pos_y - 52.5, 5, 6);
    //left eye
    fill(36, 30, 11);
    ellipse(gameChar.pos_x - 5, gameChar.pos_y - 54.5, 3, 2.5);
    //left cheek
    fill(255, 149, 149);
    ellipse(gameChar.pos_x - 6, gameChar.pos_y - 50.5, 3.5, 1.75);
    //mouth
    stroke(228, 154, 143);
    beginShape();
    curveVertex(gameChar.pos_x - 9, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x - 9, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x - 7, gameChar.pos_y - 45.5);
    curveVertex(gameChar.pos_x - 3, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x - 3, gameChar.pos_y - 47.5);
    endShape();
    //right leg
    stroke(173, 205, 216);
    fill(141, 178, 190);
    rect(gameChar.pos_x - 6, gameChar.pos_y - 12.5, 5, 12);
    //right shoe
    stroke(181, 186, 188);
    fill(0);
    ellipse(gameChar.pos_x - 5, gameChar.pos_y + 0.5, 8, 5);
    //left leg
    stroke(173, 205, 216);
    fill(141, 178, 190);
    rect(gameChar.pos_x - 2, gameChar.pos_y - 12.5, 5, 12);
    //left shoe
    stroke(181, 186, 188);
    fill(0);
    ellipse(gameChar.pos_x, gameChar.pos_y + 0.5, 8, 5);
    //Body
    noStroke();
    fill(204, 227, 235);
    ellipse(gameChar.pos_x, gameChar.pos_y - 24, 20, 35);
    //left arm
    fill(141, 178, 190);
    ellipse(gameChar.pos_x, gameChar.pos_y - 30.5, 5, 17);
    //left hand
    fill(209, 169, 130);
    ellipse(gameChar.pos_x, gameChar.pos_y - 22.5, 5, 5);
  } else if (gameChar.isRight) {
    //Right standing game character
    //hair
    fill(0);
    ellipse(gameChar.pos_x, gameChar.pos_y - 63.5, 5, 5);
    ellipse(gameChar.pos_x - 3, gameChar.pos_y - 62.5, 5, 5);
    ellipse(gameChar.pos_x + 3, gameChar.pos_y - 62.5, 5, 5);
    //Head
    fill(237, 201, 178);
    ellipse(gameChar.pos_x, gameChar.pos_y - 52.5, 20, 22);
    //nose
    fill(237, 201, 178);
    ellipse(gameChar.pos_x + 9, gameChar.pos_y - 52.5, 5, 6);
    //right eye
    fill(36, 30, 11);
    ellipse(gameChar.pos_x + 5, gameChar.pos_y - 54.5, 3, 2.5);
    //right cheek
    fill(255, 149, 149);
    ellipse(gameChar.pos_x + 6, gameChar.pos_y - 50.5, 3.5, 1.75);
    //mouth
    stroke(228, 154, 143);
    beginShape();
    curveVertex(gameChar.pos_x + 9, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x + 9, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x + 7, gameChar.pos_y - 45.5);
    curveVertex(gameChar.pos_x + 3, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x + 3, gameChar.pos_y - 47.5);
    endShape();
    //left leg
    stroke(173, 205, 216);
    fill(141, 178, 190);
    rect(gameChar.pos_x - 4, gameChar.pos_y - 12.5, 5, 12);
    //left shoe
    stroke(181, 186, 188);
    fill(0);
    ellipse(gameChar.pos_x, gameChar.pos_y + 0.5, 8, 5);
    //right leg
    stroke(173, 205, 216);
    fill(141, 178, 190);
    rect(gameChar.pos_x, gameChar.pos_y - 12.5, 5, 12);
    //right shoe
    stroke(181, 186, 188);
    fill(0);
    ellipse(gameChar.pos_x + 4, gameChar.pos_y + 0.5, 8, 5);
    //Body
    noStroke();
    fill(204, 227, 235);
    ellipse(gameChar.pos_x, gameChar.pos_y - 24, 20, 35);
    //left arm
    fill(141, 178, 190);
    ellipse(gameChar.pos_x, gameChar.pos_y - 30.5, 5, 17);
    //left hand
    fill(209, 169, 130);
    ellipse(gameChar.pos_x, gameChar.pos_y - 22.5, 5, 5);
  } else if (gameChar.isFalling || gameChar.isPlummeting) {
    //Falling or Plummeting character
    //hair
    fill(0);
    ellipse(gameChar.pos_x, gameChar.pos_y - 63.5, 5, 5);
    ellipse(gameChar.pos_x - 3, gameChar.pos_y - 62.5, 5, 5);
    ellipse(gameChar.pos_x + 3, gameChar.pos_y - 62.5, 5, 5);
    //Head
    fill(237, 201, 178);
    ellipse(gameChar.pos_x, gameChar.pos_y - 52.5, 20, 22);
    //right eye
    fill(36, 30, 11);
    ellipse(gameChar.pos_x - 5, gameChar.pos_y - 54.5, 3, 2.5);
    //left eye
    fill(36, 30, 11);
    ellipse(gameChar.pos_x + 5, gameChar.pos_y - 54.5, 3, 2.5);
    //right ear
    fill(237, 201, 178);
    ellipse(gameChar.pos_x - 9, gameChar.pos_y - 52.5, 5, 6);
    //left ear
    fill(237, 201, 178);
    ellipse(gameChar.pos_x + 9, gameChar.pos_y - 52.5, 5, 6);
    //right cheek
    fill(255, 149, 149);
    ellipse(gameChar.pos_x - 5, gameChar.pos_y - 50.5, 3.5, 1.75);
    //left cheek
    ellipse(gameChar.pos_x + 5, gameChar.pos_y - 50.5, 3.5, 1.75);
    //mouth
    stroke(228, 154, 143);
    beginShape();
    curveVertex(gameChar.pos_x - 3, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x - 3, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x - 1, gameChar.pos_y - 45.5);
    curveVertex(gameChar.pos_x + 1, gameChar.pos_y - 45.5);
    curveVertex(gameChar.pos_x + 3, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x + 3, gameChar.pos_y - 47.5);
    endShape();
    //left leg
    noStroke();
    fill(141, 178, 190);
    rect(gameChar.pos_x + 3, gameChar.pos_y - 12.5, 5, 12);
    //left shoe
    fill(0);
    ellipse(gameChar.pos_x + 7, gameChar.pos_y + 0.5, 8, 5);
    //right leg
    fill(141, 178, 190);
    rect(gameChar.pos_x - 8, gameChar.pos_y - 12.5, 5, 12);
    //right shoe
    fill(0);
    ellipse(gameChar.pos_x - 7, gameChar.pos_y + 0.5, 8, 5);
    //Body
    fill(204, 227, 235);
    ellipse(gameChar.pos_x, gameChar.pos_y - 24, 20, 35);
    //left arm
    fill(141, 178, 190);
    ellipse(gameChar.pos_x + 7, gameChar.pos_y - 42.5, 5, 17);
    //left hand
    fill(209, 169, 130);
    ellipse(gameChar.pos_x + 7, gameChar.pos_y - 50.5, 5, 5);
    //right arm
    fill(141, 178, 190);
    ellipse(gameChar.pos_x - 7, gameChar.pos_y - 42.5, 5, 17);
    //right hand
    fill(209, 169, 130);
    ellipse(gameChar.pos_x - 7, gameChar.pos_y - 50.5, 5, 5);
  } else {
    //standing front facing code
    //hair
    fill(0);
    ellipse(gameChar.pos_x, gameChar.pos_y - 63.5, 5, 5);
    ellipse(gameChar.pos_x - 3, gameChar.pos_y - 62.5, 5, 5);
    ellipse(gameChar.pos_x + 3, gameChar.pos_y - 62.5, 5, 5);
    //Head
    fill(237, 201, 178);
    ellipse(gameChar.pos_x, gameChar.pos_y - 52.5, 20, 22);
    //right eye
    fill(36, 30, 11);
    ellipse(gameChar.pos_x - 5, gameChar.pos_y - 54.5, 3, 2.5);
    //left eye
    fill(36, 30, 11);
    ellipse(gameChar.pos_x + 5, gameChar.pos_y - 54.5, 3, 2.5);
    //right ear
    fill(237, 201, 178);
    ellipse(gameChar.pos_x - 9, gameChar.pos_y - 52.5, 5, 6);
    //left ear
    fill(237, 201, 178);
    ellipse(gameChar.pos_x + 9, gameChar.pos_y - 52.5, 5, 6);
    //right cheek
    fill(255, 149, 149);
    ellipse(gameChar.pos_x - 5, gameChar.pos_y - 50.5, 3.5, 1.75);
    //left cheek
    ellipse(gameChar.pos_x + 5, gameChar.pos_y - 50.5, 3.5, 1.75);
    //mouth
    stroke(228, 154, 143);
    beginShape();
    curveVertex(gameChar.pos_x - 3, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x - 3, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x - 1, gameChar.pos_y - 45.5);
    curveVertex(gameChar.pos_x + 1, gameChar.pos_y - 45.5);
    curveVertex(gameChar.pos_x + 3, gameChar.pos_y - 47.5);
    curveVertex(gameChar.pos_x + 3, gameChar.pos_y - 47.5);
    endShape();
    //left leg
    noStroke();
    fill(141, 178, 190);
    rect(gameChar.pos_x + 2, gameChar.pos_y - 12.5, 5, 12);
    //left shoe
    fill(0);
    ellipse(gameChar.pos_x + 6, gameChar.pos_y + 0.5, 8, 5);
    //right leg
    fill(141, 178, 190);
    rect(gameChar.pos_x - 6, gameChar.pos_y - 12.5, 5, 12);
    //right shoe
    fill(0);
    ellipse(gameChar.pos_x - 5, gameChar.pos_y + 0.5, 8, 5);
    //Body
    fill(204, 227, 235);
    ellipse(gameChar.pos_x, gameChar.pos_y - 24, 20, 35);
    //left arm
    fill(141, 178, 190);
    ellipse(gameChar.pos_x + 7, gameChar.pos_y - 30.5, 5, 17);
    //left hand
    fill(209, 169, 130);
    ellipse(gameChar.pos_x + 7, gameChar.pos_y - 22.5, 5, 5);
    //right arm
    fill(141, 178, 190);
    ellipse(gameChar.pos_x - 7, gameChar.pos_y - 30.5, 5, 17);
    //right hand
    fill(209, 169, 130);
    ellipse(gameChar.pos_x - 7, gameChar.pos_y - 22.5, 5, 5);
  }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds() {
  for (let i = 0; i < clouds.length; i++) {
    strokeWeight(1);
    fill(252, 251, 231);
    ellipse(
      clouds[i].pos_x,
      clouds[i].pos_y,
      24 * clouds[i].scale,
      24 * clouds[i].scale
    );
    ellipse(
      clouds[i].pos_x + 10,
      clouds[i].pos_y + 10,
      24 * clouds[i].scale,
      24 * clouds[i].scale
    );
    ellipse(
      clouds[i].pos_x + 30,
      clouds[i].pos_y + 10,
      24 * clouds[i].scale,
      24 * clouds[i].scale
    );
    ellipse(
      clouds[i].pos_x + 30,
      clouds[i].pos_y - 10,
      24 * clouds[i].scale,
      24 * clouds[i].scale
    );
    ellipse(
      clouds[i].pos_x + 20,
      clouds[i].pos_y - 10,
      24 * clouds[i].scale,
      24 * clouds[i].scale
    );
    ellipse(
      clouds[i].pos_x + 40,
      clouds[i].pos_y,
      24 * clouds[i].scale,
      24 * clouds[i].scale
    );
    //Right Eye
    stroke(51);
    beginShape();
    curveVertex(clouds[i].pos_x + 32, clouds[i].pos_y - 15);
    curveVertex(clouds[i].pos_x + 32, clouds[i].pos_y - 15);
    curveVertex(clouds[i].pos_x + 35, clouds[i].pos_y - 9);
    curveVertex(clouds[i].pos_x + 39, clouds[i].pos_y - 9);
    curveVertex(clouds[i].pos_x + 40, clouds[i].pos_y - 15);
    curveVertex(clouds[i].pos_x + 40, clouds[i].pos_y - 15);
    endShape();
    //Left Eye
    beginShape();
    curveVertex(clouds[i].pos_x, clouds[i].pos_y - 15);
    curveVertex(clouds[i].pos_x, clouds[i].pos_y - 15);
    curveVertex(clouds[i].pos_x + 4, clouds[i].pos_y - 9);
    curveVertex(clouds[i].pos_x + 8, clouds[i].pos_y - 9);
    curveVertex(clouds[i].pos_x + 8, clouds[i].pos_y - 15);
    curveVertex(clouds[i].pos_x + 8, clouds[i].pos_y - 15);
    endShape();
    fill(250, 165, 180);
    noStroke();
    //left cheek
    ellipse(clouds[i].pos_x + 3, clouds[i].pos_y, 10, 5);
    // right cheek
    ellipse(clouds[i].pos_x + 40, clouds[i].pos_y, 10, 5);
    //Mouth
    stroke(51);
    beginShape();
    fill(252, 251, 231);
    curveVertex(clouds[i].pos_x + 20, clouds[i].pos_y + 12);
    curveVertex(clouds[i].pos_x + 20, clouds[i].pos_y + 12);
    curveVertex(clouds[i].pos_x + 24, clouds[i].pos_y + 13);
    curveVertex(clouds[i].pos_x + 26, clouds[i].pos_y + 13);
    curveVertex(clouds[i].pos_x + 28, clouds[i].pos_y + 12);
    curveVertex(clouds[i].pos_x + 28, clouds[i].pos_y + 12);
    endShape();
    noStroke();
  }
}
// Function to draw mountains objects.
function drawMountains() {
  for (let i = 0; i < mountains.length; i++) {
    noStroke();
    fill(252, 251, 231);
    //mountains
    triangle(
      mountains[i].pos_x - mountains[i].wide,
      432,
      mountains[i].pos_x + mountains[i].wide,
      432,
      mountains[i].pos_x,
      mountains[i].pos_y
    );
    //mountain Crown
    fill(229, 126, 104);
    triangle(
      mountains[i].pos_x - 20,
      mountains[i].pos_y + 30,
      mountains[i].pos_x + 20,
      mountains[i].pos_y + 30,
      mountains[i].pos_x,
      mountains[i].pos_y
    );
    triangle(
      mountains[i].pos_x - 20,
      mountains[i].pos_y + 30,
      mountains[i].pos_x + 7,
      mountains[i].pos_y + 30,
      mountains[i].pos_x - 9,
      mountains[i].pos_y + 50
    );
    triangle(
      mountains[i].pos_x - 0,
      mountains[i].pos_y + 30,
      mountains[i].pos_x + 20,
      mountains[i].pos_y + 30,
      mountains[i].pos_x + 12,
      mountains[i].pos_y + 40
    );
  }
}
// Function to draw trees objects.
function drawTrees() {
  for (let i = 0; i < trees.length; i++) {
    noStroke();
    fill(204, 145, 115);
    rect(trees[i].pos_x - 2, trees[i].pos_y, 10, 120);
    fill(203, 174, 214);
    ellipse(
      trees[i].shadow_x,
      trees[i].shadow_y - 100,
      40 * trees[i].scale,
      20 * trees[i].scale
    );
    ellipse(
      trees[i].shadow_x,
      trees[i].shadow_y - 90,
      50 * trees[i].scale,
      25 * trees[i].scale
    );
    ellipse(
      trees[i].shadow_x,
      trees[i].shadow_y - 80,
      60 * trees[i].scale,
      30 * trees[i].scale
    );
    ellipse(
      trees[i].shadow_x,
      trees[i].shadow_y - 70,
      70 * trees[i].scale,
      35 * trees[i].scale
    );
    ellipse(
      trees[i].shadow_x,
      trees[i].shadow_y - 55,
      80 * trees[i].scale,
      40 * trees[i].scale
    );
    ellipse(
      trees[i].shadow_x,
      trees[i].shadow_y - 40,
      90 * trees[i].scale,
      45 * trees[i].scale
    );
    ellipse(
      trees[i].shadow_x,
      trees[i].shadow_y - 20,
      100 * trees[i].scale,
      50 * trees[i].scale
    );
    fill(218, 194, 225);
    ellipse(
      trees[i].pos_x,
      trees[i].pos_y - 100,
      40 * trees[i].scale,
      20 * trees[i].scale
    );
    ellipse(
      trees[i].pos_x,
      trees[i].pos_y - 90,
      50 * trees[i].scale,
      25 * trees[i].scale
    );
    ellipse(
      trees[i].pos_x,
      trees[i].pos_y - 80,
      60 * trees[i].scale,
      30 * trees[i].scale
    );
    ellipse(
      trees[i].pos_x,
      trees[i].pos_y - 70,
      70 * trees[i].scale,
      35 * trees[i].scale
    );
    ellipse(
      trees[i].pos_x,
      trees[i].pos_y - 55,
      80 * trees[i].scale,
      40 * trees[i].scale
    );
    ellipse(
      trees[i].pos_x,
      trees[i].pos_y - 40,
      90 * trees[i].scale,
      45 * trees[i].scale
    );
    ellipse(
      trees[i].pos_x,
      trees[i].pos_y - 20,
      100 * trees[i].scale,
      50 * trees[i].scale
    );
  }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.
function drawCanyon(t_canyon) {
  noStroke();
  fill(150, 127, 117);
  rect(t_canyon.pos_x, floorPos_y, t_canyon.width, height - floorPos_y);
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon) {
  if (
    gameChar.world_x - 5 > t_canyon.pos_x &&
    gameChar.world_x + 5 < t_canyon.pos_x + t_canyon.width &&
    gameChar.pos_y >= floorPos_y
  ) {
    gameChar.isPlummeting = true;
    gameChar.pos_y += 5;
  }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
function drawCollectable(t_collectable) {
  fill(205, 175, 158);
  ellipse(
    t_collectable.pos_x,
    t_collectable.pos_y,
    t_collectable.size * 3,
    t_collectable.size * 3
  );
  fill(240, 158, 179);
  ellipse(
    t_collectable.pos_x,
    t_collectable.pos_y,
    t_collectable.size * 1.75,
    t_collectable.size * 1.75
  );
  fill(201, 229, 211);
  ellipse(
    t_collectable.pos_x,
    t_collectable.pos_y,
    t_collectable.size,
    t_collectable.size
  );
  fill(255);
  ellipse(t_collectable.pos_x + 9, t_collectable.pos_y + 4, 3, 3);
  ellipse(t_collectable.pos_x - 9, t_collectable.pos_y + 4, 3, 3);
  ellipse(t_collectable.pos_x + 9, t_collectable.pos_y - 5, 3, 3);
  ellipse(t_collectable.pos_x - 7, t_collectable.pos_y - 5, 3, 3);
  ellipse(t_collectable.pos_x, t_collectable.pos_y - 10, 3, 3);
  ellipse(t_collectable.pos_x, t_collectable.pos_y + 10, 3, 3);
}

// Function to check character has collected an item.
function checkCollectable(t_collectable) {
  // 34 is gameChar body width + collectableItem size
  if (
    dist(
      t_collectable.pos_x,
      t_collectable.pos_y,
      gameChar.world_x,
      gameChar.pos_y
    ) < 34
  ) {
    t_collectable.isFound = true;
  }
}
