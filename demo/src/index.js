import React from 'react';
import { render } from 'react-dom';

import { Floater } from '../../src';

import './style.css';

const Demo = () => (
  <div
    style={{
      height: '100%',
      backgroundImage: 'url("https://www.hivestreaming.com/wp-content/uploads/2013/09/space-bg.jpg")',

      backgroundPosition: 'center center',
      position: 'relative',
    }}
  >
    <Floater
      stiffness={100}
      damping={18}
      smoothing={25}
      style={{
        position: 'absolute',
        zIndex: 2,
        margin: 'auto',
        left: 0,
        right: 0,
        top: '35%',
        width: '942px',
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
      stiffness={125}
      damping={20}
      style={{
        position: 'absolute',
        zIndex: 1,
        margin: 'auto',
        left: 0,
        right: 0,
        top: '39%',
        width: '942px',
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
