const mongoose = require('mongoose');
const Card = require('../models/card');

// Поиск всех карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

// Создание карточки
module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Запрос неправильно сформирован' }));
};

// Удаление карточки
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('404');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'Запрос неправильно сформирован' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

// Ставим лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error('404');
    })
    .then((like) => res.send({ data: like }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'Запрос неправильно сформирован' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

// Удаляем лайк
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error('404');
    })
    .then((dislike) => res.send({ data: dislike }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'Запрос неправильно сформирован' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};
