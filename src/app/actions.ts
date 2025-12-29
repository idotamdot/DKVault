'use server';


import { v4 as uuidv4 } from 'uuid';
import { kv } from '@vercel/kv';
import { put } from '@vercel/blob';



// --- Flow Imports ---
// Protocol A: Journaling
import { provideSynthesisReports } from '@/ai/flows/meditation-journal-synthesis-reports';

// Protocol B: Hero Reels
import { generateHeroSynthesis } from '@/ai/flows/hero-synthesis-report';
import { anchorRecord } from '@/ai/flows/anchor-record';

// --- PROTOCOL A: Journal & Meditation (Preserved & Enhanced) ---

/**
 * Handles the synthesis report generation for meditation data.
 * Merged logic: Wraps manual strings into the required schema to prevent validation errors.
 */
export async function analyzeJournal(input: any) {
  // If input is just a string (manual entry from the UI), wrap it in the required schema
  const formattedInput = typeof input === 'string' ? {
    meditationType: "Manual Entry",
    sampleSize: 1,
    commonThemes: ["User Reflection"],
    emergentMeanings: [input] // Your manual thought is anchored here
  } : input;

  // Now the flow receives the correctly structured object
  return await provideSynthesisReports(formattedInput);
}

/**
 * Legacy wrapper: Also updated to use the formatted input logic.
 */
export async function generateSynthesisReport(input: any) {
  return await analyzeJournal(input);
}


// --- PROTOCOL B: Hero Reel Synthesis (The Oracle) ---

/**
 * MISSION SUBMISSION: Step 1
 * Captures the individual word video and anchors it to the DKV.
 */
export async function submitHeroQuest(formData: FormData) {
  const videoFile = formData.get('video') as File;
  const word = formData.get('word') as string;

  const blobId = uuidv4();
  const blob = await put(`missions/${blobId}-${videoFile.name}`, videoFile, {
    access: 'public',
  });

  const missionId = `mission:${uuidv4()}`;
  await kv.set(missionId, {
    record_type: 'MISSION',
    word,
    video_url: blob.url,
    timestamp: new Date().toISOString()
  });

  return { success: true, missionId };
}

/**
 * THE ORACLE SYNTHESIS: Steps 2-5
 * Performs CANI validation and generates the Hero Script.
 */
export async function runHeroReelSynthesis() {
  // 1. Collect last 100 nouns (The Collective Noun Cluster)
  const keys = await kv.keys('mission:*');
  const allMissions = await Promise.all(keys.map(k => kv.get(k)));
  const cnc = (allMissions as any[])
    .filter(m => m.record_type === 'MISSION')
    .slice(-100);

  if (cnc.length < 5) throw new Error("CNC threshold not met. Need more contributions.");

  // 2. Oracle Analysis & CANI Validation
  const nouns = cnc.map(m => m.word);
  const synthesis = await generateHeroSynthesis({ 
    cncNouns: nouns, 
    sampleSize: cnc.length 
  });

  // 3. Anchor the Synthesis (Immutable Proof)
  const anchorProof = await anchorRecord({ record: synthesis });

  // 4. Save Final Master Record to the DKV
  const masterKey = `master:hero-reel:${anchorProof.txHash}`;
  await kv.set(masterKey, {
    ...synthesis,
    proof: anchorProof,
    timestamp: new Date().toISOString()
  });

  return { success: true, theme: synthesis.emergentTheme, txHash: anchorProof.txHash };
}