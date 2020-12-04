var fireworks = [];
var gravity;
var numberOfFireworks = 0.05;
var pullOfGravity = 0.08;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, pullOfGravity);
  stroke(255);
  strokeWeight(5);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 20);

  if (random(1) < numberOfFireworks) {
    fireworks.push(new Firework());
  }

  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
