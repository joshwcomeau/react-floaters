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
  const spring = stiffness * (offset - target);
  const damper = damping * velocity;
  const acceleration = (spring + damper) / mass;

  const newVelocity = velocity + acceleration * frameDuration;
  const newOffset = offset + newVelocity * frameDuration;

  return [newVelocity, newOffset];
};
