/* eslint-disable consistent-return */

export const minMaxValidator = (min, max) => (props, propName, componentName) => {
  const value = props[propName];

  if (typeof value !== 'number') {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}.
      Expected a number, instead received a ${typeof value}.`
    );
  }

  // Valid range is between 0 and 1 inclusive.
  if (value < min || value > max) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}.
      Expected a value between ${min} and ${max}. Received '${value}.'`
    );
  }
}
