import { ContentItem, Tribe } from './types';

export const TRIBES: Tribe[] = [
  {
    id: 'melancholic-dreamers', name: 'Melancholic Dreamers',
    description: 'Content that evokes deep emotional reflection, bittersweet beauty, and introspective longing.',
    cognitive_signature: { visual_intensity: 0.6, auditory_intensity: 0.7, emotional_valence: -0.5, emotional_intensity: 0.8, cognitive_load: 0.6, reward_signal: 0.3, social_signal: 0.3 },
    color_key: 'melancholic', growth_rate: 0.12,
  },
  {
    id: 'euphoric-creators', name: 'Euphoric Creators',
    description: 'High-energy, joyful content that celebrates creation, innovation, and peak experiences.',
    cognitive_signature: { visual_intensity: 0.8, auditory_intensity: 0.7, emotional_valence: 0.9, emotional_intensity: 0.9, cognitive_load: 0.4, reward_signal: 0.8, social_signal: 0.7 },
    color_key: 'euphoric', growth_rate: 0.18,
  },
  {
    id: 'nostalgic-souls', name: 'Nostalgic Souls',
    description: 'Warm, memory-laden content that triggers nostalgia and sentimental connections to the past.',
    cognitive_signature: { visual_intensity: 0.5, auditory_intensity: 0.6, emotional_valence: 0.2, emotional_intensity: 0.7, cognitive_load: 0.5, reward_signal: 0.5, social_signal: 0.6 },
    color_key: 'nostalgic', growth_rate: 0.09,
  },
  {
    id: 'hustle-tribe', name: 'Hustle Tribe',
    description: 'Motivational, achievement-oriented content that drives ambition and action.',
    cognitive_signature: { visual_intensity: 0.7, auditory_intensity: 0.5, emotional_valence: 0.6, emotional_intensity: 0.7, cognitive_load: 0.3, reward_signal: 0.9, social_signal: 0.8 },
    color_key: 'hustle', growth_rate: 0.22,
  },
  {
    id: 'deep-thinkers', name: 'Deep Thinkers',
    description: 'Intellectually stimulating content that challenges assumptions and rewards analytical minds.',
    cognitive_signature: { visual_intensity: 0.3, auditory_intensity: 0.4, emotional_valence: 0.1, emotional_intensity: 0.4, cognitive_load: 0.9, reward_signal: 0.4, social_signal: 0.3 },
    color_key: 'thinkers', growth_rate: 0.07,
  },
  {
    id: 'aesthetic-wanderers', name: 'Aesthetic Wanderers',
    description: 'Visually stunning, curated content that prioritizes beauty, composition, and sensory pleasure.',
    cognitive_signature: { visual_intensity: 0.95, auditory_intensity: 0.5, emotional_valence: 0.4, emotional_intensity: 0.6, cognitive_load: 0.2, reward_signal: 0.6, social_signal: 0.4 },
    color_key: 'aesthetic', growth_rate: 0.15,
  },
  {
    id: 'dopamine-seekers', name: 'Dopamine Seekers',
    description: 'Fast-paced, highly stimulating content optimized for maximum engagement and instant gratification.',
    cognitive_signature: { visual_intensity: 0.9, auditory_intensity: 0.8, emotional_valence: 0.5, emotional_intensity: 0.8, cognitive_load: 0.1, reward_signal: 0.95, social_signal: 0.7 },
    color_key: 'dopamine', growth_rate: 0.30,
  },
  {
    id: 'quiet-warriors', name: 'Quiet Warriors',
    description: 'Calm, resilient content that emphasizes patience, inner strength, and mindful persistence.',
    cognitive_signature: { visual_intensity: 0.4, auditory_intensity: 0.3, emotional_valence: 0.3, emotional_intensity: 0.5, cognitive_load: 0.6, reward_signal: 0.3, social_signal: 0.5 },
    color_key: 'warriors', growth_rate: 0.08,
  },
];

