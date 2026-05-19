import { MissionStatus } from '../enums';

export type Mission = {
  _id?: string;
  campaignId: string;
  name: string;
  descriptiom: string;
  status: MissionStatus;
  assignedCharacters: string[];
  gmNotes: string;
  createdAt?: Date;
};
