import connectDB from '../../middleware/mongodb';
import Card from '../../models/card';

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

export { createCard, getAllCards };
