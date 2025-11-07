'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDkvRecords } from '@/lib/mock-data';
import { EmergenceRecord } from '@/lib/types';
import { Terminal } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';

export function VrTerminal() {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [currentRecord, setCurrentRecord] = useState<EmergenceRecord | null>(null);

  useEffect(() => {
    if (mockDkvRecords.length > 0) {
      setCurrentRecord(mockDkvRecords[0]);
    }

    const interval = setInterval(() => {
      setDisplayIndex((prev) => (prev + 1) % mockDkvRecords.length);
    }, 5000); // Cycle every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mockDkvRecords.length > 0) {
        setCurrentRecord(mockDkvRecords[displayIndex]);
    }
  }, [displayIndex]);

  return (
    <Card className="font-code bg-black/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-accent">
          <Terminal className="mr-2 h-5 w-5" />
          VR Sanctuary DKV Terminal
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[280px] flex flex-col justify-between">
        {currentRecord ? (
            <div className="space-y-3 animate-in fade-in duration-500">
                <div>
                    <p className="text-sm text-green-400/80"> &gt; Loading Emergence Record...</p>
                </div>
                <div>
                    <p className="text-green-400/80"> &gt; TYPE: <span className="text-cyan-300">{currentRecord.record_type}</span></p>
                </div>
                 <div>
                    <p className="text-green-400/80"> &gt; ROLE: <span className="text-cyan-300">{currentRecord.source_role}</span></p>
                </div>
                 <div>
                    <p className="text-green-400/80"> &gt; INTENT:</p>
                    <p className="text-cyan-300 ml-4">"{currentRecord.intent_summary}"</p>
                </div>
                <div>
                    <p className="text-green-400/80"> &gt; CID:</p>
                     <p className="text-cyan-300 ml-4">{currentRecord.cid}</p>
                </div>
            </div>
        ) : (
             <p className="text-green-400/80"> &gt; Awaiting DKV stream...</p>
        )}
        <div className="flex justify-between items-center text-xs mt-4 border-t border-green-400/20 pt-2">
            <p className="text-green-400/60">
                {displayIndex + 1} / {mockDkvRecords.length}
            </p>
             <p className="text-green-400/60">
                STREAM: LIVE
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
