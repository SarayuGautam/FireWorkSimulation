var fireworks = [];
var gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  stroke(255);
  strokeWeight(5);
  background(0);

  pullOfGravitySlider = createSlider(0.06, 0.2, 0.08, 0.01);
  pullOfGravitySlider.position(20, 20);

  numberOfFireworksSlider = createSlider(0.02, 0.5, 0.05, 0.01);
  numberOfFireworksSlider.position(330, 20);

  numberOfParticlesSlider = createSlider(70, 300, 120, 10);
  numberOfParticlesSlider.position(720, 20);

  maxSpreadSlider = createSlider(7, 15, 10, 0.1);
  maxSpreadSlider.position(1100, 20);
}

function draw() {
  var pullOfGravity = pullOfGravitySlider.value();
  textSize(22);
  stroke("black");
  fill("white");
  text(
    "Pull of Gravity",
    pullOfGravitySlider.x + pullOfGravitySlider.width + 10,
    35
  );
  gravity = createVector(0, pullOfGravity);

  var numberOfFireworks = numberOfFireworksSlider.value();
  stroke("black");
  fill("white");
  text(
    "Number of Fireworks",
    numberOfFireworksSlider.x + numberOfFireworksSlider.width + 10,
    35
  );
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

  //Fireworks
  var numberOfParticles = numberOfParticlesSlider.value();
  stroke("black");
  fill("white");
  text(
    "Number of Particles",
    numberOfParticlesSlider.x + numberOfParticlesSlider.width + 10,
    35
  );
  function Firework() {
    this.hu = random(255);
    this.firework = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.particles = [];

    this.done = function () {
      if (this.exploded && this.particles.length === 0) {
        return true;
      } else {
        return false;
      }
    };

    this.update = function () {
      if (!this.exploded) {
        this.firework.applyForce(gravity);
        this.firework.update();

        if (this.firework.vel.y >= 0) {
          this.exploded = true;
          this.explode();
        }
      }

      for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].update();

        if (this.particles[i].done()) {
          this.particles.splice(i, 1);
        }
      }
    };

    this.explode = function () {
      for (var i = 0; i < numberOfParticles; i++) {
        var p = new Particle(
          this.firework.pos.x,
          this.firework.pos.y,
          this.hu,
          false
        );
        this.particles.push(p);
      }
    };

    this.show = function () {
      if (!this.exploded) {
        this.firework.show();
      }

      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].show();
        // this.particles[i].applyForce(gravity);
      }
    };
  }

  //Particles

  var lifeSpan = Math.random() * (250 - 100) + 100;

  var minSpread = 0.3;

  var maxSpread = maxSpreadSlider.value();
  stroke("black");
  fill("white");
  text(
    "Max Partical Spread",
    maxSpreadSlider.x + maxSpreadSlider.width + 10,
    35
  );
  var lifeBeforeExplosion = 3;
  function Particle(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = lifeSpan;
    this.hu = hu;
    this.acc = createVector(0, 0);

    if (this.firework) {
      this.vel = createVector(0, random(-12, -8));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(minSpread, maxSpread));
    }

    this.applyForce = function (force) {
      this.acc.add(force);
    };

    this.update = function () {
      if (!this.firework) {
        this.vel.mult(0.9);
        this.lifespan -= lifeBeforeExplosion;
      }

      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    };

    this.done = function () {
      if (this.lifespan < 0) {
        return true;
      } else {
        return false;
      }
    };

    this.show = function () {
      colorMode(HSB);

      if (!this.firework) {
        strokeWeight(2);
        stroke(hu, 255, 255, this.lifespan);
      } else {
        strokeWeight(5);
        stroke(hu, 255, 255);
      }

      point(this.pos.x, this.pos.y);
    };
  }
}
