// import connectDB from '../../../../middleware/mongodb';
// import User from '../../../../models/user';
// const handler = async (req, res) => {
//   try {
//     await connectDB();

//     const user = await User.findById(userID);
//     return res.status(200).json({
//       message: 'user_created',
//       user: user,
//     });
//   } catch (error) {
//     return res
//       .status(error.status || 500)
//       .json({ message: error.message || 'something_went_wrong' });
//   }
// };

// export default handler;
