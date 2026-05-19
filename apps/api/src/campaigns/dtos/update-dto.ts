import { PartialType } from "@nestjs/mapped-types";

import { CreateCampaignDTO } from "./create-dto";

export class UpdateCampaignDto extends PartialType(CreateCampaignDTO) {}