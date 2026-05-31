'use client';
import { Button } from '@/lib/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/lib/components/ui/dialog';
import { useRef, useState } from 'react';
import { D20Dice } from '../dice/d20';
import { D6Dice } from '../dice/d6';
import { DiceEnum } from '@/lib/enums';
type DicePopupProps = {
  trigger: React.ReactElement;
  diceType: DiceEnum;
  diceAmount: number;
  title?:string;
  disadvantage?: boolean;
};

type DiceComponent<P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<DiceHandle>
>;

const DiceMap: Record<DiceEnum, DiceComponent<{ diceNum: number }>> = {
  [DiceEnum.D20]: D20Dice,
  [DiceEnum.D6]: D6Dice,
};
export type DiceHandle = {
  rollD: () => void;
  diceNum?: number;
};

type DiceEntry = {
  ref: DiceHandle | null;
  diceNum: number;
};

export const getDiceNum = (type: DiceEnum): number => {
  switch (type) {
    case DiceEnum.D20:
      return Math.floor(Math.random() * 20) + 1;

    case DiceEnum.D6:
      return Math.floor(Math.random() * 6) + 1;
  }
};

export const DicePopup: React.FC<DicePopupProps> = ({
  trigger,
  diceType,
  diceAmount,
  disadvantage,
  title
}) => {
  const Dice = DiceMap[diceType];
  const [open, setOpen] = useState(false);
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
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center size-fit sm:size-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
       <DialogTitle className="text-xl text-secondary font-custom">{title}</DialogTitle>
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
