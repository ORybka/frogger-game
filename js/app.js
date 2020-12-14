/* eslint-disable prefer-destructuring */
const borders = {
  borderX: [0, 400],
  borderY: [0, 400],
  borderEnemyX: [-100, 500],
};

// Enemies our player must avoid
const Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};
Player.prototype.update = function (dt) {};
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (position) {
  switch (position) {
    case 'left':
      this.x -= 100;
      if (this.x <= borders.borderX[0]) {
        this.x = 0;
      }
      break;
    case 'up':
      this.y -= 100;
      if (this.y <= borders.borderY[0]) {
        this.y = 0;
      }
      break;
    case 'right':
      this.x += 100;
      if (this.x >= borders.borderX[1]) {
        this.x = 400;
      }
      break;
    case 'down':
      this.y += 100;
      if (this.y >= borders.borderY[1]) {
        this.y = 380;
      }
      break;
    default:
      break;
  }
};

// function checkBorders(position) {
// else if (position >= borders.borderX[1]) {
//     console.log('right border!!');
//     position = 400;
//   } else if (position <= borders.borderY[0]) {
//     console.log('top border!!');
//     position = 0;
//   } else if (position >= borders.borderY[1]) {
//     console.log('bottom border!!');
//     position = 380;
//   }
// }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0, 50);

const allEnemies = [];

const player = new Player(200, 380);

// This listens for key presses and sends the keys to your

// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
