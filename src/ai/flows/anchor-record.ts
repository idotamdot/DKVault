'use server'

import { ai } from '@/ai/genkit'
import { z } from 'genkit'
import { v4 as uuidv4 } from 'uuid'

const AnchorRecordInputSchema = z.object({
  record: z.any().describe('The synthesized Hero Reel data to be anchored.'),
})

const AnchorRecordOutputSchema = z.object({
  cid: z.string().describe('The mock IPFS Content ID.'),
  txHash: z.string().describe('The mock on-chain transaction hash.'),
})

export const anchorRecord = ai.defineFlow(
  {
    name: 'anchorRecord',
    inputSchema: AnchorRecordInputSchema,
    outputSchema: AnchorRecordOutputSchema,
  },
  async (input) => {
    // Generates the unique "Anchor" points for the DKV
    const mockCid =
      'Qm' + uuidv4().replace(/-/g, '').slice(0, 44)

    const mockTxHash =
      '0x' + uuidv4().replace(/-/g, '').slice(0, 64)

    return {
      cid: mockCid,
      txHash: mockTxHash,
    }
  }
)
