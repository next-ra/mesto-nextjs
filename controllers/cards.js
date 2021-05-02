import Card from '../models/card';
import connectDB from '../middleware/mongodb';

const createCard = async (name, link, owner) => {
  const response = await fetch(`/api/cards`, {
    method: 'POST',
    body: JSON.stringify({ name, link, owner }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something_went_wrong');
  }
  return data;
};

const getAllCards = async () => {
  const response = await fetch('http://localhost:3000/api/cards/');
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something_went_wrong');
  }
  return data;
};

const deleteCard = async (cardId) => {
  const response = await fetch(`/api/cards`, {
    method: 'DELETE',
    body: JSON.stringify({ cardId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something_went_wrong');
  } else return data;
};

const getUserCards = async () => {
  const response = await fetch(`/api/cards`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something_went_wrong');
  }
  return data;
};

const likeCard = async (cardId, userId) => {
  const response = await fetch(`/api/cards/likes`, {
    method: 'PUT',
    body: JSON.stringify({ cardId, userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something_went_wrong');
  } else return data;
};

const removeLike = async (cardId, userId) => {
  const response = await fetch(`/api/cards/likes`, {
    method: 'DELETE',
    body: JSON.stringify({ cardId, userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something_went_wrong');
  } else return data;
};

export {
  createCard,
  getAllCards,
  deleteCard,
  getUserCards,
  likeCard,
  removeLike,
};
