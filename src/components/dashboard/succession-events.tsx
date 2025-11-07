'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SuccessionEvent } from '@/lib/types';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { FileClock, GitCommitHorizontal, GitFork } from 'lucide-react';
import { Badge } from '../ui/badge';

interface SuccessionEventsProps {
  events: SuccessionEvent[];
}

export function SuccessionEvents({ events }: SuccessionEventsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
            <FileClock className="mr-2 h-5 w-5 text-primary" />
            Succession Attestations
        </CardTitle>
        <CardDescription>
          An immutable log of AI model knowledge transfers, attested on-chain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Models</TableHead>
                <TableHead className="hidden md:table-cell">Record CID</TableHead>
                <TableHead className="hidden sm:table-cell">Attestation Time</TableHead>
                <TableHead>Tx Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <GitCommitHorizontal className="h-4 w-4 text-muted-foreground" />
                        <div className='flex flex-col'>
                            <span className="font-mono text-xs">{event.source_model}</span>
                            <GitFork className="h-4 w-4 my-1 text-muted-foreground transform rotate-90" />
                            <span className="font-mono text-xs text-primary">{event.target_model}</span>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground hidden md:table-cell">
                    {event.record_cid.substring(0, 15)}...
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {formatDistanceToNow(parseISO(event.timestamp), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                     <Badge variant="outline" className="font-mono text-xs text-accent border-accent/20">
                      {event.tx_hash.substring(0, 10)}...
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
