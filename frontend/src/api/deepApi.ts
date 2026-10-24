const API_URL = "http://localhost:8000";


export interface Answer {
  text: string
}


export async function getAnswer(req:string): Promise<string>
{
    const response = await fetch(`${API_URL}/deep?req=${encodeURIComponent(req)}`, {method:'POST'});
  return response.json();
}