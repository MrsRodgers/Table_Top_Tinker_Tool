'use client';

import { MoonIcon, SunIcon } from 'lucide-react';

import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
} from '@/lib/components/ui/toolbar';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';

export function Appbar() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return (
    <Toolbar className="flex flex-col">
      <ToolbarGroup className="flex flex-row pt-4 md: pt-7">
        <img className="object-contain max-h-40 md:max-h-60 lg:max-h-90" src="./logo_lg.svg" />
      </ToolbarGroup>
      <ToolbarGroup className="flex flex-row w-full p-2">
        <ToolbarButton className="self-start" size="icon-lg" variant="outline" onClick={toggleTheme}>
          {resolvedTheme === 'dark' ? <SunIcon/> :<MoonIcon /> }
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}
