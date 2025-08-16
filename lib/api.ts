const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

export type Task = {
  id: string;
  title: string;
  is_complete: boolean;
  inserted_at: string;
};

function withBase(path: string) {
  if (!API_URL) throw new Error('Missing EXPO_PUBLIC_API_URL');
  return `${API_URL}${path}`;
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(withBase('/tasks'));
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(title: string): Promise<void> {
  const res = await fetch(withBase('/tasks'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Failed to create task');
}

export async function setTaskComplete(id: string, is_complete: boolean): Promise<void> {
  const res = await fetch(withBase('/tasks'), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, is_complete }),
  });
  if (!res.ok) throw new Error('Failed to update task');
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(withBase('/tasks'), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to delete task');
}
