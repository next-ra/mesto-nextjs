import mongoose from 'mongoose';
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: (v) => isEmail(v),
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

mongoose.models = ['User'];

const User = mongoose.model('User', userSchema);

export default User;
