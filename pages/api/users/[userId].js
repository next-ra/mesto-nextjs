import User from '../../../models/user';
import connectDB from '../../../middleware/mongodb';

async function handler(req, res) {
  const userId = req.query.userId;
  console.log(userId);
  console.log(req.body);
  if (req.method === 'PATCH') {
    try {
      await connectDB();

      const user = await User.findByIdAndUpdate(
        userId,
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

  try {
    const user = await User.findById(userId).orFail(
      new Error('User not found!!!'),
    );
    res.status(200).json({ message: 'hello', data: user });
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message || 'something_went_wrong' });
    console.log(error);
  }
}
export default handler;
