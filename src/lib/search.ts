import { BrainVector, ContentItem, SearchQuery, SearchResult } from './types';

export function queryToVector(query: SearchQuery): BrainVector {
  return {
    visual_intensity: 0.5 + query.intensity * 0.3,
    auditory_intensity: 0.4 + query.intensity * 0.2,
    emotional_valence: query.emotional_tone * 2 - 1, // map 0-1 to -1 to +1
    emotional_intensity: query.intensity,
    cognitive_load: 1 - query.reward_loop * 0.5, // reflective = high cognitive
    reward_signal: query.reward_loop,
    social_signal: 0.5,
  };
}

export function cosineSimilarity(a: BrainVector, b: BrainVector): number {
  const keys: (keyof BrainVector)[] = [
    'visual_intensity', 'auditory_intensity', 'emotional_valence',
    'emotional_intensity', 'cognitive_load', 'reward_signal', 'social_signal',
  ];
  let dot = 0, magA = 0, magB = 0;
  for (const k of keys) {
    dot += a[k] * b[k];
    magA += a[k] * a[k];
    magB += b[k] * b[k];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

function generateMatchReason(item: ContentItem, score: number, target: BrainVector): string {
  const vec = item.brain_vector;
  const reasons: string[] = [];

  if (Math.abs(vec.emotional_valence - target.emotional_valence) < 0.3) {
    reasons.push(vec.emotional_valence > 0 ? 'matching positive emotional tone' : 'matching contemplative mood');
  }
  if (Math.abs(vec.reward_signal - target.reward_signal) < 0.2) {
    reasons.push(vec.reward_signal > 0.6 ? 'high dopamine activation' : 'reflective engagement pattern');
  }
  if (Math.abs(vec.visual_intensity - target.visual_intensity) < 0.2) {
    reasons.push('aligned visual intensity');
  }
  if (Math.abs(vec.cognitive_load - target.cognitive_load) < 0.2) {
    reasons.push(vec.cognitive_load > 0.6 ? 'deep cognitive engagement' : 'light cognitive flow');
  }

  if (reasons.length === 0) {
    reasons.push(`${Math.round(score * 100)}% brain vector alignment across dimensions`);
  }

  return `Matched due to ${reasons.slice(0, 2).join(' and ')}.`;
}

export function searchContent(items: ContentItem[], query: SearchQuery, topK = 10): SearchResult[] {
  const target = queryToVector(query);

  return items
    .map(item => ({
      ...item,
      match_score: cosineSimilarity(item.brain_vector, target),
      match_reason: '',
    }))
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, topK)
    .map(item => ({
      ...item,
      match_reason: generateMatchReason(item, item.match_score, target),
    }));
}

// Simple 2D projection using first two principal-ish components
export function projectTo2D(items: ContentItem[]): { id: string; x: number; y: number; tribe: string; title: string }[] {
  return items.map(item => {
    const v = item.brain_vector;
    // Approximate PCA: x ≈ visual + reward - cognitive, y ≈ emotional_valence + emotional_intensity - auditory
    const x = v.visual_intensity * 0.5 + v.reward_signal * 0.4 - v.cognitive_load * 0.3 + v.social_signal * 0.1;
    const y = (v.emotional_valence + 1) / 2 * 0.5 + v.emotional_intensity * 0.3 - v.auditory_intensity * 0.2;
    return { id: item.id, x: x * 100, y: y * 100, tribe: item.tribe, title: item.title };
  });
}
