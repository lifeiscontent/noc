import { PVector } from "./PVector";

const canvas: HTMLCanvasElement = document.getElementById("canvas") as any;
const ctx = canvas.getContext("2d");
document.body.style.margin = "0";

let mouse = new PVector(0, 0);
let mousedown: boolean;
let width: number;
let height: number;

document.onmousemove = function (event) {
  mouse = new PVector(event.clientX, event.clientY);
};

document.onmousedown = function () {
  mousedown = true;
};

document.onmouseup = function () {
  mousedown = false;
};

function size(_width: number, _height: number) {
  canvas.width = width = _width;
  canvas.height = height = _height;
}

function background(r, g = r, b = g) {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, width, height);
}

function random(): number;
function random(max: number): number;
function random(min: number, max: number): number;
function random(min?: number, max?: number) {
  if (typeof min !== "number") return Math.random();

  if (typeof max !== "number") {
    max = min;
    min = 0;
  }

  return Math.random() * (max - min + 1) + min;
}

function constrain(n: number, low: number, high: number): number {
  return Math.min(Math.max(n, low), high);
}

class Mover {
  location: PVector;
  velocity: PVector;
  acceleration: PVector;
  topSpeed: number;
  mass: number;
  color: string;
  G: number;
  constructor(m: number, x: number, y: number) {
    this.mass = m;
    this.location = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.topSpeed = 4;
    this.G = 0.4;
    this.color = `hsl(${random(360)}, 100%, 50%)`;
  }
  applyForce(force: PVector) {
    this.acceleration.add(PVector.div(force, this.mass));
  }
  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  attract(m: Mover) {
    const force = PVector.sub(this.location, m.location);
    const distance = constrain(force.mag(), 5.0, 25.0);
    const strength = (this.G * this.mass * m.mass) / (distance * distance);
    return force.normalize().mult(strength);
  }
  display() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(
      this.location.x,
      this.location.y,
      this.mass * 16,
      this.mass * 16,
      Math.PI / 4,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
  checkEdges() {
    if (this.location.x > width) {
      this.location.x = width;
      this.velocity.x *= -1;
    } else if (this.location.x < 0) {
      this.velocity.x *= -1;
      this.location.x = 0;
    }

    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y *= -1;
    }
  }
  isInside(l: Liquid) {
    return (
      this.location.x >= l.x &&
      this.location.x < l.x + l.w &&
      this.location.y >= l.y &&
      this.location.y < l.y + l.h
    );
  }
  drag(l: Liquid) {
    const speed = this.velocity.mag();
    const dragMagnitude = l.c * speed * speed;

    const drag = this.velocity.get().mult(-1).normalize().mult(dragMagnitude);
    this.applyForce(drag);

    return this;
  }
}

class Liquid {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public c: number
  ) {}
  display() {
    ctx.fillStyle = "hsl(200, 100%, 50%)";
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
  }
}

class Attractor {
  mass: number;
  location: PVector;
  G: number;
  constructor() {
    this.location = new PVector(width / 2, height / 2);
    this.mass = 20;
    this.G = 0.4;
  }
  attract(m: Mover) {
    const force = PVector.sub(this.location, m.location);
    const distance = constrain(force.mag(), 5, 25);
    const strength = (this.G * this.mass * m.mass) / (distance * distance);
    return force.normalize().mult(strength);
  }
  display(): void {
    ctx.beginPath();
    ctx.ellipse(
      this.location.x,
      this.location.y,
      this.mass * 2,
      this.mass * 2,
      Math.PI / 4,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = `rgba(200, 200, 200, ${175 / 255})`;
    ctx.fill();
    ctx.stroke();
  }
}

let movers: Mover[];
let a: Attractor;

function setup() {
  size(640, 360);
  movers = Array.from({length: 10});
  for (let i = 0; i < movers.length; i++) {
    movers[i] = new Mover(random(0.1, 2), random(width), random(height));
  }
  a = new Attractor();
}

function draw(time) {
  background(255);
  a.display();
  for (let i = 0; i < movers.length; i++) {
    for (let j = 0; j < movers.length; j++) {
      if (i !== j) {
        const force = movers[j].attract(movers[i]);
        movers[i].applyForce(force);
      }
    }
    movers[i].update();
    movers[i].display();
  }
  requestAnimationFrame(draw);
}

setup();
requestAnimationFrame(draw);
