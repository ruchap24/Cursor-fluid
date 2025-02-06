let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 200; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0, 10); // Semi-transparent background for a trailing effect

  // Update and display particles
  for (let particle of particles) {
    particle.update();
    particle.show();
    particle.edges();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
    this.size = random(5, 10);
  }

  update() {
    // Follow the mouse with some noise for organic motion
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.pos);
    dir.setMag(0.1);
    this.acc.add(dir);

    // Add Perlin noise for smooth, random motion
    let angle = noise(this.pos.x * 0.01, this.pos.y * 0.01) * TWO_PI * 4;
    this.acc.add(p5.Vector.fromAngle(angle).mult(0.1));

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  edges() {
    // Wrap particles around the screen edges
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
