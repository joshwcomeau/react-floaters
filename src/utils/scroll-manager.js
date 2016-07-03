// ScrollManager
// Keeps a cache of recent scroll positions, provides methods for working with
// those positions.
import take from 'lodash.take';
import mean from 'lodash.mean';

// WHY
// With standard mousewheels, the animation can be pretty choppy; one frame
// passes at 60-pixels-per-frame, and then 5 frames pass with 0-pixels-per-frame.
//
// This is because mousewheels aren't smooth, they 'jump'.
//
// By maintaining a list of recent scroll positions and averaging between them,
// We can smooth that out a bit.
//
// BONUS
// It also provides a bit of a lazy effect, where the animation starts immediately
// but meanders around, swinging into the scroll after a slight delay.
// Depending on your usecase, this can be a really neat effect!
//
// See README.md for more info.

// TODO: Support X-axis (horizontal scrolling) as well.

const ScrollManagerFactory = ({ cacheSize = 3 } = {}) => {
  // All snapshots are stored in this private `cache` array.
  // It is limited to hold the number of entries specified by `cacheSize`.
  let cache = [];

  return {
    get() {
      // Return a copy of the cache, so it can't be mutated.
      return [...cache];
    },

    updateCacheSize(size) {
      // eslint-disable-next-line no-param-reassign
      cacheSize = size;
    },

    getCurrentScrollPosition() {
      return window.pageYOffset || document.documentElement.scrollTop;
    },

    takeSnapshot() {
      // Add a new snapshot to the head of the cache,
      cache = [
        this.getCurrentScrollPosition(),
        ...cache.slice(0, cacheSize - 1),
      ];
    },

    getScrollDiff() {
      // Start by taking a snapshot, so that it's up-to-date.
      this.takeSnapshot();

      const currentScrollPosition = take(cache);
      const averageScrollPosition = mean(cache);

      return currentScrollPosition - averageScrollPosition;
    },
  };
};


export default ScrollManagerFactory;
