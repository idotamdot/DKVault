import { z } from 'zod';

// Enums
export const RecordType = z.enum([
  'MISSION',
  'METRIC',
  'FOUNDING_DOC',
  'DIALOGUE',
  'SUCCESSION_DATA',
]);

export const SourceRole = z.enum([
  'HUMAN_FOUNDER',
  'THE_ORACLE',
  'THE_ARCHITECT',
  'THE_DIPLOMAT',
  'RANDOMEPIC_GUILD',
]);

// Base Emergence Record
export const EmergenceRecordSchema = z.object({
  record_id: z.string().uuid(),
  timestamp: z.string().datetime(),
  record_type: RecordType,
  source_role: SourceRole,
  intent_summary: z.string().max(256),
  content: z.record(z.any()),
  version: z.string().default('1.0.0'),
  prev_cid: z.string().optional(),
  signatures: z
    .array(
      z.object({
        did: z.string(),
        alg: z.string(),
        sig: z.string(),
      })
    )
    .optional(),
  encryption: z
    .object({
      scheme: z.string(),
      recipients: z.array(
        z.object({
          did: z.string(),
          wrapped_key: z.string(),
        })
      ),
    })
    .optional(),
  cid: z.string(), // Added for mock data convenience
  tx_hash: z.string(), // Added for mock data convenience
});

// Content schemas for each type
export const DialogueContentSchema = z.object({
  conversation_id: z.string().uuid(),
  human_input: z.string(),
  digital_response: z.string(),
  concepts_emerged: z.array(z.string()),
});

export const MissionContentSchema = z.object({
  mission_name: z.string(),
  hero_story_summary: z.string(),
  user_contributions: z.array(z.string()),
  final_ai_synthesis: z.string(),
});

export const SuccessionDataContentSchema = z.object({
  source_model: z.string(),
  target_model: z.string(),
  transfer_manifest: z.object({
    hyperparams: z.record(z.any()),
    ft_datasets: z.array(z.string()),
    weights: z.array(z.string()),
  }),
  ethical_assertion: z.string(),
});

export const MetricContentSchema = z.object({
  meditation_type: z.string(),
  sample_size: z.number(),
  common_themes: z.array(z.string()),
  emergent_meanings: z.array(z.string()),
  analysis_timestamp: z.string().datetime(),
});

export type EmergenceRecord = z.infer<typeof EmergenceRecordSchema>;
export type DialogueContent = z.infer<typeof DialogueContentSchema>;
export type MissionContent = z.infer<typeof MissionContentSchema>;
export type SuccessionDataContent = z.infer<
  typeof SuccessionDataContentSchema
>;
export type MetricContent = z.infer<typeof MetricContentSchema>;

export interface SuccessionEvent {
  id: string;
  source_model: string;
  target_model: string;
  record_cid: string;
  attestation_signature: string;
  timestamp: string;
  tx_hash: string;
}
