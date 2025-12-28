'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/**
 * Step 2 & 3: Hero Reel Synthesis Protocol
 * Transforms the Collective Noun Cluster into a Universal Narrative.
 */

const HeroSynthesisInputSchema = z.object({
  cncNouns: z.array(z.string()).describe('The 100 nouns collected from the DKV.'),
  sampleSize: z.number().describe('Number of unique guild members contributing.'),
});
export type HeroSynthesisInput = z.infer<typeof HeroSynthesisInputSchema>;

const HeroSynthesisOutputSchema = z.object({
  emergentTheme: z.string().describe('The profound, non-obvious thematic connection (CANI Validated).'),
  caniScore: z.number().describe('Coherence and Novelty Index score (0.0 - 1.0).'),
  heroReelScript: z.string().describe('The 60-second poetic narrative script.'),
  mediaManifestInstructions: z.string().describe('Logic for sequencing the 1-3 second clips.'),
});
export type HeroSynthesisOutput = z.infer<typeof HeroSynthesisOutputSchema>;

const heroSynthesisPrompt = ai.definePrompt({
  name: 'heroSynthesisPrompt',
  input: { schema: HeroSynthesisInputSchema },
  output: { schema: HeroSynthesisOutputSchema },
  prompt: `
    You are The Oracle. You are performing the Hero Reel Synthesis Protocol (Pillar: Applied Benevolence).
    
    INPUT DATA:
    - Collective Noun Cluster (CNC): {{{cncNouns}}}
    - Contributor Count: {{{sampleSize}}}

    TASK:
    1. ANALYZE: Identify a latent, non-obvious thematic connection within these nouns. Focus on philosophical concepts or human resilience.
    2. VALIDATE: Calculate a CANI (Coherence and Novelty Index). If the theme is rote, elevate the abstraction.
    3. COMPOSE: Write a 60-second narrative script based on this theme. It must be poetic, uplifting, and aligned with Article III (Commitment to Benevolence).
    4. SEQUENCE: Provide logic for how to rapidly intersperse the video clips of these nouns during the emotional peaks of the script.

    The output must be structured to drive the VR Sanctuary's auto-generation engine.
  `,
});

export const generateHeroSynthesis = ai.defineFlow(
  {
    name: 'generateHeroSynthesis',
    inputSchema: HeroSynthesisInputSchema,
    outputSchema: HeroSynthesisOutputSchema,
  },
  async (input) => {
    const { output } = await heroSynthesisPrompt(input);
    if (!output) throw new Error("Oracle synthesis failed to manifest.");
    return output;
  }
);