import mongoose from 'mongoose';

const connectDB = async (req, res) => {
  if (mongoose.connection.readyState >= 1) return;

  return await mongoose.connect(process.env.DB_CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

export default connectDB;
