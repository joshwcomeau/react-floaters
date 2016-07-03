import requestAnimationFrame from 'raf';

import ScrollManagerFactory from './scroll-manager';
import TimerFactory from './timer';
import { calculateSpringPosition } from './physics';


class FloatManager {
  constructor() {
    this.floaters = [];
    this.isRunning = true;

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

    this.floaters = floaters.map(floater => {
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

      elem.style.transform = `translateY(${-newOffsetY}px)`;

      return {
        ...floater,
        velocityY: newVelocityY,
        offsetY: newOffsetY,
      };
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
  }
}

export default new FloatManager();

// export function animate(offset) {
//   floaters.forEach(floater => {
//     const { stiffness, damping, velocityY, offsetY, mass, elem } = floater;
//
//     // Y AXIS
//     const [newVelocityY, newOffsetY] = calculateSpringPosition({
//       // TODO: Allow for pre-existing transforms.
//       target: 0,
//       frameDuration,
//       stiffness,
//       damping,
//       mass,
//       velocity: velocityY,
//       offset: offsetY + scrollDiff,
//     });
//
//     // TODO: Do X-axis as well.
//
//     // Note: Mutating the original here. A nicer way would be to do a `map`
//     // instead of a `forEach`, and create a new Floater on every frame.
//     // Because this runs so often, though, performance might actually be a factor.
//     floater.velocityY = newVelocityY;
//     floater.offsetY = newOffsetY;
//
//     elem.style.transform = `translateY(${-floater.offsetY}px)`
//   });
//
//   requestAnimationFrame(animate);
// }
//
// window.animate = animate;


// eslint-disable-next-line
export function removeFloaterFromAnimationLoop(floater) {
  // TODO: Remove from `floaters`, and if the array becomes empty, set isRunning
  // to false.
}
