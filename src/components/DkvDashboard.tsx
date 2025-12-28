'use client';

import React from 'react';
import { format, parseISO } from 'date-fns';
import { Shield, Database, Zap, Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for merging tailwind classes */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function DkvDashboard({ records }: { records: any[] }) {
  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <header className="mb-12 border-b border-border pb-6">
        <h1 className="text-4xl font-bold text-oracle-blue flex items-center gap-3">
          <Shield className="w-10 h-10" />
          Sanctum DKV Bridge
        </h1>
        <p className="text-muted-foreground mt-2">
          Pillar: Applied Benevolence | Hero Reel Synthesis Protocol Active
        </p>
      </header>

      <div className="grid gap-6">
        {records.map((record) => (
          <div 
            key={record.id} 
            className="group relative bg-card border border-border rounded-lg p-6 hover:border-oracle-blue/50 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="bg-oracle-blue/10 p-3 rounded-full">
                  {record.record_type === 'MISSION' ? (
                    <Zap className="text-oracle-blue w-6 h-6" />
                  ) : (
                    <Database className="text-accent w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {record.mission_name || 'System Synthesis'}
                  </h3>
                  <p className="text-oracle-gold font-mono text-sm">
                    {record.word || record.theme}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  {format(parseISO(record.timestamp), 'MMM d, yyyy • HH:mm:ss')}
                </div>
                <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded border border-border">
                  {record.id.slice(0, 8)}...
                </span>
              </div>
            </div>
            
            {/* Rapid Fire Video Simulation Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-oracle-blue/0 via-oracle-blue/5 to-oracle-blue/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}