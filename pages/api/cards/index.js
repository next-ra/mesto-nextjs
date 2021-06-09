import connectDB from '../../../middleware/mongodb';
import Card from '../../../models/card';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const { name, link, owner } = req.body;
      const card = await Card.create({ name, link, owner });
      return res.status(201).json({
        message: 'Карточка успешно добавлена!',
        data: card,
      });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message || 'Что-то пошло не так...' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await connectDB();
      const { cardId } = req.body;
      const card = await Card.findByIdAndRemove(cardId);
      return res.status(201).json({
        message: 'Карточка успешно удалена',
        data: card,
      });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message || 'Что-то пошло не так...' });
    }
  }

  if (req.method === 'GET') {
    try {
      await connectDB();

      const cards = await Card.find({}).orFail(
        new Error('Карточки не найдены'),
      );
      return res.status(200).json({
        message: 'all cards',
        data: cards,
      });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message || 'Что-то пошло не так...' });
    }
  }
};
export default handler;
