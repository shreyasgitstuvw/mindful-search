import { useState } from 'react';
import { SearchSlider } from '@/components/SearchSlider';
import { ContentCard } from '@/components/ContentCard';
import { useContentItems, useLogSearch } from '@/hooks/use-content';
import { searchContent } from '@/lib/search';
import { useAuth } from '@/hooks/use-auth';
import { SearchQuery, SearchResult } from '@/lib/types';
import { motion } from 'framer-motion';
import { Brain, Search, Sparkles, Loader2 } from 'lucide-react';

export default function SearchPage() {
  const { data: allContent, isLoading } = useContentItems();
  const logSearch = useLogSearch();
  const [query, setQuery] = useState<SearchQuery>({
    text: '',
    emotional_tone: 0.5,
    intensity: 0.5,
    reward_loop: 0.5,
  });
  const [results, setResults] = useState<SearchResult[] | null>(null);

  const handleSearch = () => {
    if (!allContent) return;
    const res = searchContent(allContent, query);
    setResults(res);
    logSearch.mutate({
      query_text: query.text,
      slider_values: { emotional_tone: query.emotional_tone, intensity: query.intensity, reward_loop: query.reward_loop },
      result_ids: res.map(r => r.id),
    });
  };

  return (
    <div className="container py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Search by how you want to <span className="text-primary">feel</span>
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Describe an emotional experience. We'll match content by brain activation patterns, not keywords.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-xl mx-auto space-y-5">
        <div className="relative">
          <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
          <input
            type="text"
            placeholder="I want to feel inspired and energized, like discovering something new..."
            value={query.text}
            onChange={(e) => setQuery({ ...query, text: e.target.value })}
            className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        <div className="space-y-4 p-4 rounded-lg border border-border bg-card/50">
          <SearchSlider label="Emotional Tone" leftLabel="Melancholic" rightLabel="Joyful" value={query.emotional_tone} onChange={(v) => setQuery({ ...query, emotional_tone: v })} />
          <SearchSlider label="Intensity" leftLabel="Calm" rightLabel="Electric" value={query.intensity} onChange={(v) => setQuery({ ...query, intensity: v })} />
          <SearchSlider label="Reward Loop" leftLabel="Reflective" rightLabel="Addictive" value={query.reward_loop} onChange={(v) => setQuery({ ...query, reward_loop: v })} />
        </div>

        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Search Brain Space
        </button>
      </motion.div>

      {results && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">{results.length} results ranked by brain vector similarity</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map((item, i) => (
              <ContentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
