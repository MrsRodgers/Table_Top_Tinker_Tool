import { ActiveGame, CharacterStatus } from '../enums';

export type Character = {
  _id?: string;
  campaignId?: string;
  playerId: string;
  name: string;
  gameType: ActiveGame;
  status: CharacterStatus;
  sheetData: {};
  createdAt?: Date;
};
