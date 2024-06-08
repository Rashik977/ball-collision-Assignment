const rect = document.getElementById("rectangle");

rect.style.width = "500px";
rect.style.height = "500px";
rect.style.border = "4px solid black";
rect.style.position = "relative";

const numOfBalls = 100;

class ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.ball = document.createElement("div");
    this.ball.style.width = `${radius}px`;
    this.ball.style.height = `${radius}px`;
    this.ball.style.borderRadius = "50%";
    this.ball.style.backgroundColor = `${color}`;
    this.ball.style.position = "absolute";
    this.ball.style.top = `${this.y}px`;
    this.ball.style.left = `${this.x}px`;
    rect.appendChild(this.ball);
  }
  move() {
    this.ball.style.top = `${this.y}px`;
    this.ball.style.left = `${this.x}px`;
    this.y = this.y + this.dy;
    this.x = this.x + this.dx;
    if (this.y + this.radius > 500 || this.y < 0) {
      this.dy = -this.dy;
    }
    if (this.x + this.radius > 500 || this.x < 0) {
      this.dx = -this.dx;
    }
  }
}

function randomColor() {
  return `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(
    0,
    255
  )})`;
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const balls = [];

function ballGenerator() {
  for (let i = 0; i < numOfBalls; i++) {
    balls.push(
      new ball(
        randomNum(0, 400),
        randomNum(0, 400),
        1,
        1,
        randomNum(5, 100),
        randomColor()
      )
    );
  }
}

ballGenerator();

function update() {
  balls.forEach((ball) => {
    ball.move();
  });
}

setInterval(update, 1000 / 60);
