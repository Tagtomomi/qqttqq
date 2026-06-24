interface SupabaseSetupNoticeProps {
  message: string;
}

export default function SupabaseSetupNotice({
  message,
}: SupabaseSetupNoticeProps) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
      <h2 className="font-semibold">데이터베이스 연결 오류</h2>
      <p className="mt-2">{message}</p>
      <div className="mt-4 space-y-2 rounded-lg bg-white/70 p-4 text-gray-700">
        <p className="font-medium text-gray-900">Vercel 설정 방법</p>
        <ol className="list-decimal space-y-1 pl-4">
          <li>Vercel 프로젝트 → Settings → Environment Variables</li>
          <li>
            <code className="text-xs">NEXT_PUBLIC_SUPABASE_URL</code> ={" "}
            <code className="text-xs">https://wjhntvcgubahhgdbylen.supabase.co</code>
          </li>
          <li>
            <code className="text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> = Supabase
            anon/publishable key
          </li>
          <li>URL 끝에 <code className="text-xs">/rest/v1/</code> 넣지 마세요</li>
          <li>저장 후 Redeploy</li>
        </ol>
        <p className="pt-2 text-xs text-gray-500">
          Supabase SQL Editor에서 <code>supabase/schema.sql</code>도 실행했는지
          확인해주세요.
        </p>
      </div>
    </div>
  );
}
