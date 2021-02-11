let game;
let gameChar;
let scrollPos;

function setup() {
  createCanvas(1024, 576);
  game = {
    floorPos_y: (height * 3) / 4,
    lives: 3,
    score: 0,
    // ---------------------------
    // Initialise arrays of scenery objects.
    // ---------------------------
    canyons: [
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
    ],

    clouds: [
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
    ],

    mountains: [
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
    ],

    trees: [
      {
        pos_x: 1200,
        pos_y: this.floorPos_y - 120,
        scale: 1.0,
        shadow_x: 1191,
        shadow_y: this.floorPos_y - 120 + 5,
      },
      {
        pos_x: -100,
        pos_y: this.floorPos_y - 120,
        scale: 1.0,
        shadow_x: -109,
        shadow_y: this.floorPos_y - 120 + 5,
      },
      {
        pos_x: -300,
        pos_y: this.floorPos_y - 120,
        scale: 1.0,
        shadow_x: -309,
        shadow_y: this.floorPos_y - 120 + 5,
      },
      {
        pos_x: 500,
        pos_y: this.floorPos_y - 120,
        scale: 1.0,
        shadow_x: 491,
        shadow_y: this.floorPos_y - 120 + 5,
      },
    ],

    collectableItems: [
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
    ],

    // ---------------------------
    // Start Game function
    // ---------------------------
    start: function () {
      //Game Character
      gameChar = {
        pos_x: width / 2,
        pos_y: game.floorPos_y,
        world_x: 0,
        // Boolean variables to control the movement of the game character.
        isLeft: false,
        isRight: false,
        isFalling: false,
        isPlummeting: false,

        // Method to draw the game character.
        render: function () {
          if (this.isLeft && this.isFalling) {
            // Jumping-left game character
            //hair
            fill(0);
            ellipse(this.pos_x, this.pos_y - 63.5, 5, 5);
            ellipse(this.pos_x - 3, this.pos_y - 62.5, 5, 5);
            ellipse(this.pos_x + 3, this.pos_y - 62.5, 5, 5);
            //Head
            fill(237, 201, 178);
            ellipse(this.pos_x, this.pos_y - 52.5, 20, 22);
            //nose
            fill(237, 201, 178);
            ellipse(this.pos_x - 9, this.pos_y - 52.5, 5, 6);
            //left eye
            fill(36, 30, 11);
            ellipse(this.pos_x - 5, this.pos_y - 54.5, 3, 2.5);
            //left cheek
            fill(255, 149, 149);
            ellipse(this.pos_x - 6, this.pos_y - 50.5, 3.5, 1.75);
            //mouth
            stroke(228, 154, 143);
            beginShape();
            curveVertex(this.pos_x - 9, this.pos_y - 47.5);
            curveVertex(this.pos_x - 9, this.pos_y - 47.5);
            curveVertex(this.pos_x - 7, this.pos_y - 45.5);
            curveVertex(this.pos_x - 3, this.pos_y - 47.5);
            curveVertex(this.pos_x - 3, this.pos_y - 47.5);
            endShape();
            //right leg
            noStroke();
            fill(141, 178, 190);
            rect(this.pos_x + 2, this.pos_y - 12.5, 5, 12);
            //right shoe
            fill(0);
            ellipse(this.pos_x + 4, this.pos_y + 0.5, 8, 5);
            //left leg
            fill(141, 178, 190);
            rect(this.pos_x - 5, this.pos_y - 15.5, 5, 12);
            //left shoe
            fill(0);
            ellipse(this.pos_x - 4, this.pos_y - 2.5, 8, 5);
            //Body
            fill(204, 227, 235);
            ellipse(this.pos_x, this.pos_y - 24, 20, 35);
            //left arm
            fill(141, 178, 190);
            ellipse(this.pos_x, this.pos_y - 42.5, 5, 17);
            //left hand
            fill(209, 169, 130);
            ellipse(this.pos_x, this.pos_y - 50.5, 5, 5);
          } else if (this.isRight && this.isFalling) {
            // Jumping-right game character
            //hair
            fill(0);
            ellipse(this.pos_x, this.pos_y - 63.5, 5, 5);
            ellipse(this.pos_x - 3, this.pos_y - 62.5, 5, 5);
            ellipse(this.pos_x + 3, this.pos_y - 62.5, 5, 5);
            //Head
            fill(237, 201, 178);
            ellipse(this.pos_x, this.pos_y - 52.5, 20, 22);
            //nose
            fill(237, 201, 178);
            ellipse(this.pos_x + 9, this.pos_y - 52.5, 5, 6);
            //right eye
            fill(36, 30, 11);
            ellipse(this.pos_x + 5, this.pos_y - 54.5, 3, 2.5);
            //right cheek
            fill(255, 149, 149);
            ellipse(this.pos_x + 6, this.pos_y - 50.5, 3.5, 1.75);
            //mouth
            stroke(228, 154, 143);
            beginShape();
            curveVertex(this.pos_x + 9, this.pos_y - 47.5);
            curveVertex(this.pos_x + 9, this.pos_y - 47.5);
            curveVertex(this.pos_x + 7, this.pos_y - 45.5);
            curveVertex(this.pos_x + 3, this.pos_y - 47.5);
            curveVertex(this.pos_x + 3, this.pos_y - 47.5);
            endShape();
            //left leg
            noStroke();
            fill(141, 178, 190);
            rect(this.pos_x - 5, this.pos_y - 12.5, 5, 12);
            //left shoe
            fill(0);
            ellipse(this.pos_x - 2, this.pos_y + 0.5, 8, 5);
            //right leg
            fill(141, 178, 190);
            rect(this.pos_x + 2, this.pos_y - 15.5, 5, 12);
            //right shoe
            fill(0);
            ellipse(this.pos_x + 6, this.pos_y - 3.5, 8, 5);
            //Body
            fill(204, 227, 235);
            ellipse(this.pos_x, this.pos_y - 24, 20, 35);
            //left arm
            fill(141, 178, 190);
            ellipse(this.pos_x, this.pos_y - 42.5, 5, 17);
            //left hand
            fill(209, 169, 130);
            ellipse(this.pos_x, this.pos_y - 50.5, 5, 5);
          } else if (this.isLeft) {
            //Left standing game character
            //hair
            fill(0);
            ellipse(this.pos_x, this.pos_y - 63.5, 5, 5);
            ellipse(this.pos_x - 3, this.pos_y - 62.5, 5, 5);
            ellipse(this.pos_x + 3, this.pos_y - 62.5, 5, 5);
            //Head
            fill(237, 201, 178);
            ellipse(this.pos_x, this.pos_y - 52.5, 20, 22);
            //nose
            fill(237, 201, 178);
            ellipse(this.pos_x - 9, this.pos_y - 52.5, 5, 6);
            //left eye
            fill(36, 30, 11);
            ellipse(this.pos_x - 5, this.pos_y - 54.5, 3, 2.5);
            //left cheek
            fill(255, 149, 149);
            ellipse(this.pos_x - 6, this.pos_y - 50.5, 3.5, 1.75);
            //mouth
            stroke(228, 154, 143);
            beginShape();
            curveVertex(this.pos_x - 9, this.pos_y - 47.5);
            curveVertex(this.pos_x - 9, this.pos_y - 47.5);
            curveVertex(this.pos_x - 7, this.pos_y - 45.5);
            curveVertex(this.pos_x - 3, this.pos_y - 47.5);
            curveVertex(this.pos_x - 3, this.pos_y - 47.5);
            endShape();
            //right leg
            stroke(173, 205, 216);
            fill(141, 178, 190);
            rect(this.pos_x - 6, this.pos_y - 12.5, 5, 12);
            //right shoe
            stroke(181, 186, 188);
            fill(0);
            ellipse(this.pos_x - 5, this.pos_y + 0.5, 8, 5);
            //left leg
            stroke(173, 205, 216);
            fill(141, 178, 190);
            rect(this.pos_x - 2, this.pos_y - 12.5, 5, 12);
            //left shoe
            stroke(181, 186, 188);
            fill(0);
            ellipse(this.pos_x, this.pos_y + 0.5, 8, 5);
            //Body
            noStroke();
            fill(204, 227, 235);
            ellipse(this.pos_x, this.pos_y - 24, 20, 35);
            //left arm
            fill(141, 178, 190);
            ellipse(this.pos_x, this.pos_y - 30.5, 5, 17);
            //left hand
            fill(209, 169, 130);
            ellipse(this.pos_x, this.pos_y - 22.5, 5, 5);
          } else if (this.isRight) {
            //Right standing game character
            //hair
            fill(0);
            ellipse(this.pos_x, this.pos_y - 63.5, 5, 5);
            ellipse(this.pos_x - 3, this.pos_y - 62.5, 5, 5);
            ellipse(this.pos_x + 3, this.pos_y - 62.5, 5, 5);
            //Head
            fill(237, 201, 178);
            ellipse(this.pos_x, this.pos_y - 52.5, 20, 22);
            //nose
            fill(237, 201, 178);
            ellipse(this.pos_x + 9, this.pos_y - 52.5, 5, 6);
            //right eye
            fill(36, 30, 11);
            ellipse(this.pos_x + 5, this.pos_y - 54.5, 3, 2.5);
            //right cheek
            fill(255, 149, 149);
            ellipse(this.pos_x + 6, this.pos_y - 50.5, 3.5, 1.75);
            //mouth
            stroke(228, 154, 143);
            beginShape();
            curveVertex(this.pos_x + 9, this.pos_y - 47.5);
            curveVertex(this.pos_x + 9, this.pos_y - 47.5);
            curveVertex(this.pos_x + 7, this.pos_y - 45.5);
            curveVertex(this.pos_x + 3, this.pos_y - 47.5);
            curveVertex(this.pos_x + 3, this.pos_y - 47.5);
            endShape();
            //left leg
            stroke(173, 205, 216);
            fill(141, 178, 190);
            rect(this.pos_x - 4, this.pos_y - 12.5, 5, 12);
            //left shoe
            stroke(181, 186, 188);
            fill(0);
            ellipse(this.pos_x, this.pos_y + 0.5, 8, 5);
            //right leg
            stroke(173, 205, 216);
            fill(141, 178, 190);
            rect(this.pos_x, this.pos_y - 12.5, 5, 12);
            //right shoe
            stroke(181, 186, 188);
            fill(0);
            ellipse(this.pos_x + 4, this.pos_y + 0.5, 8, 5);
            //Body
            noStroke();
            fill(204, 227, 235);
            ellipse(this.pos_x, this.pos_y - 24, 20, 35);
            //left arm
            fill(141, 178, 190);
            ellipse(this.pos_x, this.pos_y - 30.5, 5, 17);
            //left hand
            fill(209, 169, 130);
            ellipse(this.pos_x, this.pos_y - 22.5, 5, 5);
          } else if (this.isFalling || this.isPlummeting) {
            //Falling or Plummeting character
            //hair
            fill(0);
            ellipse(this.pos_x, this.pos_y - 63.5, 5, 5);
            ellipse(this.pos_x - 3, this.pos_y - 62.5, 5, 5);
            ellipse(this.pos_x + 3, this.pos_y - 62.5, 5, 5);
            //Head
            fill(237, 201, 178);
            ellipse(this.pos_x, this.pos_y - 52.5, 20, 22);
            //right eye
            fill(36, 30, 11);
            ellipse(this.pos_x - 5, this.pos_y - 54.5, 3, 2.5);
            //left eye
            fill(36, 30, 11);
            ellipse(this.pos_x + 5, this.pos_y - 54.5, 3, 2.5);
            //right ear
            fill(237, 201, 178);
            ellipse(this.pos_x - 9, this.pos_y - 52.5, 5, 6);
            //left ear
            fill(237, 201, 178);
            ellipse(this.pos_x + 9, this.pos_y - 52.5, 5, 6);
            //right cheek
            fill(255, 149, 149);
            ellipse(this.pos_x - 5, this.pos_y - 50.5, 3.5, 1.75);
            //left cheek
            ellipse(this.pos_x + 5, this.pos_y - 50.5, 3.5, 1.75);
            //mouth
            stroke(228, 154, 143);
            beginShape();
            curveVertex(this.pos_x - 3, this.pos_y - 47.5);
            curveVertex(this.pos_x - 3, this.pos_y - 47.5);
            curveVertex(this.pos_x - 1, this.pos_y - 45.5);
            curveVertex(this.pos_x + 1, this.pos_y - 45.5);
            curveVertex(this.pos_x + 3, this.pos_y - 47.5);
            curveVertex(this.pos_x + 3, this.pos_y - 47.5);
            endShape();
            //left leg
            noStroke();
            fill(141, 178, 190);
            rect(this.pos_x + 3, this.pos_y - 12.5, 5, 12);
            //left shoe
            fill(0);
            ellipse(this.pos_x + 7, this.pos_y + 0.5, 8, 5);
            //right leg
            fill(141, 178, 190);
            rect(this.pos_x - 8, this.pos_y - 12.5, 5, 12);
            //right shoe
            fill(0);
            ellipse(this.pos_x - 7, this.pos_y + 0.5, 8, 5);
            //Body
            fill(204, 227, 235);
            ellipse(this.pos_x, this.pos_y - 24, 20, 35);
            //left arm
            fill(141, 178, 190);
            ellipse(this.pos_x + 7, this.pos_y - 42.5, 5, 17);
            //left hand
            fill(209, 169, 130);
            ellipse(this.pos_x + 7, this.pos_y - 50.5, 5, 5);
            //right arm
            fill(141, 178, 190);
            ellipse(this.pos_x - 7, this.pos_y - 42.5, 5, 17);
            //right hand
            fill(209, 169, 130);
            ellipse(this.pos_x - 7, this.pos_y - 50.5, 5, 5);
          } else {
            //standing front facing code
            //hair
            fill(0);
            ellipse(this.pos_x, this.pos_y - 63.5, 5, 5);
            ellipse(this.pos_x - 3, this.pos_y - 62.5, 5, 5);
            ellipse(this.pos_x + 3, this.pos_y - 62.5, 5, 5);
            //Head
            fill(237, 201, 178);
            ellipse(this.pos_x, this.pos_y - 52.5, 20, 22);
            //right eye
            fill(36, 30, 11);
            ellipse(this.pos_x - 5, this.pos_y - 54.5, 3, 2.5);
            //left eye
            fill(36, 30, 11);
            ellipse(this.pos_x + 5, this.pos_y - 54.5, 3, 2.5);
            //right ear
            fill(237, 201, 178);
            ellipse(this.pos_x - 9, this.pos_y - 52.5, 5, 6);
            //left ear
            fill(237, 201, 178);
            ellipse(this.pos_x + 9, this.pos_y - 52.5, 5, 6);
            //right cheek
            fill(255, 149, 149);
            ellipse(this.pos_x - 5, this.pos_y - 50.5, 3.5, 1.75);
            //left cheek
            ellipse(this.pos_x + 5, this.pos_y - 50.5, 3.5, 1.75);
            //mouth
            stroke(228, 154, 143);
            beginShape();
            curveVertex(this.pos_x - 3, this.pos_y - 47.5);
            curveVertex(this.pos_x - 3, this.pos_y - 47.5);
            curveVertex(this.pos_x - 1, this.pos_y - 45.5);
            curveVertex(this.pos_x + 1, this.pos_y - 45.5);
            curveVertex(this.pos_x + 3, this.pos_y - 47.5);
            curveVertex(this.pos_x + 3, this.pos_y - 47.5);
            endShape();
            //left leg
            noStroke();
            fill(141, 178, 190);
            rect(this.pos_x + 2, this.pos_y - 12.5, 5, 12);
            //left shoe
            fill(0);
            ellipse(this.pos_x + 6, this.pos_y + 0.5, 8, 5);
            //right leg
            fill(141, 178, 190);
            rect(this.pos_x - 6, this.pos_y - 12.5, 5, 12);
            //right shoe
            fill(0);
            ellipse(this.pos_x - 5, this.pos_y + 0.5, 8, 5);
            //Body
            fill(204, 227, 235);
            ellipse(this.pos_x, this.pos_y - 24, 20, 35);
            //left arm
            fill(141, 178, 190);
            ellipse(this.pos_x + 7, this.pos_y - 30.5, 5, 17);
            //left hand
            fill(209, 169, 130);
            ellipse(this.pos_x + 7, this.pos_y - 22.5, 5, 5);
            //right arm
            fill(141, 178, 190);
            ellipse(this.pos_x - 7, this.pos_y - 30.5, 5, 17);
            //right hand
            fill(209, 169, 130);
            ellipse(this.pos_x - 7, this.pos_y - 22.5, 5, 5);
          }
        },

        //Logic to move the game character.
        moveGameChar: function () {
          /* this.pos_y <= game.floorPos_y 
      Make sure the gameChar is above the ground. to prevent moving while failling in the canyons.*/
          if (this.isLeft && this.pos_y <= game.floorPos_y) {
            if (this.pos_x > width * 0.2) {
              this.pos_x -= 5;
            } else {
              scrollPos += 5;
            }
          }

          if (this.isRight && this.pos_y <= game.floorPos_y) {
            if (this.pos_x < width * 0.8) {
              this.pos_x += 5;
            } else {
              scrollPos -= 5; // negative for moving against the background
            }
          }

          // Logic to make the game character rise and fall.
          if (this.isPlummeting && this.pos_y == game.floorPos_y) {
            this.pos_y -= 100;
          }

          if (this.pos_y < game.floorPos_y) {
            this.pos_y++;
            this.isFalling = true;
          } else {
            this.isFalling = false;
          }
        },
      };

      //Flagpole
      flagpole = {
        x_pos: 2100,
        isReached: false,

        // ----------------------------------
        // Flagpole render and check functions
        // ----------------------------------

        // Function to draw the Flagpole on the screen.
        render: function () {
          push();
          strokeWeight(5);
          stroke(180);
          line(
            flagpole.x_pos,
            game.floorPos_y,
            flagpole.x_pos,
            game.floorPos_y - 250
          );
          fill(255, 0, 255);
          noStroke();
          if (flagpole.isReached) {
            rect(flagpole.x_pos, game.floorPos_y - 250, 50, 50);
          } else {
            rect(flagpole.x_pos, game.floorPos_y - 50, 50, 50);
          }
          pop();
        },

        // Function to check if the gameChar is in range of the flagpole
        check: function () {
          //Calculate the destination between gameChar and Flagpole
          destCalculate = abs(gameChar.world_x - flagpole.x_pos);

          if (destCalculate < 50) {
            flagpole.isReached = true;
          }
        },
      };

      // Variable to control the background scrolling.
      scrollPos = 0;

      // Variable to store the real position of the gameChar in the game world.
      // Needed for collision detection.
      gameChar.world_x = gameChar.pos_x - scrollPos;
    },

    // ---------------------------
    // Background render functions
    // ---------------------------

    // Draw the ground
    drawGround: function () {
      noStroke();
      fill(142, 211, 208);
      rect(0, game.floorPos_y, width, 15);
      fill(84, 174, 171);
      rect(0, game.floorPos_y + 15, width, 15);
      fill(205, 149, 115);
      rect(0, game.floorPos_y + 30, width, 15);
      fill(247, 204, 198);
      rect(0, game.floorPos_y + 45, width, height - game.floorPos_y);
    },

    // Fill the sky
    drawSky: function () {
      background(201, 229, 211);
    },

    // Draw cloud objects
    drawClouds: function () {
      for (let i = 0; i < this.clouds.length; i++) {
        strokeWeight(1);
        fill(252, 251, 231);
        ellipse(
          this.clouds[i].pos_x,
          this.clouds[i].pos_y,
          24 * this.clouds[i].scale,
          24 * this.clouds[i].scale
        );
        ellipse(
          this.clouds[i].pos_x + 10,
          this.clouds[i].pos_y + 10,
          24 * this.clouds[i].scale,
          24 * this.clouds[i].scale
        );
        ellipse(
          this.clouds[i].pos_x + 30,
          this.clouds[i].pos_y + 10,
          24 * this.clouds[i].scale,
          24 * this.clouds[i].scale
        );
        ellipse(
          this.clouds[i].pos_x + 30,
          this.clouds[i].pos_y - 10,
          24 * this.clouds[i].scale,
          24 * this.clouds[i].scale
        );
        ellipse(
          this.clouds[i].pos_x + 20,
          this.clouds[i].pos_y - 10,
          24 * this.clouds[i].scale,
          24 * this.clouds[i].scale
        );
        ellipse(
          this.clouds[i].pos_x + 40,
          this.clouds[i].pos_y,
          24 * this.clouds[i].scale,
          24 * this.clouds[i].scale
        );
        //Right Eye
        stroke(51);
        beginShape();
        curveVertex(this.clouds[i].pos_x + 32, this.clouds[i].pos_y - 15);
        curveVertex(this.clouds[i].pos_x + 32, this.clouds[i].pos_y - 15);
        curveVertex(this.clouds[i].pos_x + 35, this.clouds[i].pos_y - 9);
        curveVertex(this.clouds[i].pos_x + 39, this.clouds[i].pos_y - 9);
        curveVertex(this.clouds[i].pos_x + 40, this.clouds[i].pos_y - 15);
        curveVertex(this.clouds[i].pos_x + 40, this.clouds[i].pos_y - 15);
        endShape();
        //Left Eye
        beginShape();
        curveVertex(this.clouds[i].pos_x, this.clouds[i].pos_y - 15);
        curveVertex(this.clouds[i].pos_x, this.clouds[i].pos_y - 15);
        curveVertex(this.clouds[i].pos_x + 4, this.clouds[i].pos_y - 9);
        curveVertex(this.clouds[i].pos_x + 8, this.clouds[i].pos_y - 9);
        curveVertex(this.clouds[i].pos_x + 8, this.clouds[i].pos_y - 15);
        curveVertex(this.clouds[i].pos_x + 8, this.clouds[i].pos_y - 15);
        endShape();
        fill(250, 165, 180);
        noStroke();
        //left cheek
        ellipse(this.clouds[i].pos_x + 3, this.clouds[i].pos_y, 10, 5);
        // right cheek
        ellipse(this.clouds[i].pos_x + 40, this.clouds[i].pos_y, 10, 5);
        //Mouth
        stroke(51);
        beginShape();
        fill(252, 251, 231);
        curveVertex(this.clouds[i].pos_x + 20, this.clouds[i].pos_y + 12);
        curveVertex(this.clouds[i].pos_x + 20, this.clouds[i].pos_y + 12);
        curveVertex(this.clouds[i].pos_x + 24, this.clouds[i].pos_y + 13);
        curveVertex(this.clouds[i].pos_x + 26, this.clouds[i].pos_y + 13);
        curveVertex(this.clouds[i].pos_x + 28, this.clouds[i].pos_y + 12);
        curveVertex(this.clouds[i].pos_x + 28, this.clouds[i].pos_y + 12);
        endShape();
        noStroke();
      }
    },

    // Draw mountains objects
    drawMountains: function () {
      for (let i = 0; i < this.mountains.length; i++) {
        noStroke();
        fill(252, 251, 231);
        //mountains
        triangle(
          this.mountains[i].pos_x - this.mountains[i].wide,
          432,
          this.mountains[i].pos_x + this.mountains[i].wide,
          432,
          this.mountains[i].pos_x,
          this.mountains[i].pos_y
        );
        //mountain Crown
        fill(229, 126, 104);
        triangle(
          this.mountains[i].pos_x - 20,
          this.mountains[i].pos_y + 30,
          this.mountains[i].pos_x + 20,
          this.mountains[i].pos_y + 30,
          this.mountains[i].pos_x,
          this.mountains[i].pos_y
        );
        triangle(
          this.mountains[i].pos_x - 20,
          this.mountains[i].pos_y + 30,
          this.mountains[i].pos_x + 7,
          this.mountains[i].pos_y + 30,
          this.mountains[i].pos_x - 9,
          this.mountains[i].pos_y + 50
        );
        triangle(
          this.mountains[i].pos_x - 0,
          this.mountains[i].pos_y + 30,
          this.mountains[i].pos_x + 20,
          this.mountains[i].pos_y + 30,
          this.mountains[i].pos_x + 12,
          this.mountains[i].pos_y + 40
        );
      }
    },

    // Draw trees objects
    drawTrees: function () {
      for (let i = 0; i < this.trees.length; i++) {
        noStroke();
        fill(204, 145, 115);
        rect(this.trees[i].pos_x - 2, this.trees[i].pos_y, 10, 120);
        fill(203, 174, 214);
        ellipse(
          this.trees[i].shadow_x,
          this.trees[i].shadow_y - 100,
          40 * this.trees[i].scale,
          20 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].shadow_x,
          this.trees[i].shadow_y - 90,
          50 * this.trees[i].scale,
          25 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].shadow_x,
          this.trees[i].shadow_y - 80,
          60 * this.trees[i].scale,
          30 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].shadow_x,
          this.trees[i].shadow_y - 70,
          70 * this.trees[i].scale,
          35 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].shadow_x,
          this.trees[i].shadow_y - 55,
          80 * this.trees[i].scale,
          40 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].shadow_x,
          this.trees[i].shadow_y - 40,
          90 * this.trees[i].scale,
          45 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].shadow_x,
          this.trees[i].shadow_y - 20,
          100 * this.trees[i].scale,
          50 * this.trees[i].scale
        );
        fill(218, 194, 225);
        ellipse(
          this.trees[i].pos_x,
          this.trees[i].pos_y - 100,
          40 * this.trees[i].scale,
          20 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].pos_x,
          this.trees[i].pos_y - 90,
          50 * this.trees[i].scale,
          25 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].pos_x,
          this.trees[i].pos_y - 80,
          60 * this.trees[i].scale,
          30 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].pos_x,
          this.trees[i].pos_y - 70,
          70 * this.trees[i].scale,
          35 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].pos_x,
          this.trees[i].pos_y - 55,
          80 * this.trees[i].scale,
          40 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].pos_x,
          this.trees[i].pos_y - 40,
          90 * this.trees[i].scale,
          45 * this.trees[i].scale
        );
        ellipse(
          this.trees[i].pos_x,
          this.trees[i].pos_y - 20,
          100 * this.trees[i].scale,
          50 * this.trees[i].scale
        );
      }
    },

    // ---------------------------------
    // Canyon render and check functions
    // ---------------------------------

    // Draw canyon objects
    drawCanyon: function (t_canyon) {
      noStroke();
      fill(150, 127, 117);
      rect(
        t_canyon.pos_x,
        this.floorPos_y,
        t_canyon.width,
        height - this.floorPos_y
      );
    },

    // Check if the character is over a canyon
    checkCanyon: function (t_canyon) {
      if (
        gameChar.world_x - 5 > t_canyon.pos_x &&
        gameChar.world_x + 5 < t_canyon.pos_x + t_canyon.width &&
        gameChar.pos_y >= this.floorPos_y
      ) {
        gameChar.isPlummeting = true;
        gameChar.pos_y += 5;
      }
    },

    // ----------------------------------
    // Collectable items render and check functions
    // ----------------------------------

    // Draw collectable objects.
    drawCollectable: function (t_collectable) {
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
    },

    // Check if character has collected an item.
    checkCollectable: function (t_collectable) {
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
        game.scoreCounter();
      }
    },

    // ----------------------------------
    // Score render and increment functions
    // ----------------------------------

    // Draw the score on the screen.
    drawScore: function () {
      fill(255);
      noStroke();
      textSize(17);
      text("Score: " + game.score, 20, 30);
    },

    // Increment game score by one each time the character collects an item.
    scoreCounter: function () {
      game.score++;
    },

    // ----------------------------------
    // lives render and check functions
    // ----------------------------------

    /* Tests if your character has fallen below the bottom of the canvas.
    When this is `true`, decrement the `lives` counter by one */
    checkPlayerDie: function () {
      if (gameChar.pos_y > height) {
        game.lives--;
        if (game.lives > 0) {
          game.start();
        }
      }
    },

    /* Draw life tokens onto the screen so the player
	  can keep track of how many lives have remaining */
    drawPlayerLives: function () {
      livesBasePos = width - 30;
      for (let i = 0; i < game.lives; i++) {
        push();
        //hair
        fill(0);
        ellipse(livesBasePos, 16.5, 5, 5);
        ellipse(livesBasePos - 3, 17.5, 5, 5);
        ellipse(livesBasePos + 3, 17.5, 5, 5);
        //Head
        fill(237, 201, 178);
        ellipse(livesBasePos, 27.5, 20, 22);
        //right eye
        fill(36, 30, 11);
        ellipse(livesBasePos - 5, 25.5, 3, 2.5);
        //left eye
        fill(36, 30, 11);
        ellipse(livesBasePos + 5, 25.5, 3, 2.5);
        //right ear
        fill(237, 201, 178);
        ellipse(livesBasePos - 9, 27.5, 5, 6);
        //left ear
        fill(237, 201, 178);
        ellipse(livesBasePos + 9, 27.5, 5, 6);
        //right cheek
        fill(255, 149, 149);
        ellipse(livesBasePos - 5, 29.5, 3.5, 1.75);
        //left cheek
        ellipse(livesBasePos + 5, 29.5, 3.5, 1.75);
        //mouth
        stroke(228, 154, 143);
        beginShape();
        curveVertex(livesBasePos - 3, 32.5);
        curveVertex(livesBasePos - 3, 32.5);
        curveVertex(livesBasePos - 1, 34.5);
        curveVertex(livesBasePos + 1, 34.5);
        curveVertex(livesBasePos + 3, 32.5);
        curveVertex(livesBasePos + 3, 32.5);
        endShape();
        livesBasePos -= 30;
        pop();
      }
    },

    // ----------------------------------
    // Flagpole render and check functions
    // ----------------------------------

    // ---------------------------
    // Game over, completed and reset functions
    // ---------------------------

    // Game over render
    over: function () {
      push();
      fill(255);
      stroke(1);
      textSize(35);
      textAlign(CENTER);
      text("Game over. Press space to continue.", width / 2, height / 2);
      pop();
    },

    // Game complete render
    completed: function () {
      push();
      fill(255);
      stroke(1);
      textSize(35);
      textAlign(CENTER);
      text("Level complete. Press space to continue.", width / 2, height / 2);
      pop();
    },

    //Reset game score and live
    reset: function () {
      this.lives = 3;
      this.score = 0;
    },
  };

  game.start();
}

