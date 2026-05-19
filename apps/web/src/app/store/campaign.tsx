'use client';
import type { Campaign } from '@shared-libs/types';

import { create } from 'zustand';

import { ActiveGame } from '@shared-libs/enums';

type CampaignStore = {
  campaigns: Campaign[];
  isLoading: false;
  activeGame: null | ActiveGame;
  setCampaigns: (campaigns: Campaign[]) => void;
  setActiveGame: (activeGame: null | ActiveGame) => void;
};

export const useCampaignStore = create<CampaignStore>((set) => ({
    campaigns: [],
    isLoading: false,
    activeGame: null,
    setCampaigns: (campaigns) => set({campaigns}),
    setActiveGame: (activeGame) => set({activeGame})
}))
