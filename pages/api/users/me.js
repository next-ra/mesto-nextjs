import User from '../../../models/user';
import connectDB from '../../../middleware/mongodb';

const handler = async (req, res) => {
  if (req.method === 'PATCH') {
    try {
      connectDB();
      const user = await User.findByIdAndUpdate(
        req.body.owner,
        {
          name: req.body.name,
          about: req.body.about,
        },
        { runValidators: true, new: true },
      );
      return res.status(200).json({
        message: 'Information has changed',
        user: user,
      });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || 'something_went_wrong' });
    }
  }
};

export default handler;
