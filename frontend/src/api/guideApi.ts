const API_URL = "http://localhost:8000";

export interface Guide {
  id: number;
  title: string;
  description: string | null;
  syntax: string;
}



export async function getGuides(): Promise<Guide[]> {
  const response = await fetch(`${API_URL}/guides`, {
    method: "GET",
    headers:{"Content-Type": "application/json"}
  });
  if (!response.ok) throw new Error("Ошибка загрузки гайдов");
  return response.json();
}


export async function searchGuides(keyword:string): Promise<Guide[]> {
  const response = await fetch(`${API_URL}/guides/search?keyword=${encodeURIComponent(keyword)}`, {
    method: "POST"
  });
  if (!response.ok) throw new Error("Ошибка загрузки гайдов");
  return response.json();
}