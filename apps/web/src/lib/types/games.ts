import { ActiveGame } from '@shared-libs/enums';

export type Game = {
  displayName: string;
  logo: string;
  gameType: ActiveGame;
};
