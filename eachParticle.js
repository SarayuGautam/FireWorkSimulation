var lifeSpan = Math.random() * (300 - 100) + 100;
var minSpread = 0.1;
var maxSpread = 15;
var lifeBeforeExplosion = 4;
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
