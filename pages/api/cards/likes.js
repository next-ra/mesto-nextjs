import connectDB from '../../../middleware/mongodb';
import Card from '../../../models/card';

const handler = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      await connectDB();
      const { cardId, userId } = req.body;

      const cardToLike = await Card.findByIdAndUpdate(
        cardId,
        {
          $addToSet: { likes: userId },
        },
        { new: true },
      );
      return res.status(200).json({
        message: 'You like this card!',
        data: cardToLike,
      });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message || 'Something_went_wrong' });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await connectDB();
      const { cardId, userId } = req.body;

      const cardToLike = await Card.findByIdAndUpdate(
        cardId,
        {
          $pull: { likes: userId },
        },
        { new: true },
      );
      return res.status(200).json({
        message: 'You dislike a card!',
        data: cardToLike,
      });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message || 'Something_went_wrong' });
    }
  }
};
export default handler;
