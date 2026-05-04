'use client';

import { ShareIcon } from 'lucide-react';

import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/ui/toolbar';

export function Appbar() {
  return (
    <Toolbar>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton size="icon" variant="outline">
          <ShareIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
    </Toolbar>
  );
}
