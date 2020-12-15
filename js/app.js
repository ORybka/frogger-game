const param = {
  fieldBorderX: [0, 400],
  fieldBorderY: [0, 400],
  enemyX: -50,
  enemyY: [60, 145, 230],
  minSpeed: 50,
  maxSpeed: 200,
  enemyOutline: 70,
  playerWidth: 100,
  playerHeight: 80,
};

class Enemy {
  constructor(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (param.maxSpeed - param.minSpeed) + param.minSpeed);
  }

  update(dt) {
    this.x += this.speed * dt;
    if (this.x >= param.fieldBorderX[1] + param.enemyOutline) {
      this.x = param.enemyX;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
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
        this.x -= param.playerWidth;
        if (this.x <= param.fieldBorderX[0]) {
          this.x = param.fieldBorderX[0];
        }
        break;
      case 'up':
        this.y -= param.playerHeight;
        if (this.y <= param.fieldBorderY[0]) {
          this.y = -30;
          this.winMessage();
        }
        break;
      case 'right':
        this.x += param.playerWidth;
        if (this.x >= param.fieldBorderX[1]) {
          this.x = param.fieldBorderX[1];
        }
        break;
      case 'down':
        this.y += param.playerHeight;
        if (this.y >= param.fieldBorderY[1]) {
          this.y = param.fieldBorderY[1] - 20;
        }
        break;
      default:
        break;
    }
  }

  checkCollision() {
    for (let i = 0; i < allEnemies.length; i++) {
      if (this.y <= allEnemies[i].y + param.enemyOutline && this.y >= allEnemies[i].y - param.enemyOutline && this.x <= allEnemies[i].x + param.enemyOutline && this.x >= allEnemies[i].x - param.enemyOutline) {
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

const allEnemies = [];
param.enemyY.forEach((el) => allEnemies.push(new Enemy(param.enemyX, el)));

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
