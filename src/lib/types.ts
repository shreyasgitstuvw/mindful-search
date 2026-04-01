export interface BrainVector {
  visual_intensity: number;
  auditory_intensity: number;
  emotional_valence: number; // -1 to +1
  emotional_intensity: number;
  cognitive_load: number;
  reward_signal: number;
  social_signal: number;
}

export interface ContentItem {
  id: string;
  title: string;
  creator: string;
  category: string;
  hashtags: string[];
  tribe: string;
  brain_vector: BrainVector;
  engagement: {
    views: number;
    saves: number;
    shares: number;
  };
  created_at: string;
  description?: string;
}

export interface Tribe {
  id: string;
  name: string;
  description: string;
  cognitive_signature: BrainVector;
  color_key: string;
  growth_rate: number;
}

export interface SearchQuery {
  text: string;
  emotional_tone: number; // 0 (melancholic) to 1 (joyful)
  intensity: number; // 0 (calm) to 1 (electric)
  reward_loop: number; // 0 (reflective) to 1 (addictive)
}

export interface SearchResult extends ContentItem {
  match_score: number;
  match_reason: string;
}

export interface SearchLog {
  id: string;
  query_text: string;
  slider_values: { emotional_tone: number; intensity: number; reward_loop: number };
  result_ids: string[];
  timestamp: string;
}

export const BRAIN_DIMENSIONS = [
  { key: 'visual_intensity' as const, label: 'Visual', color: 'bar-visual' },
  { key: 'auditory_intensity' as const, label: 'Auditory', color: 'bar-auditory' },
  { key: 'emotional_intensity' as const, label: 'Emotion', color: 'bar-emotion' },
  { key: 'cognitive_load' as const, label: 'Cognitive', color: 'bar-cognitive' },
  { key: 'reward_signal' as const, label: 'Reward', color: 'bar-reward' },
] as const;

export const ALL_BRAIN_DIMENSIONS = [
  { key: 'visual_intensity' as const, label: 'Visual Intensity', color: 'bar-visual' },
  { key: 'auditory_intensity' as const, label: 'Auditory Intensity', color: 'bar-auditory' },
  { key: 'emotional_valence' as const, label: 'Emotional Valence', color: 'bar-emotion', range: [-1, 1] as [number, number] },
  { key: 'emotional_intensity' as const, label: 'Emotional Intensity', color: 'bar-emotion' },
  { key: 'cognitive_load' as const, label: 'Cognitive Load', color: 'bar-cognitive' },
  { key: 'reward_signal' as const, label: 'Reward Signal', color: 'bar-reward' },
  { key: 'social_signal' as const, label: 'Social Signal', color: 'bar-social' },
] as const;
