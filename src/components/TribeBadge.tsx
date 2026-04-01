import { TRIBE_COLOR_MAP } from '@/lib/data';
import { cn } from '@/lib/utils';

interface TribeBadgeProps {
  tribe: string;
  size?: 'sm' | 'md';
}

export function TribeBadge({ tribe, size = 'sm' }: TribeBadgeProps) {
  const colorKey = TRIBE_COLOR_MAP[tribe] || 'tribe-melancholic';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium border',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      )}
      style={{
        backgroundColor: `hsl(var(--${colorKey}) / 0.15)`,
        borderColor: `hsl(var(--${colorKey}) / 0.3)`,
        color: `hsl(var(--${colorKey}))`,
      }}
    >
      <span
        className="mr-1.5 h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: `hsl(var(--${colorKey}))` }}
      />
      {tribe}
    </span>
  );
}
