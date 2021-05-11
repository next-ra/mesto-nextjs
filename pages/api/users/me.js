import User from '../../../models/user';
import connectDB from '../../../middleware/mongodb';
import { getSession } from 'next-auth/client';

const handler = async (req, res) => {
  if (req.method === 'PATCH') {
    // console.log(req.body, 'user update');
    try {
      await connectDB;

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
  if (req.method === 'GET') {
    try {
      const session = async (req, res) => {
        const session = await getSession({ req });

        return session;
      };
      await console.log(session, 'session');
      await connectDB;

      const user = await User.findById();
      return res.status(200).json({
        message: 'success',
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
