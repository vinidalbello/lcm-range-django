const API_BASE_URL = "http://localhost:8000/api";

export async function fetchLcm(x, y) {
  const params = new URLSearchParams({ x: String(x), y: String(y) });
  const response = await fetch(`${API_BASE_URL}/lcm/?${params}`);
  const data = await response.json();

  if (!response.ok) {
    const message = typeof data === "object" ? JSON.stringify(data) : data;
    throw new Error(message);
  }

  return data;
}
