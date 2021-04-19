import connectDB from '../../../middleware/mongodb';
import Card from '../../../models/card';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const { name, link } = req.body;

      res.status(201).json({ message: 'card created' });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message || 'something_went_wrong' });
    }
  }
};
export default handler;