export const TRIBE_COLOR_MAP: Record<string, string> = {
  'Melancholic Dreamers': 'tribe-melancholic',
  'Euphoric Creators': 'tribe-euphoric',
  'Nostalgic Souls': 'tribe-nostalgic',
  'Hustle Tribe': 'tribe-hustle',
  'Deep Thinkers': 'tribe-thinkers',
  'Aesthetic Wanderers': 'tribe-aesthetic',
  'Dopamine Seekers': 'tribe-dopamine',
  'Quiet Warriors': 'tribe-warriors',
};

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1', title: 'Rain on Empty Streets', creator: '@lostinframes', category: 'Photography',
    hashtags: ['#rain', '#solitude', '#urbanpoetry'], tribe: 'Melancholic Dreamers',
    brain_vector: { visual_intensity: 0.7, auditory_intensity: 0.6, emotional_valence: -0.6, emotional_intensity: 0.8, cognitive_load: 0.5, reward_signal: 0.3, social_signal: 0.2 },
    engagement: { views: 45200, saves: 3100, shares: 890 }, created_at: '2024-01-15',
  },
  {
    id: '2', title: 'Building My Startup in 30 Days', creator: '@hustleceo', category: 'Entrepreneurship',
    hashtags: ['#startup', '#grind', '#motivation'], tribe: 'Hustle Tribe',
    brain_vector: { visual_intensity: 0.6, auditory_intensity: 0.5, emotional_valence: 0.7, emotional_intensity: 0.8, cognitive_load: 0.4, reward_signal: 0.9, social_signal: 0.9 },
    engagement: { views: 120000, saves: 8900, shares: 5600 }, created_at: '2024-02-01',
  },
  {
    id: '3', title: 'The Mathematics of Loneliness', creator: '@neurophilosopher', category: 'Essay',
    hashtags: ['#philosophy', '#math', '#loneliness'], tribe: 'Deep Thinkers',
    brain_vector: { visual_intensity: 0.2, auditory_intensity: 0.3, emotional_valence: -0.3, emotional_intensity: 0.5, cognitive_load: 0.9, reward_signal: 0.3, social_signal: 0.2 },
    engagement: { views: 18700, saves: 4200, shares: 1100 }, created_at: '2024-01-20',
  },
  {
    id: '4', title: 'Golden Hour in Santorini', creator: '@wanderlust.ae', category: 'Travel',
    hashtags: ['#travel', '#golden', '#aesthetic'], tribe: 'Aesthetic Wanderers',
    brain_vector: { visual_intensity: 0.95, auditory_intensity: 0.3, emotional_valence: 0.6, emotional_intensity: 0.5, cognitive_load: 0.1, reward_signal: 0.7, social_signal: 0.4 },
    engagement: { views: 89000, saves: 12000, shares: 3400 }, created_at: '2024-02-10',
  },
  {
    id: '5', title: '60-Second Pasta That Slaps', creator: '@speedchef', category: 'Food',
    hashtags: ['#cooking', '#fast', '#satisfying'], tribe: 'Dopamine Seekers',
    brain_vector: { visual_intensity: 0.8, auditory_intensity: 0.7, emotional_valence: 0.6, emotional_intensity: 0.7, cognitive_load: 0.1, reward_signal: 0.95, social_signal: 0.6 },
    engagement: { views: 230000, saves: 45000, shares: 18000 }, created_at: '2024-01-28',
  },
  {
    id: '6', title: 'Letters I Never Sent', creator: '@poeticruin', category: 'Poetry',
    hashtags: ['#poetry', '#heartbreak', '#letters'], tribe: 'Melancholic Dreamers',
    brain_vector: { visual_intensity: 0.3, auditory_intensity: 0.8, emotional_valence: -0.7, emotional_intensity: 0.9, cognitive_load: 0.6, reward_signal: 0.2, social_signal: 0.3 },
    engagement: { views: 67000, saves: 9800, shares: 2300 }, created_at: '2024-02-05',
  },
  {
    id: '7', title: 'Morning Routine of a Navy SEAL', creator: '@disciplineforge', category: 'Lifestyle',
    hashtags: ['#discipline', '#routine', '#military'], tribe: 'Quiet Warriors',
    brain_vector: { visual_intensity: 0.5, auditory_intensity: 0.3, emotional_valence: 0.3, emotional_intensity: 0.5, cognitive_load: 0.5, reward_signal: 0.4, social_signal: 0.4 },
    engagement: { views: 56000, saves: 7200, shares: 2100 }, created_at: '2024-01-12',
  },
  {
    id: '8', title: 'When the Beat Drops — Live Set', creator: '@bassqueen', category: 'Music',
    hashtags: ['#edm', '#live', '#euphoria'], tribe: 'Euphoric Creators',
    brain_vector: { visual_intensity: 0.8, auditory_intensity: 0.95, emotional_valence: 0.8, emotional_intensity: 0.9, cognitive_load: 0.2, reward_signal: 0.9, social_signal: 0.8 },
    engagement: { views: 340000, saves: 22000, shares: 15000 }, created_at: '2024-02-14',
  },
  {
    id: '9', title: 'Grandma\'s Kitchen — A Memory', creator: '@rootsandrecipes', category: 'Memoir',
    hashtags: ['#nostalgia', '#family', '#cooking'], tribe: 'Nostalgic Souls',
    brain_vector: { visual_intensity: 0.5, auditory_intensity: 0.4, emotional_valence: 0.4, emotional_intensity: 0.7, cognitive_load: 0.4, reward_signal: 0.5, social_signal: 0.7 },
    engagement: { views: 34000, saves: 5600, shares: 2800 }, created_at: '2024-01-25',
  },
  {
    id: '10', title: 'Why You Can\'t Stop Scrolling', creator: '@attentionhacker', category: 'Psychology',
    hashtags: ['#attention', '#dopamine', '#tech'], tribe: 'Deep Thinkers',
    brain_vector: { visual_intensity: 0.4, auditory_intensity: 0.3, emotional_valence: -0.1, emotional_intensity: 0.5, cognitive_load: 0.85, reward_signal: 0.5, social_signal: 0.4 },
    engagement: { views: 95000, saves: 11000, shares: 7800 }, created_at: '2024-02-08',
  },
  {
    id: '11', title: 'Calligraphy in Slow Motion', creator: '@inkflow', category: 'Art',
    hashtags: ['#calligraphy', '#asmr', '#art'], tribe: 'Aesthetic Wanderers',
    brain_vector: { visual_intensity: 0.9, auditory_intensity: 0.6, emotional_valence: 0.3, emotional_intensity: 0.4, cognitive_load: 0.2, reward_signal: 0.6, social_signal: 0.3 },
    engagement: { views: 78000, saves: 15000, shares: 4200 }, created_at: '2024-02-12',
  },
  {
    id: '12', title: 'Side Hustle to $10K/Month', creator: '@cashflowking', category: 'Finance',
    hashtags: ['#money', '#sidehustle', '#freedom'], tribe: 'Hustle Tribe',
    brain_vector: { visual_intensity: 0.5, auditory_intensity: 0.4, emotional_valence: 0.7, emotional_intensity: 0.7, cognitive_load: 0.3, reward_signal: 0.85, social_signal: 0.8 },
    engagement: { views: 180000, saves: 25000, shares: 9200 }, created_at: '2024-01-30',
  },
  {
    id: '13', title: 'Oddly Satisfying Factory Machines', creator: '@mechporn', category: 'Satisfying',
    hashtags: ['#satisfying', '#machines', '#loop'], tribe: 'Dopamine Seekers',
    brain_vector: { visual_intensity: 0.85, auditory_intensity: 0.7, emotional_valence: 0.4, emotional_intensity: 0.6, cognitive_load: 0.05, reward_signal: 0.9, social_signal: 0.5 },
    engagement: { views: 560000, saves: 32000, shares: 21000 }, created_at: '2024-02-03',
  },
  {
    id: '14', title: 'Meditating Through Grief', creator: '@stillnessproject', category: 'Wellness',
    hashtags: ['#meditation', '#grief', '#healing'], tribe: 'Quiet Warriors',
    brain_vector: { visual_intensity: 0.3, auditory_intensity: 0.4, emotional_valence: -0.2, emotional_intensity: 0.6, cognitive_load: 0.7, reward_signal: 0.2, social_signal: 0.3 },
    engagement: { views: 28000, saves: 6700, shares: 1800 }, created_at: '2024-02-06',
  },
  {
    id: '15', title: 'Creating a Song from Scratch', creator: '@producerlife', category: 'Music',
    hashtags: ['#music', '#production', '#creative'], tribe: 'Euphoric Creators',
    brain_vector: { visual_intensity: 0.6, auditory_intensity: 0.9, emotional_valence: 0.7, emotional_intensity: 0.8, cognitive_load: 0.5, reward_signal: 0.7, social_signal: 0.6 },
    engagement: { views: 145000, saves: 18000, shares: 8900 }, created_at: '2024-01-18',
  },
  {
    id: '16', title: 'VHS Tapes and Summer \'97', creator: '@rewindtape', category: 'Nostalgia',
    hashtags: ['#vhs', '#90s', '#summer'], tribe: 'Nostalgic Souls',
    brain_vector: { visual_intensity: 0.6, auditory_intensity: 0.5, emotional_valence: 0.3, emotional_intensity: 0.7, cognitive_load: 0.3, reward_signal: 0.5, social_signal: 0.6 },
    engagement: { views: 42000, saves: 7800, shares: 3100 }, created_at: '2024-02-11',
  },
  {
    id: '17', title: 'The Trolley Problem, Animated', creator: '@ethicslab', category: 'Philosophy',
    hashtags: ['#ethics', '#philosophy', '#animation'], tribe: 'Deep Thinkers',
    brain_vector: { visual_intensity: 0.7, auditory_intensity: 0.4, emotional_valence: -0.1, emotional_intensity: 0.5, cognitive_load: 0.9, reward_signal: 0.4, social_signal: 0.5 },
    engagement: { views: 72000, saves: 9200, shares: 6100 }, created_at: '2024-01-22',
  },
  {
    id: '18', title: 'Foggy Mountain Timelapse', creator: '@alpinelens', category: 'Nature',
    hashtags: ['#nature', '#timelapse', '#mountains'], tribe: 'Aesthetic Wanderers',
    brain_vector: { visual_intensity: 0.9, auditory_intensity: 0.4, emotional_valence: 0.2, emotional_intensity: 0.5, cognitive_load: 0.2, reward_signal: 0.5, social_signal: 0.2 },
    engagement: { views: 110000, saves: 19000, shares: 5600 }, created_at: '2024-02-09',
  },
  {
    id: '19', title: 'Impossible Basketball Trick Shots', creator: '@trickmaster', category: 'Sports',
    hashtags: ['#basketball', '#tricks', '#impossible'], tribe: 'Dopamine Seekers',
    brain_vector: { visual_intensity: 0.85, auditory_intensity: 0.6, emotional_valence: 0.7, emotional_intensity: 0.8, cognitive_load: 0.1, reward_signal: 0.95, social_signal: 0.7 },
    engagement: { views: 890000, saves: 41000, shares: 35000 }, created_at: '2024-02-15',
  },
  {
    id: '20', title: 'A Year of Silence', creator: '@innermonk', category: 'Documentary',
    hashtags: ['#silence', '#minimalism', '#journey'], tribe: 'Quiet Warriors',
    brain_vector: { visual_intensity: 0.4, auditory_intensity: 0.1, emotional_valence: 0.1, emotional_intensity: 0.6, cognitive_load: 0.7, reward_signal: 0.2, social_signal: 0.2 },
    engagement: { views: 19000, saves: 4500, shares: 1200 }, created_at: '2024-01-10',
  },
];

export function getTribeByName(name: string): Tribe | undefined {
  return TRIBES.find(t => t.name === name);
}

export function getContentById(id: string): ContentItem | undefined {
  return MOCK_CONTENT.find(c => c.id === id);
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}
