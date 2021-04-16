import mongoose from 'mongoose';

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connection.readyState >= 1) {
    return handler(req, res);
  }

  await mongoose.connect(process.env.DB_CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  });
  return handler(req, res);
};

export default connectDB;
