const API_URL = "http://localhost:8000";

interface RegisterData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}

interface UserResponse {
  id: number;
  email: string;
  is_active: boolean;
  role: string;
}

// Регистрация
export async function register(data: RegisterData): Promise<UserResponse> {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Ошибка регистрации");
  }
  return response.json();
}

// Вход — возвращает токен
export async function login(data: LoginData): Promise<TokenResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Ошибка входа");
  }
  return response.json();
}