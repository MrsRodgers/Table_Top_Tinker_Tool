import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDTO } from './dtos/create-dto';
import { UpdateCampaignDto } from './dtos/update-dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  create(@Body() dto: CreateCampaignDTO) {
    return this.campaignsService.create(dto);
  }

  @Get(':id')
  getCampaignsByMemberId(@Param() id: string) {
    return this.campaignsService.findByUser(id);
  }

  @Patch('member')
  updateById(
    @Query('id') id: string,
    @Query('userId') userId: string,
    @Body() dto: UpdateCampaignDto,
  ) {
    return this.campaignsService.update(id, userId, dto);
  }

  @Delete('member')
  removeMember(
    @Query('id') campaignId: string,
    @Query('userId') userId: string,
  ) {
    return this.campaignsService.delete(campaignId, userId);
  }
}
