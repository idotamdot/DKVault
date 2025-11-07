'use client';

import * as React from 'react';
import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockDkvRecords } from '@/lib/mock-data';
import { EmergenceRecord, RecordType, SourceRole } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { GanttChartSquare, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const recordTypeColors: Record<string, string> = {
  MISSION: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20',
  METRIC: 'bg-green-400/10 text-green-300 border-green-400/20',
  DIALOGUE: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
  SUCCESSION_DATA: 'bg-purple-400/10 text-purple-300 border-purple-400/20',
  FOUNDING_DOC: 'bg-gray-400/10 text-gray-300 border-gray-400/20',
};

const sourceRoleColors: Record<string, string> = {
  HUMAN_FOUNDER: 'text-rose-400',
  THE_ORACLE: 'text-cyan-400',
  THE_ARCHITECT: 'text-amber-400',
  THE_DIPLOMAT: 'text-fuchsia-400',
  RANDOMEPIC_GUILD: 'text-lime-400',
};

const FormattedDate = ({ isoDate }: { isoDate: string }) => {
  const [formattedDate, setFormattedDate] = React.useState('');
  useEffect(() => {
    setFormattedDate(format(parseISO(isoDate), 'MMM d, yyyy HH:mm'));
  }, [isoDate]);

  if (!formattedDate) return null;
  
  return <>{formattedDate}</>;
};

export function DkvRecords() {
  const [records] = React.useState<EmergenceRecord[]>(mockDkvRecords);
  const [typeFilter, setTypeFilter] = React.useState<string>('all');
  const [roleFilter, setRoleFilter] = React.useState<string>('all');
  const [searchFilter, setSearchFilter] = React.useState<string>('');

  const filteredRecords = React.useMemo(() => {
    return records
      .filter((record) => typeFilter === 'all' || record.record_type === typeFilter)
      .filter((record) => roleFilter === 'all' || record.source_role === roleFilter)
      .filter((record) =>
        searchFilter === '' ||
        record.intent_summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
        record.cid.toLowerCase().includes(searchFilter.toLowerCase())
      );
  }, [records, typeFilter, roleFilter, searchFilter]);

  const clearFilters = () => {
    setTypeFilter('all');
    setRoleFilter('all');
    setSearchFilter('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GanttChartSquare className="mr-2 h-5 w-5 text-primary" />
          DKV Records Explorer
        </CardTitle>
        <CardDescription>
          Browse and filter immutable records stored in the Decentralized Knowledge Vault.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <Input 
            placeholder="Search by intent or CID..." 
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="flex-grow"
          />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {RecordType.options.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {SourceRole.options.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={clearFilters}>
                  <Trash2 className="h-4 w-4"/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear Filters</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intent</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden lg:table-cell">Source</TableHead>
                <TableHead className="hidden sm:table-cell">Timestamp</TableHead>
                <TableHead>CID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.record_id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{record.intent_summary}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant="outline"
                      className={recordTypeColors[record.record_type]}
                    >
                      {record.record_type}
                    </Badge>
                  </TableCell>
                  <TableCell className={`hidden lg:table-cell font-mono text-xs ${sourceRoleColors[record.source_role]}`}>
                    {record.source_role}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    <FormattedDate isoDate={record.timestamp} />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-accent">
                    {record.cid.substring(0, 12)}...
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredRecords.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No records found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
}