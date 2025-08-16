import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local' });
import express, { Request, Response } from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

function ensureSslParam(url: string) {
  if (!/sslmode=/.test(url)) {
    return url + (url.includes('?') ? '&' : '?') + 'sslmode=require';
  }
  return url;
}

app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

app.get('/tasks', async (_req: Request, res: Response) => {
  try {
    const conn = "postgres://neondb_owner:npg_1ArJ8BDWCMwS@ep-summer-mode-a1o69vkx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
    if (!conn) return res.status(500).json({ error: 'NEON_DATABASE_URL not set' });
    const db = neon(ensureSslParam(conn));
    await db`create extension if not exists pgcrypto`;
    await db`create table if not exists tasks (
      id uuid primary key default gen_random_uuid(),
      title text not null,
      is_complete boolean not null default false,
      inserted_at timestamptz not null default now()
    )`;
    const rows = await db`select id, title, is_complete, inserted_at from tasks order by inserted_at desc`;
    res.json(rows);
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? 'Unknown error' });
  }
});

app.post('/tasks', async (req: Request, res: Response) => {
  try {
    const { title } = req.body ?? {};
    if (!title || typeof title !== 'string') return res.status(400).json({ error: 'Invalid title' });
    const conn = "postgres://neondb_owner:npg_1ArJ8BDWCMwS@ep-summer-mode-a1o69vkx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
    if (!conn) return res.status(500).json({ error: 'NEON_DATABASE_URL not set' });
    const db = neon(ensureSslParam(conn));
    await db`insert into tasks (title) values (${title})`;
    res.status(201).json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? 'Unknown error' });
  }
});

app.patch('/tasks', async (req: Request, res: Response) => {
  try {
    const { id, is_complete } = req.body ?? {};
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const conn = "postgres://neondb_owner:npg_1ArJ8BDWCMwS@ep-summer-mode-a1o69vkx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
    if (!conn) return res.status(500).json({ error: 'NEON_DATABASE_URL not set' });
    const db = neon(ensureSslParam(conn));
    await db`update tasks set is_complete = ${!!is_complete} where id = ${id}`;
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? 'Unknown error' });
  }
});

app.delete('/tasks', async (req: Request, res: Response) => {
  try {
    const { id } = req.body ?? {};
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const conn = "postgres://neondb_owner:npg_1ArJ8BDWCMwS@ep-summer-mode-a1o69vkx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
    if (!conn) return res.status(500).json({ error: 'NEON_DATABASE_URL not set' });
    const db = neon(ensureSslParam(conn));
    await db`delete from tasks where id = ${id}`;
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? 'Unknown error' });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
