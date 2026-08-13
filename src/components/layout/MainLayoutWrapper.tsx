'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  return (
    <main style={isStudio ? { height: '100vh', margin: 0, padding: 0 } : { minHeight: '80vh', paddingTop: '80px' }}>
      {children}
    </main>
  );
}
