'use client';

import { useState } from 'react';
import { submitHeroQuest } from '@/app/actions'; // Assume standard upload action

export function HeroQuest({ assignedWord }: { assignedWord: string }) {
  const [recording, setRecording] = useState(false);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('video', file);
    formData.append('word', assignedWord);
    await submitHeroQuest(formData);
    alert("Contribution anchored to the DKV.");
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-lg border border-blue-500">
      <h2 className="text-xl font-bold mb-2">Random Quest</h2>
      <p className="mb-4">Record yourself saying the word: <span className="text-yellow-400 font-mono">"{assignedWord}"</span></p>
      {/* Implementation of video capture logic goes here */}
      <button className="bg-blue-600 px-4 py-2 rounded">Start Recording</button>
    </div>
  );
}