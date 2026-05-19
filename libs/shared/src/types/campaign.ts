import { ActiveGame, CampaignRole, CampaignStatus } from '../enums';

export type Campaign = {
  //TODO: change to ObjectId
  _id?: string;
  name: string;
  description?:string;
  gameType: ActiveGame;
  members: { discordId: string, role: CampaignRole }[]
  status: CampaignStatus;
  notes?:string;
  coverImage?: string;
  createdAt?: Date;
};
