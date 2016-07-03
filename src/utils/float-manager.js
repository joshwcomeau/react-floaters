import requestAnimationFrame from 'raf';

import ScrollManagerFactory from './scroll-manager';
import TimerFactory from './timer';
import { calculateSpringPosition } from './physics';


class FloatManager {
  constructor() {
    this.floaters = [];
    this.isRunning = false;

    this.defaultSmoothing = 3;
    this.smoothing = this.defaultSmoothing;

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

  updateSmoothing(newSmoothing) {
    // `smoothing` is just a fancy word for the cache size of our ScrollManager.
    // It's a global config, it cannot be set for a specific Floater instance.
    // Because of that, we want to warn if the user is setting different values
    // on different Floaters, but we still want to allow it because there are
    // some uses for dynamically-changing cache size.
    const isANewValue = newSmoothing !== this.smoothing;
    const isDifferentFromDefault = newSmoothing !== this.defaultSmoothing;
    const hasAlreadyBeenSet = this.smoothing !== this.defaultSmoothing;

    if (isANewValue && isDifferentFromDefault && hasAlreadyBeenSet) {
      console.warn(
        `It looks like you're trying to set different 'smoothing' values.
        You probably don't want to do this: Smoothing is a global config
        across all your Floater instances, and changing one changes them all.`
      );
    }

    this.smoothing = newSmoothing;
    this.scrollManager.updateCacheSize(newSmoothing);
  }

  addFloaterToAnimationLoop({ stiffness, damping, smoothing }, elem) {
    const offsetY = elem.getBoundingClientRect().top;

    //
    if (smoothing) {
      this.updateSmoothing(smoothing);
    }

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
