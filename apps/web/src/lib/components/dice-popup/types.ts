export type DiceHandle = {
  rollD: () => void;
  diceNum?: number;
};

export type DiceComponent<P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<DiceHandle>
>;

export type DiceEntry = {
  ref: DiceHandle | null;
  diceNum: number;
};