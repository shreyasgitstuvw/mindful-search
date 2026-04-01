import { BRAIN_DIMENSIONS, ALL_BRAIN_DIMENSIONS, BrainVector } from '@/lib/types';
import { cn } from '@/lib/utils';

interface BrainBarsProps {
  vector: BrainVector;
  variant?: 'compact' | 'full';
  animated?: boolean;
}

export function BrainBars({ vector, variant = 'compact', animated = true }: BrainBarsProps) {
  const dims = variant === 'compact' ? BRAIN_DIMENSIONS : ALL_BRAIN_DIMENSIONS;

  return (
    <div className={cn('space-y-1.5', variant === 'full' && 'space-y-2.5')}>
      {dims.map((dim) => {
        const raw = vector[dim.key];
        // Normalize valence from [-1,1] to [0,1] for display
        const value = dim.key === 'emotional_valence' ? (raw + 1) / 2 : raw;
        const pct = Math.round(value * 100);

        return (
          <div key={dim.key} className="flex items-center gap-2">
            <span className={cn(
              'text-muted-foreground shrink-0',
              variant === 'compact' ? 'w-16 text-[10px]' : 'w-28 text-xs'
            )}>
              {dim.label}
            </span>
            <div className="relative flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  animated && 'animate-bar-fill'
                )}
                style={{
                  width: `${pct}%`,
                  backgroundColor: `hsl(var(--${dim.color}))`,
                  ['--bar-width' as string]: `${pct}%`,
                  boxShadow: `0 0 6px hsl(var(--${dim.color}) / 0.4)`,
                }}
              />
            </div>
            {variant === 'full' && (
              <span className="text-xs text-muted-foreground w-10 text-right font-mono">
                {dim.key === 'emotional_valence' ? raw.toFixed(2) : pct + '%'}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
