import React from 'react';
import { render } from 'react-dom';

import { Floater } from '../../src';

const Demo = () => (
  <div
    style={{
      minHeight: '2000px',
      backgroundImage: 'url("https://images.blogthings.com/thejapanesepatterntest/japanese-pattern-1.png")',
    }}
  >
    <Floater>
      <div
        style={{
          position: 'relative',
          top: '550px',
          left: '200px',
          width: '100px',
          height: '100px',
          backgroundColor: 'red',
        }}
      />
    </Floater>
  </div>
);

render(<Demo/>, document.querySelector('#demo'));
