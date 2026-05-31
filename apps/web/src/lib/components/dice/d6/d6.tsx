'use client';
import type { Sparkle } from '../common/types';
import type { Angles } from './types';

import { forwardRef, ForwardRefExoticComponent, useEffect, useImperativeHandle, useRef } from 'react';

import { drawDice, rollDice } from './utils';

type D6DiceProps = {
  /** Number to roll the dice to */
  diceNum: number;
};

export const D6Dice: ForwardRefExoticComponent<D6DiceProps> = forwardRef(
  ({ diceNum = 20 }, ref) => {
    const diceRef = useRef<HTMLCanvasElement>(null);
    const sparklesRef = useRef<Sparkle[]>([]);
    const animRef = useRef<number | null>(null);
    const anglesRef = useRef<Angles>({ rx: 0.4, ry: -0.5 });

    useEffect(() => {
      drawDice(
        diceRef,
        anglesRef.current.rx,
        anglesRef.current.ry,
        sparklesRef,
      );
      return () => {
        if (animRef.current !== null) cancelAnimationFrame(animRef.current);
      };
    }, []);
    const rollD = () =>
      rollDice({
        diceNum,
        diceRef,
        sparklesRef,
        anglesRef,
        animRef,
      });

    useImperativeHandle(ref, () => ({
      rollD,
    }));

    return (
      <div style={{ position: 'relative', width: '140px', height: '200px' }}>
        <canvas
          ref={diceRef}
          width={300}
          height={320}
          style={{
            position: 'absolute',
            top: 0,
            left: -35,
            width: '200px',
            height: '220px',
          }}
        />
      </div>
    );
  },
);
