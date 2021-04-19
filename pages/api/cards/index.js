import connectDB from '../../../middleware/mongodb';
import Card from '../../../models/card';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { name, link } = req.body;
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message || 'something_went_wrong' });
    }
  }
};
