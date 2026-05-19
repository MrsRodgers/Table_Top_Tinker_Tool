'use client';

import { Appbar } from './components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-custom">
      <Appbar />
      {children}
    </div>
  );
}
