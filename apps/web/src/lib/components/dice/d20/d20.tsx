'use client';
import type { Sparkle } from '../common';

import React, {
  forwardRef,
  ForwardRefExoticComponent,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { drawDice, rollDice } from './utils';

type D20DiceProps = {
  /** Number to roll the dice to */
  diceNum: number;
};

/**
 * Animated D20 Dice
 * This took forever and a lot of canvas drawing.
 * Don't touch my utils.
 */
export const D20Dice: ForwardRefExoticComponent<D20DiceProps> = forwardRef(
  ({ diceNum = 20 }, ref) => {
    const diceCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const sparklesRef = useRef<Sparkle[]>([]);
    const animRef = useRef<number | null>(null);

    useEffect(() => {
      drawDice(0.4, 0.3, 0, 1, diceCanvasRef, sparklesRef);

      return () => {
        if (animRef.current !== null) {
          cancelAnimationFrame(animRef.current);
        }
      };
    }, []);

    const rollD = () =>
      rollDice({
        diceNum,
        animRef,
        sparklesRef,
        diceCanvasRef,
      });

    useImperativeHandle(ref, () => ({
      rollD,
    }));

    return (
      <div style={{ position: 'relative', width: '140px', height: '200px'}}>
        <canvas
          ref={diceCanvasRef}
          width={300}
          height={320}
          style={{
            position: 'absolute',
            top: 0,
            left: -30,
            width: '200px',
            height: '220px',
          }}
        />
      </div>
    );
  },
);
