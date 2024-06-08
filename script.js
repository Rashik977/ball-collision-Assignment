const rect = document.getElementById("rectangle");
const circle = document.getElementById("circle");

rect.style.width = "500px";
rect.style.height = "500px";
rect.style.border = "4px solid black";
rect.style.position = "relative";

circle.style.width = "50px";
circle.style.height = "50px";
circle.style.borderRadius = "50%";
circle.style.backgroundColor = "red";
circle.style.position = "absolute";
circle.style.top = "50%";
circle.style.left = "50%";

let x = 200;
let y = 0;
let dx = 1;
let dy = 1;

function move() {
  circle.style.top = `${y}px`;
  circle.style.bottom = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.right = `${x}px`;

  y = y + dy;
  x = x + dx;
  if (y > 450 || y < 0) {
    dy = -dy;
  }
  if (x > 450 || x < 0) {
    dx = -dx;
  }
}

setInterval(move, 1000 / 60);
