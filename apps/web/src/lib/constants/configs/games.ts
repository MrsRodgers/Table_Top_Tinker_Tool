import type { Game } from '@/lib/types';

import { ActiveGame } from '@shared-libs/enums';

export const GAMES_CONFIG: Record<ActiveGame, Game> = {
  [ActiveGame.BLADES]: {
    displayName: 'Blades in the Dark',
    logo: '/blades-logo.svg',
    gameType: ActiveGame.BLADES,
  },
};