function draw() {
  //fill the sky
  game.drawSky();

  //draw ground
  game.drawGround();

  push();
  translate(scrollPos, 0);

  // Draw clouds.
  game.drawClouds();

  // Draw mountains.
  game.drawMountains();

  // Draw trees.
  game.drawTrees();

  // Draw canyons.
  for (let i = 0; i < game.canyons.length; i++) {
    game.drawCanyon(game.canyons[i]);
    game.checkCanyon(game.canyons[i]);
  }

  // Draw collectable items.
  for (let i = 0; i < game.collectableItems.length; i++) {
    if (game.collectableItems[i].isFound == false) {
      game.drawCollectable(game.collectableItems[i]);
      //Collectable item interaction
      game.checkCollectable(game.collectableItems[i]);
    }
  }

  // Draw Flagpole.
  flagpole.render();

  pop();

  // Draw game character.
  gameChar.render();

  // Draw game Score.
  game.drawScore();

  // Check if the game is over.
  if (game.lives < 1) {
    game.over();
    return;
  }

  // Check if the flagpole is reached.
  if (flagpole.isReached) {
    game.completed();
    return;
  }

  // Logic to make the game character move or the background scroll.
  gameChar.moveGameChar();

  // Flagpole checking function
  if (flagpole.isReached == false) {
    flagpole.check();
  }

  // Check If the player die.
  game.checkPlayerDie();

  // Draw player lives.
  game.drawPlayerLives();

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
  if (key == "W" || keyCode == 38) {
    gameChar.isPlummeting = true;
  }
  if (key == " " || keyCode == 32) {
    if (game.lives < 1 || flagpole.isReached) {
      game.reset();
      game.start();
    } else {
      gameChar.isPlummeting = true;
    }
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
  if (key == "W" || keyCode == 32 || keyCode == 38) {
    gameChar.isPlummeting = false;
  }
}
