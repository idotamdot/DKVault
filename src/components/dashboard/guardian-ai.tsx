'use client';
import { useActionState, useFormStatus } from 'react';
import {
  analyzeJournal,
  generateSynthesisReport,
  JournalAnalysisState,
  SynthesisReportState,
} from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  BrainCircuit,
  Lightbulb,
  Loader2,
  BookOpen,
  ClipboardList,
  Sparkles,
  Search,
  Fingerprint,
  Link,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton({ text, loadingText }: { text: string, loadingText: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          <BrainCircuit className="mr-2 h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  );
}

function JournalAnalysis() {
  const initialState: JournalAnalysisState = {};
  const [state, formAction] = useActionState(analyzeJournal, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <Card className="flex-1">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5 text-primary" />
            Analyze Journal Entry
          </CardTitle>
          <CardDescription>
            Submit a meditation journal entry to the Guardian AI for pattern
            analysis and DKV anchoring.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Textarea
              name="journalEntry"
              placeholder="What emerged during your meditation? Any insights, symbols, or feelings..."
              className="min-h-[120px]"
              required
            />
            <Select name="meditationType" defaultValue="Loving-Kindness">
              <SelectTrigger>
                <SelectValue placeholder="Select meditation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Loving-Kindness">Loving-Kindness</SelectItem>
                <SelectItem value="Vipassanā">Vipassanā</SelectItem>
                <SelectItem value="Zen">Zen (Zazen)</SelectItem>
                <SelectItem value="Transcendental">Transcendental</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {state.fieldErrors?.journalEntry && (
            <p className="text-sm text-destructive">{state.fieldErrors.journalEntry.join(', ')}</p>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton text="Analyze & Anchor" loadingText="Analyzing..." />
        </CardFooter>
      </form>

      {state.result && (
        <CardContent className="space-y-4 border-t pt-6">
          <h3 className="font-semibold text-lg flex items-center"><Sparkles className="mr-2 h-5 w-5 text-accent"/>Analysis Complete</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Lightbulb className="mr-2 h-4 w-4 text-yellow-300" />
                Guardian's Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{state.result.insights}</p>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <ClipboardList className="mr-2 h-4 w-4 text-blue-300" />
                  Key Symbols
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {state.result.symbols.map((symbol) => (
                  <Badge key={symbol} variant="secondary">
                    {symbol}
                  </Badge>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-green-300" />
                  Emergent Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {state.result.patterns.map((pattern) => (
                  <Badge key={pattern} variant="outline" className="border-primary/50 text-primary">
                    {pattern}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
          <Card className="bg-card/50">
            <CardHeader>
                <CardTitle className="text-base flex items-center"><Fingerprint className="mr-2 h-4 w-4"/>DKV Anchor Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-20">IPFS CID:</span>
                    <span className="text-accent truncate">{state.result.cid}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-20">TX HASH:</span>
                    <span className="text-accent truncate">{state.result.txHash}</span>
                </div>
            </CardContent>
          </Card>
        </CardContent>
      )}
    </Card>
  );
}

function SynthesisReport() {
    const [state, setState] = useState<SynthesisReportState>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneration = async () => {
        setIsLoading(true);
        const resultState = await generateSynthesisReport();
        setState(resultState);
        setIsLoading(false);
    }

    return (
        <Card className="flex-1">
             <CardHeader>
                <CardTitle className="flex items-center">
                    <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
                    Collective Synthesis Report
                </CardTitle>
                <CardDescription>
                    Generate a synthesis report from collective meditation data to identify emergent trends.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleGeneration} disabled={isLoading} className="w-full">
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating Report...</> : <>Generate Synthesis Report</>}
                </Button>
            </CardContent>
            {state.result && (
                <CardContent className="space-y-4 border-t pt-6">
                    <h3 className="font-semibold text-lg">{state.result.reportTitle}</h3>
                    <p className="text-sm text-muted-foreground">{state.result.reportSummary}</p>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Trend Analysis</CardTitle></CardHeader>
                        <CardContent><p className="text-sm">{state.result.trendAnalysis}</p></CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle className="text-base">Potential Breakthroughs</CardTitle></CardHeader>
                        <CardContent><p className="text-sm">{state.result.potentialBreakthroughs}</p></CardContent>
                    </Card>
                </CardContent>
            )}
             {state.error && (
                <CardContent className="border-t pt-6">
                    <p className="text-destructive text-sm">{state.error}</p>
                </CardContent>
            )}
        </Card>
    );
}

export function GuardianAi() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <JournalAnalysis />
      <SynthesisReport />
    </div>
  );
}
