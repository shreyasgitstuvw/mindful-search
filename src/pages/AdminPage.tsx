import { useState } from 'react';
import { BrainVector, ContentItem, ALL_BRAIN_DIMENSIONS } from '@/lib/types';
import { TRIBES } from '@/lib/data';
import { BrainBars } from '@/components/BrainBars';
import { motion } from 'framer-motion';
import { Settings, Sparkles, Plus } from 'lucide-react';
import { toast } from 'sonner';

const defaultVector: BrainVector = {
  visual_intensity: 0.5,
  auditory_intensity: 0.5,
  emotional_valence: 0,
  emotional_intensity: 0.5,
  cognitive_load: 0.5,
  reward_signal: 0.5,
  social_signal: 0.5,
};

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [category, setCategory] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [tribe, setTribe] = useState(TRIBES[0].name);
  const [vector, setVector] = useState<BrainVector>({ ...defaultVector });
  const [description, setDescription] = useState('');

  const updateDim = (key: keyof BrainVector, value: number) => {
    setVector(prev => ({ ...prev, [key]: value }));
  };

  const handleAutoGenerate = () => {
    // Simulate AI-generated vector from description
    const seed = description.length || Math.random() * 100;
    const pseudo = (n: number) => Math.abs(Math.sin(seed * n)) * 0.8 + 0.1;
    setVector({
      visual_intensity: +pseudo(1).toFixed(2),
      auditory_intensity: +pseudo(2).toFixed(2),
      emotional_valence: +((pseudo(3) - 0.5) * 2).toFixed(2),
      emotional_intensity: +pseudo(4).toFixed(2),
      cognitive_load: +pseudo(5).toFixed(2),
      reward_signal: +pseudo(6).toFixed(2),
      social_signal: +pseudo(7).toFixed(2),
    });
    toast.success('Brain vector auto-generated from content description');
  };

  const handleSubmit = () => {
    if (!title || !creator) {
      toast.error('Title and creator are required');
      return;
    }
    toast.success(`"${title}" added to content library`);
    // Reset
    setTitle('');
    setCreator('');
    setCategory('');
    setHashtags('');
    setDescription('');
    setVector({ ...defaultVector });
  };

  return (
    <div className="container py-8 max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Content Ingest</h1>
        </div>
        <p className="text-sm text-muted-foreground">Add content items with brain activation vectors.</p>
      </motion.div>

      <div className="space-y-4">
        {/* Basic fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Creator *</label>
            <input value={creator} onChange={e => setCreator(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Category</label>
            <input value={category} onChange={e => setCategory(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Tribe</label>
            <select value={tribe} onChange={e => setTribe(e.target.value)}
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              {TRIBES.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Hashtags (comma-separated)</label>
          <input value={hashtags} onChange={e => setHashtags(e.target.value)} placeholder="#tag1, #tag2"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Content Description (for auto-generate)</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
            placeholder="Describe the content to auto-generate a brain vector..."
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
        </div>

        {/* Brain vector sliders */}
        <div className="p-4 rounded-lg border border-border bg-card/50 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Brain Vector</h2>
            <button onClick={handleAutoGenerate}
              className="flex items-center gap-1 text-xs text-primary hover:underline">
              <Sparkles className="h-3 w-3" /> Auto-generate
            </button>
          </div>

          {ALL_BRAIN_DIMENSIONS.map(dim => {
            const isValence = dim.key === 'emotional_valence';
            const min = isValence ? -1 : 0;
            const max = 1;
            return (
              <div key={dim.key} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-28 shrink-0">{dim.label}</span>
                <input type="range" min={min} max={max} step="0.01" value={vector[dim.key]}
                  onChange={e => updateDim(dim.key, parseFloat(e.target.value))}
                  className="flex-1 h-1.5 rounded-full appearance-none bg-secondary cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
                <span className="text-xs text-muted-foreground w-10 text-right font-mono">
                  {vector[dim.key].toFixed(2)}
                </span>
              </div>
            );
          })}

          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-2">Preview:</p>
            <BrainBars vector={vector} variant="full" animated={false} />
          </div>
        </div>

        <button onClick={handleSubmit}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" /> Add Content
        </button>
      </div>
    </div>
  );
}
