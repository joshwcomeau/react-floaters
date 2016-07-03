import requestAnimationFrame from 'raf';

import ScrollManagerFactory from './scroll-manager';
import TimerFactory from './timer';

// const FloatManager = () => {
//   let isRunning = false;
//
//
// }


const floaters = [];
let isRunning = false;

const scrollManager = ScrollManagerFactory({ cacheSize: 10 });
const timer = TimerFactory();


export function animate(offset) {
  if (!isRunning) {
    return;
  }

  const frameDuration = timer.getDurationOfFrame();

  const scrollDiff = scrollManager.getScrollDiff();

  floaters.forEach(floater => {
    const { stiffness, damping, velocityY, offsetY, mass, elem } = floater;

    // Y AXIS
    const [newVelocityY, newOffsetY] = calculateNewPosition({
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

    // Note: Mutating the original here. A nicer way would be to do a `map`
    // instead of a `forEach`, and create a new Floater on every frame.
    // Because this runs so often, though, performance might actually be a factor.
    floater.velocityY = newVelocityY;
    floater.offsetY = newOffsetY;

    elem.style.transform = `translateY(${-floater.offsetY}px)`
  });

  requestAnimationFrame(animate);
}

window.animate = animate;

function calculateNewPosition({
  stiffness,
  damping,
  offset,
  velocity,
  mass,
  target,
  frameDuration,
}) {
  const spring = stiffness * (offset - target);
  const damper = damping * velocity;
  const acceleration = (spring + damper) / mass;

  const newVelocity = velocity + acceleration * (frameDuration / 1000);
  const newOffset = offset + newVelocity * (frameDuration / 1000);

  return [newVelocity, newOffset];
}

export function addFloaterToAnimationLoop({ stiffness, damping }, elem) {
  const offsetY = elem.getBoundingClientRect().top;

  console.log("Initial offset", offsetY)

  floaters.push({
    stiffness,
    damping,
    elem,
    offsetY,
    velocityY: 0,
    mass: 1,
  });
}

// eslint-disable-next-line
export function removeFloaterFromAnimationLoop(floater) {
  // TODO: Remove from `floaters`, and if the array becomes empty, set isRunning
  // to false.
}

export function initializeAnimationLoop() {
  if (!isRunning) {
    isRunning = true;

    animate();
  }
}
