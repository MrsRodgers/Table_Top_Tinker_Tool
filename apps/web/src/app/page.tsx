'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/lib/components/ui/button';
import { GAMES_CONFIG, Paper } from '@/lib';
import { ActiveGame } from '@shared-libs/enums';
import { useCampaignStore } from './store';

export default function LandingPage() {
  const { setActiveGame } = useCampaignStore();
  const { push } = useRouter();

  const handleOnClick = (activeGame: ActiveGame) => {
    setActiveGame(activeGame);
    push('/dashboard');
  };

  return (
    <Paper>
      <div className="content-center items-center flex w-full p-3 flex-col gap-3">
        <p className="text-2xl fade-in">Welcome Travellers</p>
        <p className="text-lg fade-in"> Choose your adventure...</p>
        <div className="content-center justify-center flex flex-row w-full gap-4 fade-in">
          {Object.values(GAMES_CONFIG).map((game) => (
            <Button
              variant="default"
              size="lg"
              className=" w-full md:w-1/3  lg:w-1/3 h-auto p-8 object-contain"
              onClick={() => handleOnClick(game.gameType)}
            >
              <img className="object-contain" src={game.logo} />
            </Button>
          ))}
        </div>
        <p className="text-lg fade-in"> More to come...</p>
      </div>
    </Paper>
  );
}
