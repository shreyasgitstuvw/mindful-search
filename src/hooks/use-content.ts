import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ContentItem, BrainVector, Tribe } from '@/lib/types';

function rowToContentItem(row: any): ContentItem {
  return {
    id: row.id,
    title: row.title,
    creator: row.creator,
    category: row.category,
    hashtags: row.hashtags || [],
    tribe: row.tribe,
    brain_vector: row.brain_vector as BrainVector,
    engagement: { views: row.views || 0, saves: row.saves || 0, shares: row.shares || 0 },
    created_at: row.created_at,
  };
}

function rowToTribe(row: any): Tribe {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    cognitive_signature: row.cognitive_signature as BrainVector,
    color_key: row.color_hex,
    growth_rate: row.growth_rate,
  };
}

export function useContentItems() {
  return useQuery({
    queryKey: ['content_items'],
    queryFn: async () => {
      const { data, error } = await supabase.from('content_items').select('*');
      if (error) throw error;
      return (data || []).map(rowToContentItem);
    },
  });
}

export function useTribes() {
  return useQuery({
    queryKey: ['tribes'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tribes').select('*');
      if (error) throw error;
      return (data || []).map(rowToTribe);
    },
  });
}

export function useContentItem(id: string) {
  return useQuery({
    queryKey: ['content_items', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('content_items').select('*').eq('id', id).single();
      if (error) throw error;
      return rowToContentItem(data);
    },
    enabled: !!id,
  });
}

export function useInsertContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: {
      title: string; creator: string; category: string;
      hashtags: string[]; tribe: string; brain_vector: BrainVector;
    }) => {
      const { error } = await supabase.from('content_items').insert({
        title: item.title,
        creator: item.creator,
        category: item.category,
        hashtags: item.hashtags,
        tribe: item.tribe,
        brain_vector: item.brain_vector as any,
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['content_items'] }),
  });
}

export function useLogSearch() {
  return useMutation({
    mutationFn: async (log: {
      query_text: string;
      slider_values: { emotional_tone: number; intensity: number; reward_loop: number };
      result_ids: string[];
    }) => {
      const { error } = await supabase.from('search_logs').insert({
        query_text: log.query_text,
        slider_values: log.slider_values as any,
        result_ids: log.result_ids,
      });
      if (error) throw error;
    },
  });
}
