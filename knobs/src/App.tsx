import React from 'react';
import { Knob1 } from './components/knob1';

const App = () => {
  return (
    <div>
      <Knob1 label={'volume'} min={-100} max={100} />
      <Knob1 label={'volume2'} min={-100} max={100} />
    </div>
  );
};

export default App;
