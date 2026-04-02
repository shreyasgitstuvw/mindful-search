import { useParams, Link } from 'react-router-dom';
import { useContentItem, useContentItems, useTribes } from '@/hooks/use-content';
import { BrainBars } from '@/components/BrainBars';
import { TribeBadge } from '@/components/TribeBadge';
import { ContentCard } from '@/components/ContentCard';
import { searchContent } from '@/lib/search';
import { SearchQuery } from '@/lib/types';
import { formatNumber } from '@/lib/data';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Bookmark, Share2, Loader2 } from 'lucide-react';

export default function ContentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: item, isLoading } = useContentItem(id || '');
  const { data: allContent } = useContentItems();
  const { data: tribes } = useTribes();

  if (isLoading) {
    return <div className="container py-20 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  if (!item) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Content not found.</p>
        <Link to="/" className="text-primary text-sm mt-2 inline-block">← Back to search</Link>
      </div>
    );
  }

  const tribe = tribes?.find(t => t.name === item.tribe);

  const fakeQuery: SearchQuery = {
    text: '',
    emotional_tone: (item.brain_vector.emotional_valence + 1) / 2,
    intensity: item.brain_vector.emotional_intensity,
    reward_loop: item.brain_vector.reward_signal,
  };
  const similar = allContent
    ? searchContent(allContent, fakeQuery, 5).filter(r => r.id !== item.id).slice(0, 4)
    : [];

  return (
    <div className="container py-8 max-w-3xl space-y-6">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-3 w-3" /> Back
      </Link>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <span className="text-xs text-muted-foreground">{item.category}</span>
          <h1 className="text-xl font-bold text-foreground mt-1">{item.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{item.creator}</p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <TribeBadge tribe={item.tribe} size="md" />
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{formatNumber(item.engagement.views)}</span>
            <span className="flex items-center gap-1"><Bookmark className="h-3 w-3" />{formatNumber(item.engagement.saves)}</span>
            <span className="flex items-center gap-1"><Share2 className="h-3 w-3" />{formatNumber(item.engagement.shares)}</span>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Brain Activation Profile</h2>
          <BrainBars vector={item.brain_vector} variant="full" />
        </div>

        {tribe && (
          <div className="p-4 rounded-lg border border-border bg-card/50 space-y-2">
            <h2 className="text-sm font-semibold text-foreground">Tribe: {tribe.name}</h2>
            <p className="text-xs text-muted-foreground">{tribe.description}</p>
            <p className="text-xs text-muted-foreground">Growth rate: <span className="text-primary font-mono">+{(tribe.growth_rate * 100).toFixed(0)}%</span></p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {item.hashtags.map(tag => (
            <span key={tag} className="text-xs text-primary/80 bg-primary/5 rounded-full px-2.5 py-0.5">{tag}</span>
          ))}
        </div>

        {similar.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Similar Content</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {similar.map((s, i) => (
                <ContentCard key={s.id} item={s} index={i} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
