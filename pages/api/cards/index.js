import connectDB from '../../../middleware/mongodb';
import Card from '../../../models/card';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      await connectDB();
      const { name, link, owner } = req.body;
      Card.create({ name, link, owner });
      return res.status(201).json({
        message: 'card created successfully!',
      });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message || 'something_went_wrong' });
    }
  }
};
export default handler;
