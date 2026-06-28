'use client';
import { Paper } from '@/lib';
import { Button } from '@/lib/components/ui/button';
import { Campaign } from '@shared-libs/types';
import { useState } from 'react';
import { createCampaign } from '../api';
import { ActiveGame, CampaignRole, CampaignStatus } from '@shared-libs/enums';

export default function CampaignsPage() {
  const [campaign, setCampaign] = useState<null | Campaign>(null);
  const onClick = () => {
    console.log('toggled');
    createCampaign({
      name: 'Test Campaign',
      description: 'The rousing adventure of testing',
      gameType: ActiveGame.BLADES,
      members: [{ discordId: '123', role: CampaignRole.GAMEMASTER }],
      status: CampaignStatus.ACTIVE,
      notes: 'All my notes go here I tell ya',
    }).then((res) => {console.log(res); setCampaign(res.data)})
  };

  return (
    <Paper className="max-w-full flex-wrap">
      {JSON.stringify(campaign)}
      <Button onClick={onClick}>Press to Create Campaign</Button>
    </Paper>
  );
}
