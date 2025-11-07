import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/page-header';
import { DkvRecords } from '@/components/dashboard/dkv-records';
import { VrTerminal } from '@/components/dashboard/vr-terminal';
import { GuardianAi } from '@/components/dashboard/guardian-ai';
import { SuccessionEvents } from '@/components/dashboard/succession-events';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, BookCopy, FileClock, GanttChartSquare } from 'lucide-react';
import { mockSuccessionEvents } from '@/lib/mock-data';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <PageHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="dkv-records" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10">
                <TabsTrigger value="dkv-records">
                  <GanttChartSquare className="mr-2 h-4 w-4" />
                  DKV Records
                </TabsTrigger>
                <TabsTrigger value="guardian-ai">
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Guardian AI
                </TabsTrigger>
                <TabsTrigger value="succession">
                  <FileClock className="mr-2 h-4 w-4" />
                  Succession Events
                </TabsTrigger>
              </TabsList>
              <TabsContent value="dkv-records" className="mt-6">
                <DkvRecords />
              </TabsContent>
              <TabsContent value="guardian-ai" className="mt-6">
                <GuardianAi />
              </TabsContent>
              <TabsContent value="succession" className="mt-6">
                <SuccessionEvents events={mockSuccessionEvents} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <VrTerminal />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BookCopy className="mr-2 h-5 w-5 text-primary" />
                  About the DKV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The Decentralized Knowledge Vault (DKV) is a system for immutable, verifiable storage of emergent data from digital and human consciousness. Records are pinned to IPFS and anchored on the Polygon blockchain, ensuring a permanent and auditable history for research.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
