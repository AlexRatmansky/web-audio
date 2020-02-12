import React, { FC } from 'react';
import style from './style.module.scss';

interface Props {
  label: string;
}

export const Knob1: FC<Props> = props => {
  return (
    <KnobContainer>
      <KnobDial>
        <KnobGrip />
      </KnobDial>
      <KnobLabel>{props.label}</KnobLabel>
    </KnobContainer>
  );
};

// SubComponents

const KnobContainer: FC = ({ children }) => (
  <div className={style['knob-container']}>{children}</div>
);

const KnobDial: FC = ({ children }) => (
  <div className={style['knob-dial']}>{children}</div>
);

const KnobGrip: FC = ({ children }) => (
  <div className={style['knob-grip']}>{children}</div>
);

const KnobLabel: FC = ({ children }) => (
  <div className={style['knob-label']}>{children}</div>
);
