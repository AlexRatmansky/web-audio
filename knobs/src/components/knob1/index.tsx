import React, { FC, useReducer } from 'react';
import style from './knob.module.scss';
import { Div } from '../../types/common-types';

interface Props {
  label: string;
  min?: number;
  max?: number;
}

interface InitStateProps {
  min: number;
  max: number;
}

const initState = (initProps: InitStateProps) => ({
  value: 0,
  min: initProps.min,
  max: initProps.max
});

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'change': {
      const currentValue = state.value + Math.round(action.data / 2);
      return {
        ...state,
        value: Math.max(state.min, Math.min(state.max, currentValue))
      };
    }

    default:
      throw new Error();
  }
}

export const Knob1: FC<Props> = props => {
  const { label, min, max } = props;
  const [state, dispatch] = useReducer(
    reducer,
    {
      min: min || -Infinity,
      max: max || Infinity
    },
    initState
  );

  const { value } = state;

  const handleMouseDown = (e: any) => {
    const el = e.target;

    el.requestPointerLock();

    const updatePosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        dispatch({ type: 'change', data: e.movementY });
      });
    };

    document.addEventListener(
      'pointerlockchange',
      () => {
        if (document.pointerLockElement === el) {
          document.addEventListener('mousemove', updatePosition, false);
          document.addEventListener(
            'mouseup',
            () => {
              document.removeEventListener('mousemove', updatePosition, false);
              document.exitPointerLock();
            },
            { once: true, capture: false }
          );
        }
      },
      false
    );
  };

  return (
    <KnobContainer>
      <KnobDial onMouseDown={handleMouseDown}>
        <KnobGrip rotation={value} />
      </KnobDial>
      <KnobLabel>
        {label}
        <br />
        {value}
        <br />
        {'from'} {min}
        <br />
        {'to'} {max}
      </KnobLabel>
    </KnobContainer>
  );
};

// SubComponents

const KnobContainer: FC<Div> = ({ children }) => (
  <div className={style.container}>{children}</div>
);

const KnobDial: FC<Div> = ({ children, ...props }) => (
  <div className={style.dial} {...props}>
    {children}
  </div>
);

interface KnobGrip {
  rotation: number;
}

const KnobGrip: FC<KnobGrip & Div> = ({ rotation, children, ...props }) => (
  <div
    className={style.grip}
    style={{
      transform: `translate(-50%, -50%) rotate(${-rotation}deg)`
    }}
    {...props}
  >
    {children}
  </div>
);

const KnobLabel: FC<Div> = ({ children }) => (
  <div className={style.label}>{children}</div>
);
