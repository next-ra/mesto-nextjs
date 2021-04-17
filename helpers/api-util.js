const serverUrl = 'https://nomoreparties.co/cohort6';

const api = {
  baseUrl: serverUrl,
  headers: {
    authorization: '3d370c1c-94fe-4e04-8eda-239688b6f9da',
    'Content-Type': 'application/json',
  },
};

export async function getAllCards() {
  const response = await fetch(`${api.baseUrl}/cards`, {
    headers: api.headers,
  });
  const data = await response.json();
  const cards = [];

  for (const key in data) {
    cards.push({
      ...data[key],
    });
  }
  return cards;
}