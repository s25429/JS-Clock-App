class Clock {
  constructor(arms) {
    this.hours =    this.getHours();
    this.minutes =  this.getMinutes();
    this.seconds =  this.getSeconds();

    this.arms = arms;
    this.angles = this.calculateAngles();

    this.rotateArms();
  }

  run() {
    this.loop = setInterval(this.update.bind(this), 1000);
  }

  update() {
    let new_hours =   this.getHours();
    let new_minutes = this.getMinutes();
    let new_seconds = this.getSeconds();

    if (new_seconds !== this.seconds)
      this.seconds = new_seconds;

    if (new_minutes !== this.minutes)
      this.minutes = new_minutes;

    if (new_hours !== this.hours)
      this.hours = new_hours;

    this.angles = this.calculateAngles();
    this.rotateArms();
  }

  getHours() {
    let x = new Date().getHours()
    return x > 12 ? x - 12 : x;
  }

  getMinutes() {
    return new Date().getMinutes();
  }

  getSeconds() {
    return new Date().getSeconds();
  }

  calculateAngles() {
    return {
      h: this.toAngles(this.toPrecentage(this.hours, 12), 360),
      m: this.toAngles(this.toPrecentage(this.minutes, 60), 360),
      s: this.toAngles(this.toPrecentage(this.seconds, 60), 360),
    }
  }

  toPrecentage(n, max, precision = 2) {
    return parseFloat((n * 100 / max).toFixed(precision));
  }

  toAngles(n, max, precision = 0) {
    return parseFloat((n * max / 100).toFixed(precision));
  }

  rotateArms() {
    for (const arm of this.arms) {
      if (arm.classList.contains('seconds-arm')) {
        arm.style.transform = `translateX(-50%) rotate(${this.angles.s}deg)`;
      } else if (arm.classList.contains('minutes-arm')) {
        arm.style.transform = `translateX(-50%) rotate(${this.angles.m}deg)`;
      } else if (arm.classList.contains('hours-arm')) {
        arm.style.transform = `translateX(-50%) rotate(${this.angles.h}deg)`;
      }
    }
  }
};

export default Clock;