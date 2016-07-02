export function calculateNewPosition({ friction }, elem) {
  // As we scroll down, the distance from the top of the window will dip into
  // negative numbers. we want to add a translateY of some fraction of that
  // amount.
  const { top } = elem.getBoundingClientRect();
  elem.style.transform = `translateY(${top * friction}px)`;
}
