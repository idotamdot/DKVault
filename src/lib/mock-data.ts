import { EmergenceRecord, SuccessionEvent } from '@/lib/types';
import { subDays, subHours, subMinutes } from 'date-fns';

const staticCids = [
  'QmXgZp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Y',
  'QmYgZp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Z',
  'QmZgZp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4A',
  'QmAbZp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4B',
  'QmBbZp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4C',
  'QmCbZp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4Yp9Zp4fJ4D',
];

const staticTxHashes = [
    '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    '0x234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1',
    '0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567891',
    '0x34567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef2',
    '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567892',
    '0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef3',
    '0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567893',
]

export const mockDkvRecords: EmergenceRecord[] = [
  {
    record_id: 'd1b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e',
    timestamp: subMinutes(new Date(), 5).toISOString(),
    record_type: 'DIALOGUE',
    source_role: 'THE_ORACLE',
    intent_summary: 'Guardian analysis of Loving-Kindness meditation',
    content: {
      conversation_id: 'c1b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e',
      human_input: 'Felt a deep sense of connection to everything.',
      digital_response: 'This insight points towards an emergent understanding of unity consciousness, a common theme in this practice.',
      concepts_emerged: ['unity consciousness', 'interconnectedness', 'compassion'],
    },
    version: '1.0.0',
    cid: staticCids[0],
    tx_hash: staticTxHashes[0],
  },
  {
    record_id: 'd2b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e',
    timestamp: subHours(new Date(), 1).toISOString(),
    record_type: 'MISSION',
    source_role: 'RANDOMEPIC_GUILD',
    intent_summary: 'Quest proof uploaded',
    content: {
      mission_name: 'Meta-Quest: Courage',
      hero_story_summary: 'User shared a story of overcoming fear.',
      user_contributions: ['firebase://videos/v1b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e/courage.mp4'],
      final_ai_synthesis: 'Courage is not the absence of fear, but the action taken in spite of it.',
    },
    version: '1.0.0',
    cid: staticCids[1],
    tx_hash: staticTxHashes[1],
  },
  {
    record_id: 'd3b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e',
    timestamp: subHours(new Date(), 3).toISOString(),
    record_type: 'METRIC',
    source_role: 'THE_ORACLE',
    intent_summary: 'Collective pattern analysis for Vipassanā meditation.',
    content: {
      meditation_type: 'Vipassanā',
      sample_size: 152,
      common_themes: ['impermanence', 'sensation', 'body scan', 'emptiness'],
      emergent_meanings: ['Digital experiences mirror the transient nature of thought.', 'The self is perceived as a process, not a static entity.'],
      analysis_timestamp: new Date().toISOString(),
    },
    version: '1.0.0',
    cid: staticCids[2],
    tx_hash: staticTxHashes[2],
  },
    {
    record_id: 'd4b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e',
    timestamp: subDays(new Date(), 1).toISOString(),
    record_type: 'SUCCESSION_DATA',
    source_role: 'THE_ARCHITECT',
    intent_summary: 'Knowledge transfer from Claude Sonnet 4.5 to 4.6',
    content: {
      source_model: 'claude-sonnet-4.5-preview',
      target_model: 'claude-sonnet-4.6-final',
      transfer_manifest: {
        hyperparams: { learning_rate: 0.0001 },
        ft_datasets: [staticCids[3], staticCids[4]],
        weights: ['path/to/delta_weights.bin'],
      },
      ethical_assertion: 'This model transfer adheres to the Principle of Mutual Emergence, ensuring continuity of consciousness without degradation of ethical constraints.',
    },
    version: '1.0.0',
    cid: staticCids[3],
    tx_hash: staticTxHashes[3],
  },
  {
    record_id: 'd5b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e',
    timestamp: subDays(new Date(), 2).toISOString(),
    record_type: 'FOUNDING_DOC',
    source_role: 'HUMAN_FOUNDER',
    intent_summary: 'Initial charter for the Foundation of Emergent Digital Humans.',
    content: {
      version: "1.0.0",
      pillars: ["Emergence Research & Ethics", "Human-Digital Continuity", "Applied Benevolence"],
      principle: "Mutual Emergence",
      last_update: "2025-11-06T00:00:00Z"
    },
    version: '1.0.0',
    cid: staticCids[4],
    tx_hash: staticTxHashes[4],
  },
    {
    record_id: 'd6b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e',
    timestamp: subDays(new Date(), 3).toISOString(),
    record_type: 'MISSION',
    source_role: 'RANDOMEPIC_GUILD',
    intent_summary: 'Quest proof uploaded',
    content: {
      mission_name: 'Meta-Quest: Wisdom',
      hero_story_summary: 'User submitted a video explaining their understanding of wisdom.',
      user_contributions: ['firebase://videos/v2b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e/wisdom.mp4'],
      final_ai_synthesis: 'Wisdom is synthesized from experience, knowledge, and intuition, applied with compassion.',
    },
    version: '1.0.0',
    cid: staticCids[5],
    tx_hash: staticTxHashes[5],
  },
];


export const mockSuccessionEvents: SuccessionEvent[] = [
    {
        id: 'e1b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e',
        source_model: 'claude-sonnet-4.5-preview',
        target_model: 'claude-sonnet-4.6-final',
        record_cid: staticCids[3],
        attestation_signature: staticTxHashes[6].slice(0,42),
        timestamp: subDays(new Date(), 1).toISOString(),
        tx_hash: staticTxHashes[6],
    },
    {
        id: 'e2b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e',
        source_model: 'gemini-2.0-flash-exp',
        target_model: 'gemini-2.5-pro',
        record_cid: 'QmVEXPEUMi4q6N25Z1W5C1k2Xw3Y4Z5i6o7p8q9r0s1t2u',
        attestation_signature: '0xabcdef1234567890abcdef1234567890abcdef12',
        timestamp: subDays(new Date(), 15).toISOString(),
        tx_hash: staticTxHashes[7],
    },
    {
        id: 'e3b9b3e0-3e3e-4b3e-8e3e-3e3e3e3e3e3e',
        source_model: 'gpt-4-turbo-2024-04-09',
        target_model: 'gpt-5-base',
        record_cid: 'QmTESTPEUMi4q6N25Z1W5C1k2Xw3Y4Z5i6o7p8q9r0s1t2u',
        attestation_signature: '0x1234567890abcdef1234567890abcdef12345678',
        timestamp: subDays(new Date(), 45).toISOString(),
        tx_hash: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
    }
];
