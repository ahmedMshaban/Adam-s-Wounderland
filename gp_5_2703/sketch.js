let game;
let player;
let character;
let sound;
let floorPos_y;
let scrollPos;
let canyons;
let clouds;
let mountains;
let trees;
let collectableItems;
let platforms;
let enemies;
let flagpole;

function preload() {
  soundFormats("mp3", "wav");
  //load your sounds here
  sound = {
    jump: loadSound("assets/jump.wav"),
    collectItem: loadSound("assets/collectItem.wav"),
    gameWin: loadSound("assets/gameWin.wav"),
    gameOver: loadSound("assets/gameOver.wav"),
    fall: loadSound("assets/charFall.wav"),
  };
}

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  startGame();
}

function startGame() {
  // Variable to control the background scrolling.
  scrollPos = 0;
  canyons = [];
  clouds = [];
  mountains = [];
  trees = [];
  collectableItems = [];
  platforms = [];
  enemies = [];
  flagpole = {
    x_pos: 2500,
    isReached: false,
    // ----------------------------------
    // Flagpole render and check functions
    // ----------------------------------
    // Function to draw the Flagpole on the screen.
    draw: function () {
      push();
      strokeWeight(5);
      stroke(180);
      line(this.x_pos, floorPos_y, this.x_pos, floorPos_y - 250);
      fill(229, 126, 104);
      noStroke();
      if (this.isReached) {
        rect(this.x_pos, floorPos_y - 250, 50, 50);
      } else {
        rect(this.x_pos, floorPos_y - 50, 50, 50);
      }
      pop();
    },

    // Function to check if the character is in range of the flagpole
    checkContact: function () {
      //Calculate the destination between character and Flagpole
      destCalculate = abs(character.world_x - this.x_pos);

      if (destCalculate < 50) {
        this.isReached = true;
      }
    },
  };
  player = {
    lives: 3,
    score: 0,
    // ----------------------------------
    // Score render and increment functions
    // ----------------------------------
    // Draw the score on the screen.
    drawScore: function () {
      fill(255);
      noStroke();
      textSize(17);
      text("Score: " + this.score, 20, 30);
    },

    // Increment game score by one each time the character collects an item.
    scoreCounter: function () {
      this.score++;
    },

    // ----------------------------------
    // lives render and check functions
    // ----------------------------------

    /* Tests if your character has fallen below the bottom of the canvas.
    When this is `true`, decrement the `lives` counter by one */
    checkDie: function () {
      if (character.pos_y > height) {
        this.lives--;
        if (this.lives > 0) {
          game.start();
        }
      }
    },

    /* Draw life tokens onto the screen so the player
	  can keep track of how many lives have remaining */
    drawLives: function () {
      livesBasePos = width - 30;
      for (let i = 0; i < this.lives; i++) {
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
  };
  character = {
    pos_x: 50,
    pos_y: floorPos_y,
    world_x: 9,
    // Boolean variables to control the movement of the game character.
    isLeft: false,
    isRight: false,
    isFalling: false,
    isPlummeting: false,
    isContact: false,
    // ---------------------------
    // Character render and move functions
    // ---------------------------
    // Draw the game character
    draw: function () {
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

    // Logic to move the game character
    move: function () {
      /* this.pos_y <= floorPos_y 
      Make sure the character is above the ground. to prevent moving while failling in the canyons.*/
      if (this.isLeft && this.pos_y <= floorPos_y) {
        if (this.pos_x > width * 0.2) {
          this.pos_x -= 5;
        } else {
          if (this.world_x > 0) {
            scrollPos += 5;
          }
        }
      }

      if (this.isRight && this.pos_y <= floorPos_y) {
        if (this.pos_x < width * 0.8) {
          this.pos_x += 5;
        } else {
          scrollPos -= 5; // negative for moving against the background
        }
      }

      // Logic to make the game character rise and fall.
      if (
        this.isPlummeting &&
        (this.pos_y == floorPos_y || character.isContact)
      ) {
        sound.jump.play();
        this.pos_y -= 100;
        //This to prevent the 'character' from Plummeting twic the first time he is in platforms
        this.isPlummeting = false;
      }

      if (this.pos_y < floorPos_y) {
        for (let i = 0; i < platforms.length; i++) {
          if (platforms[i].checkContact(this.world_x, this.pos_y)) {
            this.isContact = true;
            this.isFalling = false;
            break;
          } else {
            this.isContact = false;
          }
        }
        if (!this.isContact) {
          this.pos_y += 2;
          this.isFalling = true;
        }
      } else {
        this.isFalling = false;
      }
    },
  };
  game = {
    //Control sound repaet after gameCompleted or GameOver
    isFinished: false,

    // ---------------------------
    // Game start, over, completed and reset functions
    // ---------------------------

    start: function () {
      character.pos_x = 50;
      character.pos_y = floorPos_y;
      character.world_x = 0;
      scrollPos = 0;
      character.isLeft = false;
      character.isRight = false;
      character.isFalling = false;
      character.isPlummeting = false;
    },

    // Game over
    over: function () {
      if (!sound.gameOver.isPlaying() && !this.isFinished) {
        sound.gameOver.play();
        this.isFinished = true;
      }
      push();
      fill(229, 126, 104);
      stroke(1);
      textSize(35);
      textStyle(BOLD);
      textAlign(CENTER);
      text("GAME OVER!", width / 2, height / 2);
      textSize(20);
      textStyle(NORMAL);
      text("Press space to continue.", width / 2, height / 2 + 30);
      pop();
    },

    // Game complete
    completed: function () {
      if (!sound.gameWin.isPlaying() && !this.isFinished) {
        sound.gameWin.play();
        this.isFinished = true;
      }
      push();
      fill(229, 126, 104);
      stroke(1);
      textSize(35);
      textStyle(BOLD);
      textAlign(CENTER);
      text("LEVEL COMPLETE!", width / 2, height / 2);
      textSize(20);
      textStyle(NORMAL);
      text("Press space to continue.", width / 2, height / 2 + 30);
      pop();
    },

    //Reset game
    reset: function () {
      player.lives = 3;
      player.score = 0;
      this.isFinished = false;
      flagpole.isReached = false;
      //Re Draw collectable items.
      collectableItems.push(createCollectableItems(400, 405, 10, false));
      collectableItems.push(createCollectableItems(500, 340, 10, false));
      collectableItems.push(createCollectableItems(1500, 405, 10, false));
      collectableItems.push(createCollectableItems(2100, 360, 10, false));
    },
  };

  // Variable to store the real position of the character in the game world.
  // Needed for collision detection.
  character.world_x = character.pos_x - scrollPos;

  // ---------------------------
  // Initialise arrays of scenery objects.
  // ---------------------------

  // Platforms
  platforms.push(createPlatforms(450, floorPos_y - 70, 100));
  platforms.push(createPlatforms(1200, floorPos_y - 30, 100));
  platforms.push(createPlatforms(1600, floorPos_y - 30, 100));
  platforms.push(createPlatforms(1800, floorPos_y - 70, 100));
  platforms.push(createPlatforms(2050, floorPos_y - 30, 100));

  // Canyons
  canyons.push(createCanyons(400, 400));
  canyons.push(createCanyons(1220, 200));
  canyons.push(createCanyons(1500, 100));
  canyons.push(createCanyons(1600, 600));

  // Clouds
  clouds.push(createClouds(200, 120, 2));
  clouds.push(createClouds(800, 100, 3));
  clouds.push(createClouds(1500, 100, 1.5));
  clouds.push(createClouds(2000, 100, 2));
  clouds.push(createClouds(2500, 120, 4));

  // Mountains
  mountains.push(createMountains(300, 200, 150));
  mountains.push(createMountains(900, 200, 120));
  mountains.push(createMountains(1500, 200, 150));
  mountains.push(createMountains(2000, 200, 120));

  // Trees
  trees.push(createtrees(100, floorPos_y - 120, 1.0, 92, floorPos_y - 120 + 5));
  trees.push(
    createtrees(1000, floorPos_y - 120, 1.0, 992, floorPos_y - 120 + 5)
  );
  trees.push(
    createtrees(1450, floorPos_y - 120, 1.0, 1442, floorPos_y - 120 + 5)
  );
  trees.push(
    createtrees(2300, floorPos_y - 120, 1.0, 2292, floorPos_y - 120 + 5)
  );

  // Collectable Items
  collectableItems.push(createCollectableItems(400, 405, 10, false));
  collectableItems.push(createCollectableItems(500, 340, 10, false));
  collectableItems.push(createCollectableItems(1500, 405, 10, false));
  collectableItems.push(createCollectableItems(2100, 360, 10, false));

  //Enemies
  enemies.push(new Enemy(810, floorPos_y - 10, 100));
  enemies.push(new Enemy(840, floorPos_y - 10, 100));
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
    clouds[i].draw();
  }

  // Draw mountains.
  for (let i = 0; i < mountains.length; i++) {
    mountains[i].draw();
  }

  // Draw trees.
  for (let i = 0; i < trees.length; i++) {
    trees[i].draw();
  }

  // Draw canyons.
  for (let i = 0; i < canyons.length; i++) {
    canyons[i].draw();
    canyons[i].checkContact();
  }

  // Draw collectable items.
  for (let i = 0; i < collectableItems.length; i++) {
    if (collectableItems[i].isFound == false) {
      collectableItems[i].draw(collectableItems[i]);
      //Collectable item interaction
      collectableItems[i].checkContact(collectableItems[i]);
    }
  }

  //Draw Platform
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

  // Draw Flagpole.
  flagpole.draw();

  // Draw Enemies
  for(let i = 0; i < enemies.length; i++) {
    enemies[i].draw();
    let isContact = enemies[i].checkContact(character.world_x, character.pos_y);
    if(isContact) {
      if (!sound.fall.isPlaying() && player.lives > 1) {
        sound.fall.play();
      }
      if (player.lives > 0) {
        player.lives--;
        game.start();
        break;
      }
    }
  }

  pop();

  // Draw game character.
  character.draw();

  // Draw game Score.
  player.drawScore();

  // Check if the game is over.
  if (player.lives < 1) {
    game.over();
    return;
  }

  // Check if the flagpole is reached.
  if (flagpole.isReached) {
    game.completed();
    return;
  }

  // Logic to make the game character move or the background scroll.
  character.move();

  // Flagpole checking function
  if (flagpole.isReached == false) {
    flagpole.checkContact();
  }

  // Check If the player die.
  player.checkDie();

  // Draw player lives.
  player.drawLives();

  // Update real position of character for collision detection.
  character.world_x = character.pos_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------
function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.

  if (key == "D" || keyCode == 39) {
    character.isRight = true;
  }
  if (key == "A" || keyCode == 37) {
    character.isLeft = true;
  }
  if (key == "W" || keyCode == 38) {
    character.isPlummeting = true;
  }
  if (key == " " || keyCode == 32) {
    if (player.lives < 1 || flagpole.isReached) {
      game.reset();
      game.start();
    } else {
      character.isPlummeting = true;
    }
  }
}

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.

  if (key == "D" || keyCode == 39) {
    character.isRight = false;
  }
  if (key == "A" || keyCode == 37) {
    character.isLeft = false;
  }
  if (key == "W" || keyCode == 32 || keyCode == 38) {
    character.isPlummeting = false;
  }
}

// ---------------------------------
// Create Platform
// ---------------------------------
function createPlatforms(pos_x, pos_y, length) {
  p = {
    pos_x: pos_x,
    pos_y: pos_y,
    length: length,
    // ---------------------------------
    // Platform render and check functions
    // ---------------------------------
    draw: function () {
      noStroke();
      fill(204, 174, 213);
      rect(this.pos_x, this.pos_y, this.length, 20, 5);
    },
    checkContact: function (gcPos_x, gcPos_y) {
      if (gcPos_x > this.pos_x && gcPos_x < this.pos_x + this.length) {
        let d = this.pos_y - gcPos_y;
        if (d >= 0 && d < 5) {
          return true;
        }
      }
      return false;
    },
  };
  return p;
}

// ---------------------------------
// Create Canyons
// ---------------------------------
function createCanyons(pos_x, width) {
  c = {
    pos_x: pos_x,
    width: width,
    // ---------------------------------
    // Canyon render and check functions
    // ---------------------------------
    // Draw canyon objects
    draw: function () {
      noStroke();
      fill(150, 127, 117);
      rect(this.pos_x, floorPos_y, this.width, height - floorPos_y);
    },

    // Check if the character is over a canyon
    checkContact: function () {
      if (
        character.world_x - 5 > this.pos_x &&
        character.world_x + 5 < this.pos_x + this.width &&
        character.pos_y >= floorPos_y
      ) {
        if (!sound.fall.isPlaying() && player.lives > 0) {
          sound.fall.play();
        }
        character.isPlummeting = true;
        character.pos_y += 5;
      }
    },
  };
  return c;
}

// ---------------------------------
// Create Clouds
// ---------------------------------
function createClouds(pos_x, pos_y, scale) {
  c = {
    pos_x: pos_x,
    pos_y: pos_y,
    scale: scale,
    // Draw cloud objects
    draw: function () {
      strokeWeight(1);
      fill(252, 251, 231);
      ellipse(this.pos_x, this.pos_y, 24 * this.scale, 24 * this.scale);
      ellipse(
        this.pos_x + 10,
        this.pos_y + 10,
        24 * this.scale,
        24 * this.scale
      );
      ellipse(
        this.pos_x + 30,
        this.pos_y + 10,
        24 * this.scale,
        24 * this.scale
      );
      ellipse(
        this.pos_x + 30,
        this.pos_y - 10,
        24 * this.scale,
        24 * this.scale
      );
      ellipse(
        this.pos_x + 20,
        this.pos_y - 10,
        24 * this.scale,
        24 * this.scale
      );
      ellipse(this.pos_x + 40, this.pos_y, 24 * this.scale, 24 * this.scale);
      //Right Eye
      stroke(51);
      beginShape();
      curveVertex(this.pos_x + 32, this.pos_y - 15);
      curveVertex(this.pos_x + 32, this.pos_y - 15);
      curveVertex(this.pos_x + 35, this.pos_y - 9);
      curveVertex(this.pos_x + 39, this.pos_y - 9);
      curveVertex(this.pos_x + 40, this.pos_y - 15);
      curveVertex(this.pos_x + 40, this.pos_y - 15);
      endShape();
      //Left Eye
      beginShape();
      curveVertex(this.pos_x, this.pos_y - 15);
      curveVertex(this.pos_x, this.pos_y - 15);
      curveVertex(this.pos_x + 4, this.pos_y - 9);
      curveVertex(this.pos_x + 8, this.pos_y - 9);
      curveVertex(this.pos_x + 8, this.pos_y - 15);
      curveVertex(this.pos_x + 8, this.pos_y - 15);
      endShape();
      fill(250, 165, 180);
      noStroke();
      //left cheek
      ellipse(this.pos_x + 3, this.pos_y, 10, 5);
      // right cheek
      ellipse(this.pos_x + 40, this.pos_y, 10, 5);
      //Mouth
      stroke(51);
      beginShape();
      fill(252, 251, 231);
      curveVertex(this.pos_x + 20, this.pos_y + 12);
      curveVertex(this.pos_x + 20, this.pos_y + 12);
      curveVertex(this.pos_x + 24, this.pos_y + 13);
      curveVertex(this.pos_x + 26, this.pos_y + 13);
      curveVertex(this.pos_x + 28, this.pos_y + 12);
      curveVertex(this.pos_x + 28, this.pos_y + 12);
      endShape();
      noStroke();
    },
  };
  return c;
}

// ---------------------------------
// Create Mountains
// ---------------------------------
function createMountains(pos_x, pos_y, wide) {
  m = {
    pos_x: pos_x,
    pos_y: pos_y,
    wide: wide,
    // Draw mountains objects
    draw: function () {
      noStroke();
      fill(252, 251, 231);
      //mountains
      triangle(
        this.pos_x - this.wide,
        432,
        this.pos_x + this.wide,
        432,
        this.pos_x,
        this.pos_y
      );
      //mountain Crown
      fill(229, 126, 104);
      triangle(
        this.pos_x - 20,
        this.pos_y + 30,
        this.pos_x + 20,
        this.pos_y + 30,
        this.pos_x,
        this.pos_y
      );
      triangle(
        this.pos_x - 20,
        this.pos_y + 30,
        this.pos_x + 7,
        this.pos_y + 30,
        this.pos_x - 9,
        this.pos_y + 50
      );
      triangle(
        this.pos_x - 0,
        this.pos_y + 30,
        this.pos_x + 20,
        this.pos_y + 30,
        this.pos_x + 12,
        this.pos_y + 40
      );
    },
  };
  return m;
}

// ---------------------------------
// Create Trees
// ---------------------------------
function createtrees(pos_x, pos_y, scale, shadow_x, shadow_y) {
  t = {
    pos_x: pos_x,
    pos_y: pos_y,
    scale: scale,
    shadow_x: shadow_x,
    shadow_y: shadow_y,
    // Draw trees objects
    draw: function () {
      noStroke();
      fill(204, 145, 115);
      rect(this.pos_x - 2, this.pos_y, 10, 120);
      fill(203, 174, 214);
      ellipse(
        this.shadow_x,
        this.shadow_y - 100,
        40 * this.scale,
        20 * this.scale
      );
      ellipse(
        this.shadow_x,
        this.shadow_y - 90,
        50 * this.scale,
        25 * this.scale
      );
      ellipse(
        this.shadow_x,
        this.shadow_y - 80,
        60 * this.scale,
        30 * this.scale
      );
      ellipse(
        this.shadow_x,
        this.shadow_y - 70,
        70 * this.scale,
        35 * this.scale
      );
      ellipse(
        this.shadow_x,
        this.shadow_y - 55,
        80 * this.scale,
        40 * this.scale
      );
      ellipse(
        this.shadow_x,
        this.shadow_y - 40,
        90 * this.scale,
        45 * this.scale
      );
      ellipse(
        this.shadow_x,
        this.shadow_y - 20,
        100 * this.scale,
        50 * this.scale
      );
      fill(218, 194, 225);
      ellipse(this.pos_x, this.pos_y - 100, 40 * this.scale, 20 * this.scale);
      ellipse(this.pos_x, this.pos_y - 90, 50 * this.scale, 25 * this.scale);
      ellipse(this.pos_x, this.pos_y - 80, 60 * this.scale, 30 * this.scale);
      ellipse(this.pos_x, this.pos_y - 70, 70 * this.scale, 35 * this.scale);
      ellipse(this.pos_x, this.pos_y - 55, 80 * this.scale, 40 * this.scale);
      ellipse(this.pos_x, this.pos_y - 40, 90 * this.scale, 45 * this.scale);
      ellipse(this.pos_x, this.pos_y - 20, 100 * this.scale, 50 * this.scale);
    },
  };
  return t;
}

// ---------------------------------
// Create Collectable Items
// ---------------------------------
function createCollectableItems(pos_x, pos_y, size, isFound) {
  c = {
    pos_x: pos_x,
    pos_y: pos_y,
    size: size,
    isFound: isFound,

    // ----------------------------------
    // Collectable items render and check functions
    // ----------------------------------
    // Draw collectable objects.
    draw: function () {
      fill(205, 175, 158);
      ellipse(this.pos_x, this.pos_y, this.size * 3, this.size * 3);
      fill(240, 158, 179);
      ellipse(this.pos_x, this.pos_y, this.size * 1.75, this.size * 1.75);
      fill(201, 229, 211);
      ellipse(this.pos_x, this.pos_y, this.size, this.size);
      fill(255);
      ellipse(this.pos_x + 9, this.pos_y + 4, 3, 3);
      ellipse(this.pos_x - 9, this.pos_y + 4, 3, 3);
      ellipse(this.pos_x + 9, this.pos_y - 5, 3, 3);
      ellipse(this.pos_x - 7, this.pos_y - 5, 3, 3);
      ellipse(this.pos_x, this.pos_y - 10, 3, 3);
      ellipse(this.pos_x, this.pos_y + 10, 3, 3);
    },

    // Check if character has collected an item.
    checkContact: function () {
      // 34 is character body width + collectableItem size
      if (
        dist(this.pos_x, this.pos_y, character.world_x, character.pos_y) < 34
      ) {
        this.isFound = true;
        player.scoreCounter();
        sound.collectItem.play();
      }
    },
  };
  return c;
}


// ---------------------------------
// Enemy
// ---------------------------------
function Enemy(pos_x, pos_y, range) {
  this.pos_x = pos_x;
  this.pos_y = pos_y;
  this.range = range;

  this.currentX = pos_x;
  this.inc = 1;

  this.update = function() {
    this.currentX += this.inc; 
    if(this.currentX >= this.pos_x + this.range) {
      this.inc -= 1;
    }
    else if (this.currentX < this.pos_x) {
      this.inc = 1;
    }
  }

  this.draw = function() {
    this.update();
    fill(229, 126, 104);
    ellipse(this.currentX, this.pos_y, 20, 20);
  }

  this.checkContact = function(gcPos_x, gcPos_y) {
    let d = dist(gcPos_x, gcPos_y, this.currentX, this.pos_y);
    if(d < 20) {
      return true;
    }
    return false;
  }
}