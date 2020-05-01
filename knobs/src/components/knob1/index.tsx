import React, { FC, useReducer } from 'react';
import style from './knob.module.scss';
import { Div } from '../../types/common-types';

interface Props {
  label: string;
}

const initialState = { rotation: 30 };

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'change':
      return { rotation: state.rotation + action.data };

    default:
      throw new Error();
  }
}

export const Knob1: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { rotation } = state;

  const handleMouseClick = (e: any) => {
    const el = e.target;

    console.log('enter PointerLock');
    el.requestPointerLock();

    document.addEventListener(
      'pointerlockchange',
      () => {
        if (document.pointerLockElement === el) {
          console.log('The pointer lock status is now locked');
          document.addEventListener(
            'mousemove',
            (e) => {
              requestAnimationFrame(() => {
                console.log(e, e.movementX, e.movementY);
                console.log(rotation);

                dispatch({ type: 'change', data: e.movementY });
                // setRotation(rotation + e.movementY);
              });
            },
            false
          );
        }
      },
      false
    );
  };

  console.log(rotation);

  return (
    <KnobContainer>
      <KnobDial>
        <KnobGrip rotation={rotation} />
      </KnobDial>
      <KnobLabel onMouseDown={handleMouseClick}>{props.label}</KnobLabel>
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
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    }}
    {...props}
  >
    {children}
  </div>
);

const KnobLabel: FC<Div> = ({ children, onMouseDown }) => (
  <div onMouseDown={onMouseDown} className={style.label}>
    {children}
  </div>
);
