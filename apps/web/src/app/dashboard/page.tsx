import { Paper } from '@/lib';
import { DicePopup } from '@/lib/components/dice-popup';
import { ButtonProps } from '@/lib/components/ui/button';
import { Button } from '@/lib/components/ui/button';
import { DiceEnum } from '@/lib/enums';

const RollButton = (props: ButtonProps) => (
  <Button {...props}>Roll That dice</Button>
);
export default function DashboardPage() {
  return (
    <Paper className='max-w-full flex-wrap'>
      <DicePopup
        trigger={<RollButton />}
        diceType={DiceEnum.D20}
        diceAmount={1}
      />
      <DicePopup
        trigger={<RollButton />}
        diceType={DiceEnum.D6}
        diceAmount={1}
      />
       <DicePopup
        trigger={<RollButton />}
        diceType={DiceEnum.D20}
        diceAmount={3}
      />
      <DicePopup
        trigger={<RollButton />}
        diceType={DiceEnum.D6}
        diceAmount={2}
      />
    </Paper>
  );
}
