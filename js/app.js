const parameters = {
  fieldBorderX: [0, 400],
  fieldBorderY: [0, 400],
  enemyX: -50,
  enemyY: [60, 145, 230],
  maxSpeed: 200,
  minSpeed: 50,
  enemyHeight: 70,
  enemyWidth: 70,
};

class Enemy {
  constructor(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (parameters.maxSpeed - parameters.minSpeed) + parameters.minSpeed);
  }

  update(dt) {
    this.x += this.speed * dt;
    if (this.x >= parameters.fieldBorderX[1] + parameters.enemyWidth) {
      this.x = parameters.enemyX;
    }
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
        if (this.x <= parameters.fieldBorderX[0]) {
          this.x = parameters.fieldBorderX[0];
        }
        break;
      case 'up':
        this.y -= 80;
        if (this.y <= parameters.fieldBorderY[0]) {
          this.y = -30;
          this.winMessage();
        }
        break;
      case 'right':
        this.x += 100;
        if (this.x >= parameters.fieldBorderX[1]) {
          this.x = parameters.fieldBorderX[1];
        }
        break;
      case 'down':
        this.y += 80;
        if (this.y >= parameters.fieldBorderY[1]) {
          this.y = parameters.fieldBorderY[1] - 20;
        }
        break;
      default:
        break;
    }
  }

  checkCollision() {
    for (let i = 0; i < allEnemies.length; i++) {
      if (this.y <= allEnemies[i].y + parameters.enemyHeight && this.y >= allEnemies[i].y - parameters.enemyHeight && this.x <= allEnemies[i].x + parameters.enemyWidth && this.x >= allEnemies[i].x - parameters.enemyWidth) {
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
parameters.enemyY.forEach((el) => allEnemies.push(new Enemy(parameters.enemyX, el)));

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
