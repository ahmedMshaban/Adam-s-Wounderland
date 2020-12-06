/*

Coursework 1.2 Game project

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
    isLeft: false,
    isRight: false,
    isFalling: false,
    isPlummeting: false,
  };

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Initialise arrays of scenery objects.

  //canyons
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

  //clouds
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

  //mountains
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

  //collectableItems
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
  for (let i = 0; i < clouds.length; i++) {
    //A clouds[i] in the sky
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

  // Draw mountains.
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

  // Draw trees.
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

  // Draw canyons
  for (let i = 0; i < canyons.length; i++) {
    noStroke();
    fill(150, 127, 117);
    rect(canyons[i].pos_x, floorPos_y, canyons[i].width, height - floorPos_y);
    //Falling down the canyon
    //Check if gameChar pos_x is within the range of the canyon
    if (
      gameChar.pos_x - 5 > canyons[i].pos_x + scrollPos &&
      gameChar.pos_x + 5 < canyons[i].pos_x + canyons[i].width + scrollPos &&
      gameChar.pos_y >= floorPos_y
    ) {
      gameChar.isPlummeting = true;
      gameChar.pos_y += 5;
    }
  }

  // Draw collectable items
  for (let i = 0; i < collectableItems.length; i++) {
    if (collectableItems[i].isFound == false) {
      fill(205, 175, 158);
      ellipse(
        collectableItems[i].pos_x,
        collectableItems[i].pos_y,
        collectableItems[i].size * 3,
        collectableItems[i].size * 3
      );
      fill(240, 158, 179);
      ellipse(
        collectableItems[i].pos_x,
        collectableItems[i].pos_y,
        collectableItems[i].size * 1.75,
        collectableItems[i].size * 1.75
      );
      fill(201, 229, 211);
      ellipse(
        collectableItems[i].pos_x,
        collectableItems[i].pos_y,
        collectableItems[i].size,
        collectableItems[i].size
      );
      fill(255);
      ellipse(
        collectableItems[i].pos_x + 9,
        collectableItems[i].pos_y + 4,
        3,
        3
      );
      ellipse(
        collectableItems[i].pos_x - 9,
        collectableItems[i].pos_y + 4,
        3,
        3
      );
      ellipse(
        collectableItems[i].pos_x + 9,
        collectableItems[i].pos_y - 5,
        3,
        3
      );
      ellipse(
        collectableItems[i].pos_x - 7,
        collectableItems[i].pos_y - 5,
        3,
        3
      );
      ellipse(collectableItems[i].pos_x, collectableItems[i].pos_y - 10, 3, 3);
      ellipse(collectableItems[i].pos_x, collectableItems[i].pos_y + 10, 3, 3);
      //Collectable item interaction
      // 34 is gameChar body width + collectableItem size
      if (
        dist(
          collectableItems[i].pos_x + scrollPos,
          collectableItems[i].pos_y,
          gameChar.pos_x,
          gameChar.pos_y
        ) < 34
      ) {
        collectableItems[i].isFound = true;
      }
    }
  }

  pop();

  //the game character
  if (gameChar.isLeft && gameChar.isFalling) {
    // add your jumping-left code
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
    // add your standing front facing code
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

  //////// Game character logic ///////
  // Logic to move
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

  if (gameChar.isPlummeting === true && gameChar.pos_y === floorPos_y) {
    gameChar.pos_y -= 100;
  }

  if (gameChar.pos_y < floorPos_y) {
    gameChar.pos_y++;
    gameChar.isFalling = true;
  } else {
    gameChar.isFalling = false;
  }
}

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
