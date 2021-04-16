import { hashPassword } from '../../helpers/auth';
import connectDB from '../../middleware/mongodb';
import User from '../../models/user';
const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(422).send('req_method_not_supported');
    return;
  }
  const { name, email, password } = req.body;
  //TODO: celebrate validation?
  // if (
  //   !email ||
  //   !email.includes('@') ||
  //   !name ||
  //   name.trim() === '' ||
  //   !password ||
  //   password.trim().length < 7
  // ) {
  //   return res.status(422).json({
  //     message: 'data_incomplete, password_minimum_length_is_7',
  //   });
  // }

  try {
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(409).json({ message: 'Email already exists!' });
    }
    const hashedPassword = await hashPassword(password);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: 'user_created',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'something_went_wrong' });
  }
};

export default connectDB(handler);
