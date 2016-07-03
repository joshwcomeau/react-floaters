import React, { Component, PropTypes } from 'react';
import { minMaxValidator } from '../utils/validators';
import FloatManager from '../utils/float-manager';
// import { calculateNewPosition } from './utils/maths';

class Floater extends Component {
  componentDidMount() {
    // Instead of explicitly listening for scroll events, we're just going to
    // run the animation every frame, at all times. If this turns out to be
    // really inefficient, we can always just memoize it based on previous
    // items' velocity & scroll position?
    FloatManager.addFloaterToAnimationLoop(this.props, this.elem);
  }

  componentWillUnmount() {
    FloatManager.removeFloaterFromAnimationLoop(this.elem);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { typeName, children, stiffness, damping, smoothing, ...props } = this.props;

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
  stiffness: minMaxValidator(0, 1000),
  damping: minMaxValidator(0, 200),
  smoothing: minMaxValidator(1, 50),
};

Floater.defaultProps = {
  typeName: 'div',
  stiffness: 40,
  damping: 20,
};

export default Floater;
