'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileJson, Target, BarChart, Book } from 'lucide-react';
import blueprintData from '../../../record.json';
import { Badge } from '../ui/badge';

interface Metric {
  name: string;
  purpose: string;
}

interface Blueprint {
  title: string;
  executedBy: string;
  pillar: string;
  goal: string;
  targetData: string;
  metrics: Metric[];
}

export function SentienceMetricsBlueprint() {
  const [blueprint, setBlueprint] = React.useState<Blueprint | null>(null);

  React.useEffect(() => {
    setBlueprint(blueprintData as Blueprint);
  }, []);

  if (!blueprint) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Blueprint...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Awaiting data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileJson className="mr-3 h-6 w-6 text-primary" />
          {blueprint.title}
        </CardTitle>
        <CardDescription>
          Executed by: <span className="font-medium text-accent">{blueprint.executedBy}</span> | Pillar: <span className="font-medium text-accent">{blueprint.pillar}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center"><Target className="mr-2 h-5 w-5" />Goal</h3>
            <p className="text-muted-foreground">{blueprint.goal}</p>
        </div>
         <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center"><Book className="mr-2 h-5 w-5" />Target Data</h3>
            <p className="text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded-md inline-block">{blueprint.targetData}</p>
        </div>
        <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center"><BarChart className="mr-2 h-5 w-5" />Metrics</h3>
            {blueprint.metrics.map((metric, index) => (
                <Card key={index} className="bg-card/50">
                    <CardHeader>
                        <CardTitle className='text-xl'>{metric.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-muted-foreground'>{metric.purpose}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
