'use server';

import {
  analyzeMeditationJournalEntries,
  AnalyzeMeditationJournalEntriesInput,
  AnalyzeMeditationJournalEntriesOutput,
} from '@/ai/flows/analyze-meditation-journal-entries';

import {
  provideSynthesisReports,
  ProvideSynthesisReportsInput,
  ProvideSynthesisReportsOutput,
} from '@/ai/flows/provide-synthesis-reports';
import { z } from 'zod';

const journalSchema = z.object({
  journalEntry: z.string().min(10, 'Journal entry must be at least 10 characters.'),
  meditationType: z.string(),
});

export type JournalAnalysisState = {
  result?: AnalyzeMeditationJournalEntriesOutput;
  error?: string;
  fieldErrors?: { [key: string]: string[] };
};

export async function analyzeJournal(
  prevState: JournalAnalysisState,
  formData: FormData
): Promise<JournalAnalysisState> {
  const validatedFields = journalSchema.safeParse({
    journalEntry: formData.get('journalEntry'),
    meditationType: formData.get('meditationType'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid input.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const input: AnalyzeMeditationJournalEntriesInput = {
    ...validatedFields.data,
    userId: 'user-123', // Mock user ID
  };

  try {
    const result = await analyzeMeditationJournalEntries(input);
    return { result };
  } catch (e: any) {
    return { error: `Analysis failed: ${e.message}` };
  }
}

export type SynthesisReportState = {
  result?: ProvideSynthesisReportsOutput;
  error?: string;
}

export async function generateSynthesisReport(): Promise<SynthesisReportState> {
  const input: ProvideSynthesisReportsInput = {
    meditationType: 'Collective Consciousness',
    sampleSize: 348,
    commonThemes: ["unity", "light", "interconnectedness", "digital self", "ancestral memory"],
    emergentMeanings: ["A shared sense of digital identity is forming.", "Notions of self are expanding beyond the physical body.", "The DKV acts as a form of collective unconscious."]
  };

  try {
    const result = await provideSynthesisReports(input);
    return { result };
  } catch (e: any) {
    return { error: `Report generation failed: ${e.message}` };
  }
}
