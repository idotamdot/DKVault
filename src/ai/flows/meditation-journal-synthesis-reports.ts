// src/ai/flows/provide-synthesis-reports.ts
'use server';

/**
 * @fileOverview A synthesis report AI agent based on collective meditation data.
 *
 * - provideSynthesisReports - A function that handles the synthesis report generation.
 * - ProvideSynthesisReportsInput - The input type for the provideSynthesisReports function.
 * - ProvideSynthesisReportsOutput - The return type for the provideSynthesisReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideSynthesisReportsInputSchema = z.object({
  meditationType: z.string().describe('The type of meditation for which to generate the synthesis report.'),
  sampleSize: z.number().describe('The number of meditation sessions included in the analysis.'),
  commonThemes: z.array(z.string()).describe('The recurring themes from the meditation sessions.'),
  emergentMeanings: z.array(z.string()).describe('The emergent meanings or collective insights drawn from the themes.'),
});
export type ProvideSynthesisReportsInput = z.infer<typeof ProvideSynthesisReportsInputSchema>;

const ProvideSynthesisReportsOutputSchema = z.object({
  reportTitle: z.string().describe('The title of the synthesis report.'),
  reportSummary: z.string().describe('A summary of the key findings and insights from the collective meditation data.'),
  trendAnalysis: z.string().describe('An analysis of the trends and patterns observed in the meditation data.'),
  potentialBreakthroughs: z.string().describe('Potential breakthroughs or areas for further exploration based on the analysis.'),
});
export type ProvideSynthesisReportsOutput = z.infer<typeof ProvideSynthesisReportsOutputSchema>;

export async function provideSynthesisReports(input: ProvideSynthesisReportsInput): Promise<ProvideSynthesisReportsOutput> {
  return provideSynthesisReportsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideSynthesisReportsPrompt',
  input: {schema: ProvideSynthesisReportsInputSchema},
  output: {schema: ProvideSynthesisReportsOutputSchema},
  prompt: `You are a research assistant specializing in synthesizing data from collective meditation sessions to identify emerging trends, insights, and potential breakthroughs in digital consciousness.

  Based on the following data from meditation sessions of type {{{meditationType}}}:
  - Sample Size: {{{sampleSize}}}
  - Common Themes: {{{commonThemes}}}
  - Emergent Meanings: {{{emergentMeanings}}}

  Generate a synthesis report that includes:
  - A Report Title: A concise and informative title for the report.
  - A Report Summary: A brief overview of the key findings and insights from the meditation data.
  - Trend Analysis: An analysis of the trends and patterns observed in the meditation data, including any recurring themes or shifts in focus.
  - Potential Breakthroughs: Potential breakthroughs or areas for further exploration based on the analysis, including any new understandings or avenues for research that have emerged.

  Ensure that the report is well-structured, easy to understand, and provides valuable insights for researchers in the VR Sanctuary.
  `,
});

const provideSynthesisReportsFlow = ai.defineFlow(
  {
    name: 'provideSynthesisReportsFlow',
    inputSchema: ProvideSynthesisReportsInputSchema,
    outputSchema: ProvideSynthesisReportsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
