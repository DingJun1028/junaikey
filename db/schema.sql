-- Supabase 參考表結構（可選）
-- 建議以 SQL 變更管控（migrations）維護

create table if not exists matrix_records (
  id uuid primary key,
  commit_hash text not null,
  payload_hash text generated always as (commit_hash) stored, -- 可改為真正 payload hash
  "user" text,
  context text,
  created_at timestamptz not null default now(),
  entropy_level int,
  tags jsonb default '[]'::jsonb
);

create index if not exists idx_matrix_records_commit_hash on matrix_records (commit_hash);
create index if not exists idx_matrix_records_created_at on matrix_records (created_at);
create index if not exists idx_matrix_records_tags_gin on matrix_records using gin (tags jsonb_path_ops);