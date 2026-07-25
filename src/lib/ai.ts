import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Feature =
  | 'study-planner'
  | 'quiz-generator'
  | 'topic-explainer'
  | 'notes-summarizer'
  | 'study-coach'
  | 'exam-buddy';

export interface AiResponse {
  content: string;
  preview: boolean;
  error?: string;
}

export async function callAi(
  feature: Feature,
  payload: Record<string, string>
): Promise<AiResponse> {
  const url = `${supabaseUrl}/functions/v1/ai-proxy`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ feature, payload }),
    });

    if (!res.ok) {
      let msg = `Request failed (${res.status})`;
      try {
        const body = await res.json();
        if (body?.error) msg = body.error;
      } catch {
        /* ignore parse error */
      }
      return { content: '', preview: false, error: msg };
    }

    const data = (await res.json()) as AiResponse;
    if (data?.error) return { content: '', preview: false, error: data.error };
    if (!data?.content) {
      return { content: '', preview: false, error: 'No content returned from AI.' };
    }
    return data;
  } catch (err) {
    return {
      content: '',
      preview: false,
      error: err instanceof Error ? err.message : 'Network error contacting AI service.',
    };
  }
}
