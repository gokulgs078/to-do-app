export const runtime = 'edge';

import { neon } from '@neondatabase/serverless';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  let connectionString = "postgres://neondb_owner:npg_1ArJ8BDWCMwS@ep-summer-mode-a1o69vkx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
  if (!connectionString) {
    return json({ error: 'NEON_DATABASE_URL not set' }, 500);
  }

  // Ensure SSL for Neon connections
  if (!/sslmode=/.test(connectionString)) {
    connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=require';
  }

  const db = neon(connectionString);

  try {
    // Ensure schema exists (idempotent)
    await db`create extension if not exists pgcrypto`;
    await db`create table if not exists tasks (
      id uuid primary key default gen_random_uuid(),
      title text not null,
      is_complete boolean not null default false,
      inserted_at timestamptz not null default now()
    )`;
  } catch (e: any) {
    return json({ error: 'Bootstrap failed', details: e?.message }, 500);
  }

  try {
    switch (req.method) {
      case 'GET': {
        const rows = await db`select id, title, is_complete, inserted_at from tasks order by inserted_at desc`;
        return json(rows, 200);
      }
      case 'POST': {
        let body: any = {};
        try { body = await req.json(); } catch {}
        const { title } = body;
        if (!title || typeof title !== 'string') return json({ error: 'Invalid title' }, 400);
        await db`insert into tasks (title) values (${title})`;
        return json({ ok: true }, 201);
      }
      case 'PATCH': {
        let body: any = {};
        try { body = await req.json(); } catch {}
        const { id, is_complete } = body;
        if (!id) return json({ error: 'Missing id' }, 400);
        await db`update tasks set is_complete = ${!!is_complete} where id = ${id}`;
        return json({ ok: true }, 200);
      }
      case 'DELETE': {
        let body: any = {};
        try { body = await req.json(); } catch {}
        const { id } = body;
        if (!id) return json({ error: 'Missing id' }, 400);
        await db`delete from tasks where id = ${id}`;
        return json({ ok: true }, 200);
      }
      default:
        return json({ error: 'Method not allowed' }, 405);
    }
  } catch (e: any) {
    return json({ error: e?.message ?? 'Unknown error' }, 500);
  }
}

function json(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}
