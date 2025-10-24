// API utilities for DeFi testing platform
const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8181';

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed ${res.status}`);
  }
  const data = await res.json();
  // backend returns { success, data, message }
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data as T;
  }
  return data as T;
}

export const api = {
  // Add DeFi-related API methods here as needed
};
