import { useMemo, useState } from 'react';
import { MOCK_CONTENT, TRIBE_COLOR_MAP } from '@/lib/data';
import { projectTo2D } from '@/lib/search';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';

const TRIBE_HEX: Record<string, string> = {
  'Melancholic Dreamers': '#8B6BAE',
  'Euphoric Creators': '#E8A87C',
  'Nostalgic Souls': '#C9956B',
  'Hustle Tribe': '#E85D4A',
  'Deep Thinkers': '#4A90D9',
  'Aesthetic Wanderers': '#D4A5C7',
  'Dopamine Seekers': '#E8D34A',
  'Quiet Warriors': '#6BAF8D',
};

export default function BrainMapPage() {
  const points = useMemo(() => projectTo2D(MOCK_CONTENT), []);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg text-xs space-y-1">
          <p className="font-semibold text-foreground">{d.title}</p>
          <p className="text-muted-foreground">{d.tribe}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container py-8 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Brain Map</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Content clusters visualized by cognitive activation vectors. Each dot is a content item, color-coded by tribe.
        </p>
      </motion.div>

      <div className="rounded-lg border border-border bg-card p-4">
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis
              type="number"
              dataKey="x"
              name="Stimulation"
              tick={{ fontSize: 10, fill: 'hsl(215, 15%, 55%)' }}
              axisLine={{ stroke: 'hsl(220, 20%, 18%)' }}
              tickLine={false}
              label={{ value: 'Visual + Reward Axis', position: 'bottom', fontSize: 10, fill: 'hsl(215, 15%, 55%)' }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Emotion"
              tick={{ fontSize: 10, fill: 'hsl(215, 15%, 55%)' }}
              axisLine={{ stroke: 'hsl(220, 20%, 18%)' }}
              tickLine={false}
              label={{ value: 'Emotional Axis', angle: -90, position: 'left', fontSize: 10, fill: 'hsl(215, 15%, 55%)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={points}>
              {points.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={TRIBE_HEX[entry.tribe] || '#1D9E75'}
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

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(TRIBE_HEX).map(([tribe, color]) => (
          <div key={tribe} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-muted-foreground">{tribe}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
