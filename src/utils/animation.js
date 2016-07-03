import requestAnimationFrame from 'raf';

import ScrollManagerFactory from './scroll-manager';
import TimerFactory from './timer';
import { calculateSpringPosition } from './physics';


class FloatManager {
  constructor() {
    this.floaters = [];
    this.isRunning = false;

    this.scrollManager = ScrollManagerFactory();
    this.timer = TimerFactory();

    this.update = this.update.bind(this);

    this.update();
  }

  update() {
    // TODO: if the scroll position hasn't changed and the floaters don't have
    // any velocity, don't bother with all the calculations?
    const { floaters, isRunning, scrollManager, timer } = this;

    if (!isRunning) { return; }

    const frameDuration = timer.getDurationOfFrame();
    const scrollDiff = scrollManager.getScrollDiff();

    // Sadly, doing this in a functional way takes 5x as long, and given that
    // this function runs 60 times a second, perf matters.
    floaters.forEach(floater => {
      const { stiffness, damping, velocityY, offsetY, mass, elem } = floater;

      // Y AXIS
      const [newVelocityY, newOffsetY] = calculateSpringPosition({
        // TODO: Allow for pre-existing transforms.
        target: 0,
        frameDuration,
        stiffness,
        damping,
        mass,
        velocity: velocityY,
        offset: offsetY + scrollDiff,
      });

      // TODO: Do X-axis as well.

      /* eslint-disable no-param-reassign */
      floater.velocityY = newVelocityY;
      floater.offsetY = newOffsetY;
      /* eslint-enable */

      elem.style.transform = `translateY(${-newOffsetY}px)`;
    });

    requestAnimationFrame(this.update);
  }

  addFloaterToAnimationLoop({ stiffness, damping }, elem) {
    const offsetY = elem.getBoundingClientRect().top;

    this.floaters.push({
      stiffness,
      damping,
      elem,
      offsetY,
      velocityY: 0,
      mass: 1,
    });

    if (!this.isRunning) {
      this.isRunning = true;
      this.update();
    }
  }

  removeFloaterFromAnimationLoop(elem) {
    this.floaters = this.floaters.filter(floater => floater.elem !== elem);

    if (this.floaters.length === 0) {
      this.isRunning = false;
    }
  }
}

export default new FloatManager();
