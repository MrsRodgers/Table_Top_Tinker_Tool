import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ActiveGame, CampaignRole, CampaignStatus } from '@shared-libs/enums';

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, required: true, enum: ActiveGame })
  gameType: ActiveGame;

  @Prop({
    type: String,
    required: true,
    enum: CampaignStatus,
    default: CampaignStatus.ACTIVE,
  })
  status: CampaignStatus;

  @Prop([
    {
      discordId: { type: String, required: true },
      role: { type: String, enum: CampaignRole, required: true },
    },
  ])
  members: { discordId: string; role: CampaignRole }[];

  @Prop({ type: String })
  coverImage?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({type: String})
  notes?:string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
