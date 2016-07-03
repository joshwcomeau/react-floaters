// Simple utility that generates a Timer that can be used to calculate how long
// a frame lasted. Used in Spring animations to calculate velocity and offset.
const TimerFactory = () => {
  let timeCounter = Date.now();

  return {
    getDurationOfFrame() {
      const now = Date.now();

      // Get the diff between our previously-recorded time and now.
      const frameDuration = now - timeCounter;

      // Set our time counter to now, for the next calculation.
      timeCounter = now;

      return frameDuration;
    },
  };
};

export default TimerFactory;
