/*
  RafThrottle is a batched, efficient window event handler.
  It registers a series of callbacks on different window-level events
  (eg. scroll, resize), and fires them all when the event happens. This way,
  we only bind one listener per event.
  Additionally, we use requestAnimationFrame
  (https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
  to ensure that the callbacks are fired ~60fps when possible, with a graceful
  fallback to lodash throttle.
*/

let callbacks = {
  mousemove: [],
  scroll: [],
  resize: [],
};

let hasCompletedThisFrame = false;

const invokeAllCallbacksForEvent = (ev, eventName) => {
  callbacks[eventName].forEach(cb => cb(ev));
  hasCompletedThisFrame = false;
};

// Invoke all callbacks, with the event object, for the corresponding
// event type. For example, whenever the mouse moves, this callback
// fires with the mousemove data, and the `mousemove` event name.
// We'll iterate through and fire all mousemove callbacks with the event.
const rafThrottle = (...args) => {
  if (!hasCompletedThisFrame) {
    hasCompletedThisFrame = true;

    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(() => {
        invokeAllCallbacksForEvent(...args);
      });
    } else {
      // Fall back to using setTimeout.
      // Invoke after a suitable delay.
      window.setTimeout(() => {
        invokeAllCallbacksForEvent(...args);
        hasCompletedThisFrame = false;
      }, 20);
    }
  }
};

export const addToRafThrottle = (fn, event) => {
  callbacks[event].push(fn);
};

export const bindToWindow = ({ initialCallbacks }) => {
  callbacks = {
    ...callbacks,
    ...initialCallbacks,
  };

  const eventNames = ['mousemove', 'scroll', 'resize'];

  eventNames.forEach(eventName => {
    window.addEventListener(eventName, ev => rafThrottle(ev, eventName));
  });
};
