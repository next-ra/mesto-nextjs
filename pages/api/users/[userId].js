import User from '../../../models/user';
import connectDB from '../../../middleware/mongodb';

async function handler(req, res) {
  const userId = req.query.userId;

  if (req.method === 'PATCH') {
    try {
      await connectDB();

      let updateData = await {
        ...req.body,
      };
      console.log(updateData, 'UPDATE_DATA');
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        runValidators: true,
        new: true,
      }).orFail(new Error('user not found'));

      return res.status(200).json({
        message: 'User updated',
        user: updatedUser,
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
