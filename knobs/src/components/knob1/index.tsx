import React, { FC, useState } from 'react';
import style from './knob.module.scss';
import { Div } from '../../types/common-types';

interface Props {
  label: string;
}

export const Knob1: FC<Props> = props => {
  const [rotation, setRotation] = useState(30);

  const handleMouseMove = (e: any) => {
    setRotation(rotation + 2);
    console.log('move', e);
  };

  return (
    <KnobContainer>
      <KnobDial>
        <KnobGrip rotation={rotation} onMouseMove={handleMouseMove} />
      </KnobDial>
      <KnobLabel>{props.label}</KnobLabel>
    </KnobContainer>
  );
};

// SubComponents

const KnobContainer: FC<Div> = ({ children }) => (
  <div className={style.container}>{children}</div>
);

const KnobDial: FC<Div> = ({ children }) => (
  <div className={style.dial}>{children}</div>
);

interface KnobGrip {
  rotation: number;
}

const KnobGrip: FC<KnobGrip & Div> = ({ rotation, children, ...props }) => (
  <div
    className={style.grip}
    style={{
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`
    }}
    {...props}
  >
    {children}
  </div>
);

const KnobLabel: FC<Div> = ({ children }) => (
  <div className={style.label}>{children}</div>
);
