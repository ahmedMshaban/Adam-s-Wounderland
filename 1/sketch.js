/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.


WARNING: Do not get too carried away. If you're shape takes more than 5 lines
of code to draw then you've probably over done it.


*/

let tree;

function setup() {
  createCanvas(1024, 576);

  tree = {
    pos_x: 936,
    pos_y: 300,
    scale: 1.0,
    shadow_x: 927,
    shadow_y: 305,
  };

  cloud = {
    pos_x: 200,
    pos_y: 100,
    scale: 2,
  };

  canyon = {
    pos_x: 100,
    pos_y: 432,
  };

  collectableItem = {
    pos_x: 300,
    pos_y: 405,
    scale: 10,
  };

  mountain = {
    pos_x: 600,
    pos_y: 200,
    wide: 150,
  };
}

function draw() {
  background(201, 229, 211); //fill the sky blue

  noStroke();
  fill(142, 211, 208);
  rect(0, 432, 1024, 15); //draw some green ground total 144
  fill(84, 174, 171);
  rect(0, 447, 1024, 15);
  fill(205, 149, 115);
  rect(0, 462, 1024, 15);
  fill(247, 204, 198);
  rect(0, 477, 1024, 114);

  //1. a cloud in the sky
  //... add your code here
  //Cloud circles
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
  //2. a mountain in the distance
  //... add your code here

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

  //3. a tree
  //... add your code here
  fill(204, 145, 115);
  rect(tree.pos_x - 2, tree.pos_y, 10, 132);
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

  //4. a canyon
  //NB. the canyon should go from ground-level to the bottom of the screen
  //... add your code here

  noStroke();
  fill(150, 127, 117);
  rect(canyon.pos_x, canyon.pos_y, 100, 144);

  //5. a collectable token - eg. a jewel, fruit, coins
  //... add your code here

  noStroke();
  fill(205, 175, 158);
  ellipse(
    collectableItem.pos_x,
    collectableItem.pos_y,
    collectableItem.scale * 4,
    collectableItem.scale * 4
  );
  fill(240, 158, 179);
  ellipse(
    collectableItem.pos_x,
    collectableItem.pos_y,
    collectableItem.scale * 3,
    collectableItem.scale * 3
  );
  fill(201, 229, 211);
  ellipse(
    collectableItem.pos_x,
    collectableItem.pos_y,
    collectableItem.scale,
    collectableItem.scale
  );
  fill(255);
  ellipse(collectableItem.pos_x + 9, collectableItem.pos_y + 4, 3, 3);
  ellipse(collectableItem.pos_x - 9, collectableItem.pos_y + 4, 3, 3);
  ellipse(collectableItem.pos_x + 9, collectableItem.pos_y - 5, 3, 3);
  ellipse(collectableItem.pos_x - 7, collectableItem.pos_y - 5, 3, 3);
  ellipse(collectableItem.pos_x, collectableItem.pos_y - 10, 3, 3);
  ellipse(collectableItem.pos_x, collectableItem.pos_y + 10, 3, 3);
}
