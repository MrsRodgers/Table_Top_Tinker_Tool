'use client';
import type { Dispatch, SetStateAction } from 'react';
import type { DiceEntry } from './types';

import { useRef, useState } from 'react';

import { Button } from '@/lib/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from '@/lib/components/ui/dialog';

import { DiceEnum } from '@/lib/enums';

import { DiceMap, getDiceNum } from './utils';

type DicePopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  diceType: DiceEnum;
  diceAmount: number;
  title?: string;
  disadvantage?: boolean;
};

export const DicePopup: React.FC<DicePopupProps> = ({
  open,
  setOpen,
  diceType,
  diceAmount,
  disadvantage,
  title,
}) => {
  const Dice = DiceMap[diceType];
  const [rolled, setRolled] = useState(false);
  const [result, setResult] = useState('');
  const diceRefs = useRef<Record<string, DiceEntry>>({});

  const rollAll = () => {
    setResult('');
    Object.values(diceRefs.current).forEach((dice) => {
      dice?.ref?.rollD();
    });
    const result = getResult();
    setTimeout(() => setResult(result), 1150);
    setRolled(true);
  };

  const getResult = () => {
    const rolls = Object.values(diceRefs.current).map((dice) => {
      return dice.diceNum;
    });

    const allOnes = rolls.every((r) => r === 1);
    const nat20 = diceType === DiceEnum.D20 && rolls.includes(20);
    const allSixes = diceType === DiceEnum.D6 && rolls.every((r) => r === 6);
    const critCritCrit = allSixes && rolls.length > 1 && !disadvantage;

    if (allOnes) {
      return 'Critical Failure';
    }

    if (nat20) {
      return 'Critical';
    }

    if (critCritCrit) {
      return 'Critical';
    }

    if (disadvantage) return `${Math.min(...rolls)}`;
    return `${Math.max(...rolls)}`;
  };
  
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          setResult('');
          setRolled(false);
        }
      }}
    >
      <DialogContent className="flex flex-col items-center justify-center size-fit sm:size-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogTitle className="text-xl text-secondary font-custom">
          {title}
        </DialogTitle>
        <div className="flex flex-row">
          {Array.from({ length: diceAmount }).map((dice, i) => {
            const diceNum = getDiceNum(diceType);
            return (
              <Dice
                key={i}
                ref={(el) => {
                  diceRefs.current[i] = {
                    ref: el,
                    diceNum,
                  };
                }}
                diceNum={diceNum}
              />
            );
          })}
        </div>

        <DialogFooter>
          <p
            key={result}
            className="animate-slam-down origin-bottom text-xl text-secondary font-custom"
          >
            {result}
          </p>
          {!rolled && <Button onClick={rollAll}>Roll</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
