import { DiceEnum } from "@/lib/enums";
import { DiceComponent } from "./types";
import { D20Dice } from "../dice/d20";
import { D6Dice } from "../dice/d6";

export const DiceMap: Record<DiceEnum, DiceComponent<{ diceNum: number }>> = {
  [DiceEnum.D20]: D20Dice,
  [DiceEnum.D6]: D6Dice,
};

export const getDiceNum = (type: DiceEnum): number => {
  switch (type) {
    case DiceEnum.D20:
      return Math.floor(Math.random() * 20) + 1;

    case DiceEnum.D6:
      return Math.floor(Math.random() * 6) + 1;
  }
};
