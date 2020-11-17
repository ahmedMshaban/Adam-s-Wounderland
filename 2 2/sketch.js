/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. If you're character takes more than 5 lines
of code to draw then you've probably over done it.

** Only submit your sketch.js **

*/

let gameChar;

function setup() {
  createCanvas(400, 600);
  gameChar = {
    pos_x: 0,
    pos_y: 0,
  };
}

function draw() {
  background(255);

  //Standing, facing frontwards

  stroke(100);
  noFill();
  rect(20, 60, 50, 80);
  noStroke();
  fill(0);
  text('1. standing front facing', 20, 160);

  gameChar.pos_x = 45;
  gameChar.pos_y = 137;
  //Add your code here ...

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

  //Jumping facing forwards
  stroke(100);
  noFill();
  rect(220, 60, 50, 80);
  noStroke();
  fill(0);
  text('2. jumping facing forwards', 220, 160);

  gameChar.pos_x = 245;
  gameChar.pos_y = 137;
  //Add your code here ...
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

  //Walking, turned left
  stroke(100);
  noFill();
  rect(20, 260, 50, 80);
  noStroke();
  fill(0);
  text('3. Walking left', 20, 360);

  gameChar.pos_x = 45;
  gameChar.pos_y = 337;
  //Add your code here ...
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

  //Walking, turned right
  stroke(100);
  noFill();
  rect(220, 260, 50, 80);
  noStroke();
  fill(0);
  text('4. Walking right', 220, 360);

  gameChar.pos_x = 245;
  gameChar.pos_y = 337;
  //Add your code here ...

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

  //Jumping right
  stroke(100);
  noFill();
  rect(20, 460, 50, 80);
  noStroke();
  fill(0);
  text('5. Jumping to the right', 20, 560);

  gameChar.pos_x = 45;
  gameChar.pos_y = 537;
  //Add your code here ...

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

  //Jumping to the left
  stroke(100);
  noFill();
  rect(220, 460, 50, 80);
  noStroke();
  fill(0);
  text('6. Jumping to the left', 220, 560);

  gameChar.pos_x = 245;
  gameChar.pos_y = 537;
  //Add your code here ...
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
}
