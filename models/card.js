const mongoose = require('mongoose');
const { isURL } = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'обязательное поле'],
  },
  link: {
    type: String,
    required: [true, 'обязательное поле'],
    validate: {
      validator: (link) => isURL(link),
      message: 'Указана неверная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = ['Card'];

const Card = mongoose.model('Card', cardSchema);

export default Card;
