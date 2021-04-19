import mongoose from 'mongoose';
const { isEmail, isURL } = require('validator');

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
    message: 'Указана невалидная почта',
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 240,
    default: 'Пират, капитан черной жемчужины',
  },
  avatar: {
    type: String,
    validate: {
      validator: (link) => isURL(link),
      message: 'неверная ссылка на аватар',
    },
    default:
      'https://i.pinimg.com/564x/97/2e/1d/972e1de68b28f5d9ad5b9edefb429800.jpg',
  },
});

mongoose.models = ['User'];

const User = mongoose.model('User', userSchema);

export default User;
