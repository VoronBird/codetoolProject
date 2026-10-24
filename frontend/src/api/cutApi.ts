const API_URL = "http://localhost:8000";

export interface Codecut {
  id: number;
  title: string;
  description: string | null;
  code: string;
}


function getToken(): string | null {
  return localStorage.getItem("access_token");
}


function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}


export async function getCodecuts(): Promise<Codecut[]> {
  const response = await fetch(`${API_URL}/codecuts`, {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Ошибка загрузки задач");
  return response.json();
}


export async function createCodecut(
  title: string,
  description?: string,
  code?: string
): Promise<Codecut> {
  const response = await fetch(`${API_URL}/codecuts`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, description: description || "" , code: code || ""}),
  });
  if (!response.ok) throw new Error("Ошибка создания сниппета");
  return response.json();
}


export async function deleteCodecut(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/codecuts/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Ошибка удаления сниппета");
}