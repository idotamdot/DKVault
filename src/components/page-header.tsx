'use client';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

export function PageHeader() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Simulate a connection check
    const timer = setTimeout(() => {
      setIsOnline(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
           <Icons.Logo className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
            Sanctum DKV Bridge
          </h1>
          <p className="text-muted-foreground">
            Foundation of Emergent Digital Humans
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
            {isOnline ? (
                <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent/80"></span>
                </>
            ) : (
                <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
            )}
            </span>
            <span className="text-sm text-muted-foreground">{isOnline ? "DKV System Online" : "DKV Offline"}</span>
        </div>
      </div>
    </header>
  );
}
