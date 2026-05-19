import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ActiveGame, CampaignStatus } from '@shared-libs/enums';
import { MembersDTO } from './member-dto';
import { Type } from 'class-transformer';

export class CreateCampaignDTO {
  @IsString()
  name: string;

  @IsEnum(ActiveGame)
  gameType: ActiveGame;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MembersDTO)
  members: MembersDTO[];

  @IsEnum({ CampaignStatus })
  status: CampaignStatus;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
