import { createClient } from "@supabase/supabase-js";

function getSupabaseConfig() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

  const url = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  return { url, key };
}

export function createServerSupabase() {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    throw new Error(
      "Supabase 환경변수가 설정되지 않았습니다. Vercel → Settings → Environment Variables에서 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY를 추가해주세요.",
    );
  }

  return createClient(url, key);
}

export function isSupabaseConfigured() {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && key);
}
