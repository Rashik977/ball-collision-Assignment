//getting the div element with the id rectangle
const rect = document.getElementById("rectangle");

//setting the width and height of the rectangle
const width = 1000;
const height = 800;

//settings for the ball animation
const numOfBalls = 1000;
const minRadius = 5;
const maxRadius = 10;
const minSpeed = 1;
const maxSpeed = 5;

//array to store the balls
const balls = [];

//styling the rectangle
rect.style.width = `${width}px`;
rect.style.height = `${height}px`;
rect.style.border = "4px solid black";
rect.style.position = "relative";

//class for the ball
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.mass = radius * 0.3;
    this.ball = document.createElement("div");
    this.ball.style.width = `${radius * 2}px`;
    this.ball.style.height = `${radius * 2}px`;
    this.ball.style.borderRadius = "50%";
    this.ball.style.backgroundColor = `${this.color}`;
    this.ball.style.position = "absolute";
    this.ball.style.top = `${this.y}px`;
    this.ball.style.left = `${this.x}px`;

    rect.appendChild(this.ball);
  }
  move() {
    if (this.y + this.radius * 2 > height || this.y < 0) {
      this.dy = -this.dy;
    }
    if (this.x + this.radius * 2 > width || this.x < 0) {
      this.dx = -this.dx;
    }

    this.y = this.y + this.dy;
    this.x = this.x + this.dx;
    // this.ball.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.ball.style.top = `${this.y}px`;
    this.ball.style.left = `${this.x}px`;
  }
}

//function to generate random number
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//function to generate random color
function randomColor() {
  return `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(
    0,
    255
  )})`;
}

//function to generate balls and push to the balls array
function ballGenerator() {
  for (let i = 0; i < numOfBalls; i++) {
    balls.push(
      new Ball(
        randomNum(0, width - 100),
        randomNum(0, height - 100),
        randomNum(0, 2) === 0
          ? randomNum(-maxSpeed, -minSpeed)
          : randomNum(minSpeed, maxSpeed),
        randomNum(0, 2) === 0
          ? randomNum(-maxSpeed, -minSpeed)
          : randomNum(minSpeed, maxSpeed),
        randomNum(minRadius, maxRadius),
        randomColor()
      )
    );
  }
}

//function to check for ball collisions
function ballCollisions() {
  for (let i = 0; i < balls.length; i++) {
    ball1 = balls[i];
    for (let j = i + 1; j < balls.length; j++) {
      ball2 = balls[j];
      let vCollision = { x: ball2.x - ball1.x, y: ball2.y - ball1.y };
      let distance = Math.sqrt(
        (ball2.x - ball1.x) ** 2 + (ball2.y - ball1.y) ** 2
      );
      let vCollisionNorm = {
        x: vCollision.x / distance,
        y: vCollision.y / distance,
      };

      let vRelativeVelocity = {
        x: ball1.dx - ball2.dx,
        y: ball1.dy - ball2.dy,
      };
      let speed =
        vRelativeVelocity.x * vCollisionNorm.x +
        vRelativeVelocity.y * vCollisionNorm.y;

      if (speed < 0) {
        continue;
      }

      if (
        ballOverlap(
          ball1.x,
          ball1.y,
          ball1.radius,
          ball2.x,
          ball2.y,
          ball2.radius
        )
      ) {
        let impact = (2 * speed) / (ball1.mass + ball2.mass);
        ball1.dx -= impact * ball2.mass * vCollisionNorm.x;
        ball1.dy -= impact * ball2.mass * vCollisionNorm.y;
        ball2.dx += impact * ball1.mass * vCollisionNorm.x;
        ball2.dy += impact * ball1.mass * vCollisionNorm.y;
      }
    }
  }
}

//function to check if balls overlap
function ballOverlap(x1, y1, r1, x2, y2, r2) {
  let squareDistance = (x1 - x2) ** 2 + (y1 - y2) ** 2;
  return squareDistance <= (r1 + r2) ** 2;
}

ballGenerator();

//function to animate the balls
function update() {
  ballCollisions();
  balls.forEach((ball) => {
    ball.move();
  });

  requestAnimationFrame(update);
}

update();
