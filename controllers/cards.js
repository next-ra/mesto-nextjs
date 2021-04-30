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
    throw new Error(data.message || 'something_went_wrong');
  }
  return data;
};

const getAllCards = async () => {
  await connectDB();
  const data = await Card.find({});
  if (!data) {
    return [];
  }
  const cards = JSON.parse(JSON.stringify(data));

  return cards;
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
    throw new Error(data.message || 'something_went_wrong');
  } else return data;
};

const getUserCards = async (ownerId) => {
  try {
    const cards = await Card.find({ owner: ownerId }).orFail(
      new NotFound(articleRes.notFound),
    );
    res.status(200).send({ data: cards });
  } catch (err) {
    console.log(err);
  }
};

export { createCard, getAllCards, deleteCard, getUserCards };
