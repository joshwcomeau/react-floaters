import React, { Component, PropTypes } from 'react';
import * as validators from './utils/validators';
import { initializeAnimationLoop, addFloaterToAnimationLoop } from './utils/animation';
// import { calculateNewPosition } from './utils/maths';

class Floater extends Component {
  getChildContext() {}

  componentDidMount() {
    // Instead of explicitly listening for scroll events, we're just going to
    // run the animation every frame, at all times. If this turns out to be
    // really inefficient, we can always just memoize it based on previous
    // items' velocity & scroll position?
    addFloaterToAnimationLoop(this.props, this.elem);

    console.log("Adding", this.elem)

    initializeAnimationLoop();
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { typeName, children, stiffness, damping, ...props } = this.props;

    props.ref = elem => this.elem = elem;

    return React.createElement(
      typeName,
      props,
      children
    );
  }
}

Floater.propTypes = {
  typeName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  stiffness: PropTypes.number,
  damping: PropTypes.number,
};

Floater.defaultProps = {
  typeName: 'div',
  stiffness: -40,
  damping: -20,
};

export default Floater;
