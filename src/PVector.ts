export class PVector {
  constructor(public x: number, public y: number) {}
  add(v: PVector) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }
  sub(v: PVector) {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }
  mult(n: number) {
    this.x *= n;
    this.y *= n;

    return this;
  }
  div(n: number) {
    this.x /= n;
    this.y /= n;

    return this;
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  limit(max: number) {
    if (this.mag() > max) {
      this.normalize().mult(max);
    }

    return this;
  }
  heading() {
    return Math.atan2(this.y, this.x);
  }
  rotate(angle: number) {
    let newHeading = this.heading() + angle;
    const mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;

    return this;
  }
  magSq() {
    const { x, y } = this;

    return x * x + y * y;
  }
  normalize() {
    const mag = this.mag();
    // here we multiply by the reciprocal instead of calling 'div()'
    // since div duplicates this zero check.
    if (mag !== 0) this.div(mag);

    return this;
  }
  setMag(newMag: number) {
    this.normalize().mult(newMag);

    return this;
  }
  lerp(x: number, y: number, amount: number) {
    this.x += (x - this.x) * amount || 0;
    this.y += (y - this.y) * amount || 0;

    return this;
  }
  get() {
    return new PVector(this.x, this.y);
  }
  static random2D() {
    const angle = Math.random() * (Math.PI * 2);

    return new PVector(Math.cos(angle), Math.sin(angle));
  }
  static add(v1: PVector, v2: PVector) {
    return new PVector(v1.x + v2.x, v1.y + v2.y);
  }
  static sub(v1: PVector, v2: PVector) {
    return new PVector(v1.x - v2.x, v1.y - v2.y);
  }
  static mult(v: PVector, amount: number) {
    return new PVector(v.x * amount, v.y * amount);
  }
  static div(v: PVector, amount: number) {
    return new PVector(v.x / amount, v.y / amount);
  }
}
