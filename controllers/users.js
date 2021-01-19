const mongoose = require('mongoose');
const User = require('../models/user');

// Поиск всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

// Поиск определенного пользователя по id
module.exports.getUsersId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('404');
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'Запрос неправильно сформирован' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

// Создание пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Запрос неправильно сформирован' }));
};

// Обновление профиля
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Запрос неправильно сформирован' }));
};

// Обновление аватара
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((ava) => res.send({ data: ava }))
    .catch(() => res.status(400).send({ message: 'Запрос неправильно сформирован' }));
};
