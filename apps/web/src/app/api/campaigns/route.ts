import type { Campaign } from '@shared-libs/types';

import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const createCampaign = async (campaign: Campaign) => {
  return await axios.post(`${baseURL}/api/campaigns`, campaign);
};

export const getCampaignByUserId = async (userId: string) => {
  return await axios.get(`${baseURL}/api/campaigns`, {
    params: { id: userId },
  });
};

export const updateCampaignById = async (
  id: string,
  userId: string,
  newCampaign: Campaign,
) => {
  return await axios.patch(`${baseURL}/api/campaigns/member`, newCampaign, {
    params: { id, userId },
  });
};

export const deleteCampaignById = async (id: string, userId: string) => {
  return await axios.delete(`${baseURL}/api/campaigns/member`, {
    params: { id, userId },
  });
};
