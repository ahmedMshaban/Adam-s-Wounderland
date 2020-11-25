/*

The Game Project

2b - using variables

*/

let floorPos_y;

let gameChar;

let tree;

let canyon;

let collectableItem;

let mountain;

let cloud;

function setup() {
  createCanvas(1024, 576);

  floorPos_y = 432;

  gameChar = {
    pos_x: width / 2,
    pos_y: floorPos_y,
  };

  tree = {
    pos_x: 936,
    pos_y: floorPos_y - 120,
    scale: 1.0,
    shadow_x: 927,
    shadow_y: floorPos_y - 120 + 5,
  };

  canyon = {
    pos_x: 100,
    width: 100,
  };

  collectableItem = {
    pos_x: 400,
    pos_y: 405,
    size: 10,
  };

  cloud = {
    pos_x: 200,
    pos_y: 100,
    scale: 2,
  };

  mountain = {
    pos_x: 800,
    pos_y: 200,
    wide: 150,
  };
}

function draw() {
  console.log(height / 2);
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

  //A cloud in the sky
  strokeWeight(1);
  fill(252, 251, 231);
  ellipse(cloud.pos_x, cloud.pos_y, 24 * cloud.scale, 24 * cloud.scale);
  ellipse(
    cloud.pos_x + 10,
    cloud.pos_y + 10,
    24 * cloud.scale,
    24 * cloud.scale
  );
  ellipse(
    cloud.pos_x + 30,
    cloud.pos_y + 10,
    24 * cloud.scale,
    24 * cloud.scale
  );
  ellipse(
    cloud.pos_x + 30,
    cloud.pos_y - 10,
    24 * cloud.scale,
    24 * cloud.scale
  );
  ellipse(
    cloud.pos_x + 20,
    cloud.pos_y - 10,
    24 * cloud.scale,
    24 * cloud.scale
  );
  ellipse(cloud.pos_x + 40, cloud.pos_y, 24 * cloud.scale, 24 * cloud.scale);
  //Right Eye
  stroke(51);
  beginShape();
  curveVertex(cloud.pos_x + 32, cloud.pos_y - 15);
  curveVertex(cloud.pos_x + 32, cloud.pos_y - 15);
  curveVertex(cloud.pos_x + 35, cloud.pos_y - 9);
  curveVertex(cloud.pos_x + 39, cloud.pos_y - 9);
  curveVertex(cloud.pos_x + 40, cloud.pos_y - 15);
  curveVertex(cloud.pos_x + 40, cloud.pos_y - 15);
  endShape();
  //Left Eye
  beginShape();
  curveVertex(cloud.pos_x, cloud.pos_y - 15);
  curveVertex(cloud.pos_x, cloud.pos_y - 15);
  curveVertex(cloud.pos_x + 4, cloud.pos_y - 9);
  curveVertex(cloud.pos_x + 8, cloud.pos_y - 9);
  curveVertex(cloud.pos_x + 8, cloud.pos_y - 15);
  curveVertex(cloud.pos_x + 8, cloud.pos_y - 15);
  endShape();
  fill(250, 165, 180);
  noStroke();
  //left cheek
  ellipse(cloud.pos_x + 3, cloud.pos_y, 10, 5);
  // right cheek
  ellipse(cloud.pos_x + 40, cloud.pos_y, 10, 5);
  //Mouth
  stroke(51);
  beginShape();
  fill(252, 251, 231);
  curveVertex(cloud.pos_x + 20, cloud.pos_y + 12);
  curveVertex(cloud.pos_x + 20, cloud.pos_y + 12);
  curveVertex(cloud.pos_x + 24, cloud.pos_y + 13);
  curveVertex(cloud.pos_x + 26, cloud.pos_y + 13);
  curveVertex(cloud.pos_x + 28, cloud.pos_y + 12);
  curveVertex(cloud.pos_x + 28, cloud.pos_y + 12);
  endShape();

  //A mountain in the distance
  noStroke();
  fill(252, 251, 231);
  //Mountain
  triangle(
    mountain.pos_x - mountain.wide,
    432,
    mountain.pos_x + mountain.wide,
    432,
    mountain.pos_x,
    mountain.pos_y
  );
  //Mountain Crown
  fill(229, 126, 104);
  triangle(
    mountain.pos_x - 20,
    mountain.pos_y + 30,
    mountain.pos_x + 20,
    mountain.pos_y + 30,
    mountain.pos_x,
    mountain.pos_y
  );
  triangle(
    mountain.pos_x - 20,
    mountain.pos_y + 30,
    mountain.pos_x + 7,
    mountain.pos_y + 30,
    mountain.pos_x - 9,
    mountain.pos_y + 50
  );
  triangle(
    mountain.pos_x - 0,
    mountain.pos_y + 30,
    mountain.pos_x + 20,
    mountain.pos_y + 30,
    mountain.pos_x + 12,
    mountain.pos_y + 40
  );

  //Tree
  noStroke();
  fill(204, 145, 115);
  rect(tree.pos_x - 2, tree.pos_y, 10, 120);
  fill(203, 174, 214);
  ellipse(tree.shadow_x, tree.shadow_y - 100, 40 * tree.scale, 20 * tree.scale);
  ellipse(tree.shadow_x, tree.shadow_y - 90, 50 * tree.scale, 25 * tree.scale);
  ellipse(tree.shadow_x, tree.shadow_y - 80, 60 * tree.scale, 30 * tree.scale);
  ellipse(tree.shadow_x, tree.shadow_y - 70, 70 * tree.scale, 35 * tree.scale);
  ellipse(tree.shadow_x, tree.shadow_y - 55, 80 * tree.scale, 40 * tree.scale);
  ellipse(tree.shadow_x, tree.shadow_y - 40, 90 * tree.scale, 45 * tree.scale);
  ellipse(tree.shadow_x, tree.shadow_y - 20, 100 * tree.scale, 50 * tree.scale);
  fill(218, 194, 225);
  ellipse(tree.pos_x, tree.pos_y - 100, 40 * tree.scale, 20 * tree.scale);
  ellipse(tree.pos_x, tree.pos_y - 90, 50 * tree.scale, 25 * tree.scale);
  ellipse(tree.pos_x, tree.pos_y - 80, 60 * tree.scale, 30 * tree.scale);
  ellipse(tree.pos_x, tree.pos_y - 70, 70 * tree.scale, 35 * tree.scale);
  ellipse(tree.pos_x, tree.pos_y - 55, 80 * tree.scale, 40 * tree.scale);
  ellipse(tree.pos_x, tree.pos_y - 40, 90 * tree.scale, 45 * tree.scale);
  ellipse(tree.pos_x, tree.pos_y - 20, 100 * tree.scale, 50 * tree.scale);

  //Canyon
  noStroke();
  fill(150, 127, 117);
  rect(canyon.pos_x, floorPos_y, canyon.width, height - floorPos_y);

  //A collectable token
  fill(205, 175, 158);
  ellipse(
    collectableItem.pos_x,
    collectableItem.pos_y,
    collectableItem.size * 3,
    collectableItem.size * 3
  );
  fill(240, 158, 179);
  ellipse(
    collectableItem.pos_x,
    collectableItem.pos_y,
    collectableItem.size * 1.75,
    collectableItem.size * 1.75
  );
  fill(201, 229, 211);
  ellipse(
    collectableItem.pos_x,
    collectableItem.pos_y,
    collectableItem.size,
    collectableItem.size
  );
  fill(255);
  ellipse(collectableItem.pos_x + 9, collectableItem.pos_y + 4, 3, 3);
  ellipse(collectableItem.pos_x - 9, collectableItem.pos_y + 4, 3, 3);
  ellipse(collectableItem.pos_x + 9, collectableItem.pos_y - 5, 3, 3);
  ellipse(collectableItem.pos_x - 7, collectableItem.pos_y - 5, 3, 3);
  ellipse(collectableItem.pos_x, collectableItem.pos_y - 10, 3, 3);
  ellipse(collectableItem.pos_x, collectableItem.pos_y + 10, 3, 3);

  //GameChar Standing, facing frontwards
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


