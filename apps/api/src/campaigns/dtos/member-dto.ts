import { IsEnum, IsString } from 'class-validator';
import { CampaignRole } from '@shared-libs/enums';

export class MembersDTO {
  @IsString()
  discordId: string;
  @IsEnum({ CampaignRole })
  role: CampaignRole;
}
