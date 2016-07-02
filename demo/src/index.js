import React from 'react';
import { render } from 'react-dom';

import { Floater } from '../../src';

const Demo = () => (
  <div
    style={{
      minHeight: '2000px',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      position: 'relative',
    }}
  >
    <Floater
      stiffness={-150}
      damping={-8}
      style={{
        position: 'absolute',
        zIndex: 2,
        margin: 'auto',
        left: 0,
        right: 0,
        top: '1050px',
        width: '942px',
        height: '621px',
        willChange: 'transform',
      }}
    >
      <img
        alt="iPhone"
        src="http://knowonesbeans.com/wp-content/uploads/2016/03/iphone.png"
        width="942"
      />
    </Floater>
    <Floater
      stiffness={-150}
      damping={-6}
      style={{
        position: 'absolute',
        zIndex: 1,
        margin: 'auto',
        left: 0,
        right: 0,
        top: '1125px',
        width: '942px',
        height: '621px',
        willChange: 'transform',
      }}
    >
      <img
        alt="iPhone"
        src="http://knowonesbeans.com/wp-content/uploads/2016/03/iphone.png"
        width="942"
        style={{ marginRight: '-20px' }}
      />
    </Floater>
  </div>
);

render(<Demo />, document.querySelector('#demo'));
