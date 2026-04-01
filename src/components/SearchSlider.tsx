import { cn } from '@/lib/utils';

interface SearchSliderProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (v: number) => void;
}

export function SearchSlider({ label, leftLabel, rightLabel, value, onChange }: SearchSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground font-mono">{value.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-muted-foreground w-16 text-right">{leftLabel}</span>
        <div className="relative flex-1">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className={cn(
              'w-full h-1.5 rounded-full appearance-none cursor-pointer',
              'bg-secondary',
              '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
              '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary',
              '[&::-webkit-slider-thumb]:shadow-[0_0_8px_hsl(var(--primary)/0.5)]',
              '[&::-webkit-slider-thumb]:cursor-pointer',
            )}
          />
        </div>
        <span className="text-[10px] text-muted-foreground w-16">{rightLabel}</span>
      </div>
    </div>
  );
}
