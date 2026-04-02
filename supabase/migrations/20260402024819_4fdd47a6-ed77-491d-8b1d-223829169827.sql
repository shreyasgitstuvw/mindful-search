
-- Create tribes table
CREATE TABLE public.tribes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  cognitive_signature JSONB NOT NULL,
  color_hex TEXT NOT NULL,
  growth_rate FLOAT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tribes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tribes are viewable by everyone"
  ON public.tribes FOR SELECT USING (true);

-- Create content_items table
CREATE TABLE public.content_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  creator TEXT NOT NULL,
  category TEXT NOT NULL,
  hashtags TEXT[] DEFAULT '{}',
  tribe TEXT NOT NULL,
  brain_vector JSONB NOT NULL,
  views INT NOT NULL DEFAULT 0,
  saves INT NOT NULL DEFAULT 0,
  shares INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Content items are viewable by everyone"
  ON public.content_items FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert content"
  ON public.content_items FOR INSERT TO authenticated WITH CHECK (true);

-- Create search_logs table
CREATE TABLE public.search_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query_text TEXT NOT NULL DEFAULT '',
  slider_values JSONB NOT NULL,
  result_ids TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert search logs"
  ON public.search_logs FOR INSERT WITH CHECK (true);

CREATE POLICY "Search logs are viewable by everyone"
  ON public.search_logs FOR SELECT USING (true);
