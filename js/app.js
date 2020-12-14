/* eslint-disable no-use-before-define */
const borders = {
  borderX: [0, 400],
  borderY: [0, 400],
  borderEnemyX: [-100, 500],
};

// Enemies our player must avoid
const Enemy = function (x, y, speed) {
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
        this.x = borders.borderX[0];
      }
      break;
    case 'up':
      this.y -= 80;
      if (this.y <= borders.borderY[0]) {
        this.y = -30;
        winMessage();
      }
      break;
    case 'right':
      this.x += 100;
      if (this.x >= borders.borderX[1]) {
        this.x = borders.borderX[1];
      }
      break;
    case 'down':
      this.y += 80;
      if (this.y >= borders.borderY[1]) {
        this.y = borders.borderY[1] - 20;
      }
      break;
    default:
      break;
  }
};

function winMessage() {
  setTimeout(() => {
    alert('You win!');
    resetPosition();
  }, 50);
}

function resetPosition() {
  player.x = 200;
  player.y = 380;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0, 50);

const allEnemies = [];

const player = new Player(200, 380);

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
