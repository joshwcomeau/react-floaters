export const calculateSpringPosition = ({
  // TODO: Allow for pre-existing transforms.
  stiffness,
  damping,
  offset,
  velocity,
  mass,
  target,
  frameDuration,
}) => {
  // The `stiffness` and `damping` provided are likely given as positive numbers,
  // when really the formula calls for negative ones.

  /* eslint-disable no-param-reassign */
  if (stiffness > 0) { stiffness *= -1; }
  if (damping > 0) { damping *= -1; }
  /* eslint-enable */

  const spring = stiffness * (offset - target);
  const damper = damping * velocity;
  const acceleration = (spring + damper) / mass;

  const newVelocity = velocity + acceleration * frameDuration;
  const newOffset = offset + newVelocity * frameDuration;

  return [newVelocity, newOffset];
};
