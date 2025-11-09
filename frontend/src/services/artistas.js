const API_URL = "http://localhost:3001/artistas";

export async function getArtistas() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function getArtista(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

export async function createArtista(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function updateArtista(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function deleteArtista(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
