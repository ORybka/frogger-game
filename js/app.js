const fieldBorders = {
  fieldBorderX: [0, 400],
  fieldBorderY: [0, 400],
};

class Enemy {
  constructor(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 40);
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.dt = dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.enemy = allEnemies;
    this.enemyHeight = 70;
    this.enemyWidth = 80;
  }

  update() {
    this.checkCollision();
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(position) {
    switch (position) {
      case 'left':
        this.x -= 100;
        if (this.x <= fieldBorders.fieldBorderX[0]) {
          this.x = fieldBorders.fieldBorderX[0];
        }
        break;
      case 'up':
        this.y -= 80;
        if (this.y <= fieldBorders.fieldBorderY[0]) {
          this.y = -30;
          this.winMessage();
        }
        break;
      case 'right':
        this.x += 100;
        if (this.x >= fieldBorders.fieldBorderX[1]) {
          this.x = fieldBorders.fieldBorderX[1];
        }
        break;
      case 'down':
        this.y += 80;
        if (this.y >= fieldBorders.fieldBorderY[1]) {
          this.y = fieldBorders.fieldBorderY[1] - 20;
        }
        break;
      default:
        break;
    }
  }

  // checkCollision() {
  //   if (this.y <= this.enemy.y + this.enemyHeight && this.y >= this.enemy.y - this.enemyHeight && this.x <= this.enemy.x + this.enemyWidth && this.x >= this.enemy.x - this.enemyWidth) {
  //     this.loseMessage();
  //   }
  // }

  checkCollision() {
    for (let i = 0; i < this.enemy.length; i++) {
      if (this.y <= this.enemy[i].y + this.enemyHeight && this.y >= this.enemy[i].y - this.enemyHeight && this.x <= this.enemy[i].x + this.enemyWidth && this.x >= this.enemy[i].x - this.enemyWidth) {
        this.loseMessage();
      }
    }
  }

  winMessage() {
    setTimeout(() => {
      alert('You win!');
      this.resetGame();
    }, 100);
  }

  loseMessage() {
    setTimeout(() => {
      alert('Oh, no! You lose!');
      this.resetGame();
    }, 0);
  }

  resetGame() {
    this.x = 200;
    this.y = 380;
  }
}

const enemyX = 0;
const enemyY = [60, 145, 230];

const allEnemies = [];
enemyY.forEach((el) => allEnemies.push(new Enemy(enemyX, el)));

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
