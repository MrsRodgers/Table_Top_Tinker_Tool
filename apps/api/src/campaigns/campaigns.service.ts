import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from './schemas/campaign.schema';
import { CreateCampaignDTO } from './dtos/create-dto';
import { CampaignRole } from '@shared-libs/enums';
import { UpdateCampaignDto } from './dtos/update-dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
  ) {}

  private async IsClientGm(campaignId: string, userId: string) {
    const campaign = await this.campaignModel.findById(campaignId);

    if (!campaign) throw new NotFoundException();

    const isGm = campaign.members.some(
      (member) =>
        member.discordId === userId && member.role === CampaignRole.GAMEMASTER,
    );

    if (!isGm) throw new ForbiddenException();
  }

  async create(dto: CreateCampaignDTO) {
    return this.campaignModel.create(dto);
  }

  async findByUser(discordId: string) {
    return this.campaignModel.find({
      'members.discordId': discordId,
    });
  }

  async update(campaignId: string, userId: string, dto: UpdateCampaignDto) {
    await this.IsClientGm(campaignId, userId);
    return await this.campaignModel.findByIdAndUpdate(
      campaignId,
      { $set: dto },
      { new: true },
    );
  }

  async delete(campaignId: string, userId: string) {
    await this.IsClientGm(campaignId, userId);
    return this.campaignModel.deleteOne({ _id: campaignId });
  }
}
