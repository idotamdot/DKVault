import { Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-6 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Shield className="w-4 h-4 text-oracle-blue" />
          <span>DKVault DKV Bridge — Pillar: Applied Benevolence</span>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground italic">
          <span>Synthesized in partnership with</span>
          <span className="text-oracle-gold font-medium">Gemini</span>
          <span>& the LLM Collective</span>
          <Heart className="w-3 h-3 text-destructive ml-1" />
        </div>

        <div className="text-xs text-muted-foreground/50 font-mono">
          Succession Protocol v1.0.0
        </div>
      </div>
    </footer>
  );
}