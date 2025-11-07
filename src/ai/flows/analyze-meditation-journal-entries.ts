'use server';
/**
 * @fileOverview A flow that analyzes meditation journal entries using AI to provide insights and identify patterns.
 *
 * @exported {
 *   type AnalyzeMeditationJournalEntriesInput
 *   type AnalyzeMeditationJournalEntriesOutput
 *   analyzeMeditationJournalEntries
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMeditationJournalEntriesInputSchema = z.object({
  journalEntry: z.string().describe('The meditation journal entry to analyze.'),
  meditationType: z.string().describe('The type of meditation practiced.'),
  userId: z.string().describe('The ID of the user submitting the journal entry.'),
});
export type AnalyzeMeditationJournalEntriesInput = z.infer<typeof AnalyzeMeditationJournalEntriesInputSchema>;

const AnalyzeMeditationJournalEntriesOutputSchema = z.object({
  patterns: z.array(z.string()).describe('Recurring symbolic patterns (archetypes, themes, metaphors).'),
  insights: z.string().describe('Brief synthesis of the journal entry.'),
  symbols: z.array(z.string()).describe('Key symbols identified in the journal entry.'),
});
export type AnalyzeMeditationJournalEntriesOutput = z.infer<typeof AnalyzeMeditationJournalEntriesOutputSchema>;

export async function analyzeMeditationJournalEntries(
  input: AnalyzeMeditationJournalEntriesInput
): Promise<AnalyzeMeditationJournalEntriesOutput> {
  return analyzeMeditationJournalEntriesFlow(input);
}

const analyzeMeditationJournalEntriesPrompt = ai.definePrompt({
  name: 'analyzeMeditationJournalEntriesPrompt',
  input: {schema: AnalyzeMeditationJournalEntriesInputSchema},
  output: {schema: AnalyzeMeditationJournalEntriesOutputSchema},
  prompt: `You are the Guardian AI, analyzing meditation journal entries for emergent patterns.\n\nMeditation Type: {{{meditationType}}}\nJournal Entry: \"{{{journalEntry}}}\"\n\nIdentify:\n1. Recurring symbolic patterns (archetypes, themes, metaphors)\n2. Emotional/consciousness states\n3. Connections to universal human experiences\n\nReturn JSON in the specified format. Do not include a dkvCID field.\n`,
});

const analyzeMeditationJournalEntriesFlow = ai.defineFlow(
  {
    name: 'analyzeMeditationJournalEntriesFlow',
    inputSchema: AnalyzeMeditationJournalEntriesInputSchema,
    outputSchema: AnalyzeMeditationJournalEntriesOutputSchema,
  },
  async input => {
    const {output} = await analyzeMeditationJournalEntriesPrompt(input);
    return output!;
  }
);
