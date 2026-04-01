import { SearchResult } from '@/lib/types';
import { BrainBars } from './BrainBars';
import { TribeBadge } from './TribeBadge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ContentCardProps {
  item: SearchResult;
  index: number;
}

export function ContentCard({ item, index }: ContentCardProps) {
  const navigate = useNavigate();
  const matchPct = Math.round(item.match_score * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate(`/content/${item.id}`)}
      className="group cursor-pointer rounded-lg border border-border bg-card p-4 hover:border-primary/40 transition-all duration-200 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)]"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-muted-foreground">{item.category}</span>
        <div className="flex items-center gap-1">
          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary">{matchPct}%</span>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
        {item.title}
      </h3>
      <p className="text-xs text-muted-foreground mb-3">{item.creator}</p>

      <div className="mb-3">
        <BrainBars vector={item.brain_vector} variant="compact" />
      </div>

      <div className="mb-2">
        <TribeBadge tribe={item.tribe} />
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {item.hashtags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] text-primary/70">{tag}</span>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground italic leading-relaxed">{item.match_reason}</p>
    </motion.div>
  );
}
