import { ClockScope } from '../enums';

export type Clock = {
  _id?: string;
  campaignId: string;
  name: string;
  segments: number;
  filled: number;
  scope: ClockScope;
  scopeId: string;
  isVisible: boolean;
  createdAt?: string;
};
