import React, { Component, PropTypes } from 'react';
import * as validators from './utils/validators';
import { bindToWindow, registerListener } from './utils/raf-throttle';
import { calculateNewPosition } from './utils/maths';

class Floater extends Component {
  getChildContext() {}

  componentDidMount() {
    // Initiate our singleton scroll event listener. This allows us to register
    // listeners that all fire on every (throttled) scroll event.
    // This method has a safety check built-in to ensure it can't be bound
    // multiple times by multiple component instances.
    bindToWindow({ eventNames: ['scroll'] });

    // Register our scroll listener.
    // The way this works is the function has access to the ref and the prop
    // components (friction, delay, etc), so it can work out all the necessary
    // calculations on its own
    registerListener(() => {
      calculateNewPosition(this.props, this.elem);
    }, 'scroll');
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {
      typeName,
      children,
      friction,
      ...props
    } = this.props;

    props.ref = elem => this.elem = elem;

    return React.createElement(
      typeName,
      props,
      children,
    );
  }
}

Floater.propTypes = {
  typeName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  friction: validators.friction,
};

Floater.defaultProps = {
  typeName: 'div',
  friction: 0.5,
};

export default Floater;
