import { useMemo, useState } from 'react';
import { useContentItems, useTribes } from '@/hooks/use-content';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Map, Loader2 } from 'lucide-react';

interface PlotPoint {
  id: string;
  x: number;
  y: number;
  tribe: string;
  title: string;
  creator: string;
  score: number;
}

export default function BrainMapPage() {
  const { data: content, isLoading: loadingContent } = useContentItems();
  const { data: tribes, isLoading: loadingTribes } = useTribes();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const tribeHexMap = useMemo(() => {
    if (!tribes) return {};
    return Object.fromEntries(tribes.map(t => [t.name, t.color_key]));
  }, [tribes]);

  const points: PlotPoint[] = useMemo(() => {
    if (!content) return [];
    return content.map(item => {
      const v = item.brain_vector;
      // Magnitude of vector as a proxy "brain activation score"
      const mag = Math.sqrt(
        v.visual_intensity ** 2 + v.auditory_intensity ** 2 +
        v.emotional_intensity ** 2 + v.cognitive_load ** 2 +
        v.reward_signal ** 2 + v.social_signal ** 2
      );
      const maxMag = Math.sqrt(6); // max possible when all dims = 1
      return {
        id: item.id,
        x: v.visual_intensity,
        y: v.emotional_valence,
        tribe: item.tribe,
        title: item.title,
        creator: item.creator,
        score: Math.round((mag / maxMag) * 100),
      };
    });
  }, [content]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      const d = payload[0].payload as PlotPoint;
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg text-xs space-y-1">
          <p className="font-semibold text-foreground">{d.title}</p>
          <p className="text-muted-foreground">by {d.creator}</p>
          <p className="text-primary font-medium">Brain Score: {d.score}%</p>
        </div>
      );
    }
    return null;
  };

  if (loadingContent || loadingTribes) {
    return (
      <div className="container py-20 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Brain Map</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Each dot is a content item plotted by visual intensity (X) and emotional valence (Y), color-coded by tribe.
        </p>
      </motion.div>

      <div className="rounded-lg border border-border bg-card p-4">
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 30 }}>
            <XAxis
              type="number" dataKey="x" name="Visual Intensity"
              domain={[0, 1]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
              label={{ value: 'Visual Intensity', position: 'bottom', fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              type="number" dataKey="y" name="Emotional Valence"
              domain={[-1, 1]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
              label={{ value: 'Emotional Valence', angle: -90, position: 'left', fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={points}>
              {points.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={tribeHexMap[entry.tribe] || '#1D9E75'}
                  fillOpacity={hoveredId === entry.id ? 1 : 0.7}
                  r={hoveredId === entry.id ? 8 : 5}
                  onMouseEnter={() => setHoveredId(entry.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  cursor="pointer"
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-3">
        {tribes?.map((tribe) => (
          <div key={tribe.id} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tribe.color_key }} />
            <span className="text-[11px] text-muted-foreground">{tribe.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
