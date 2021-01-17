const routerCards = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// GET-запрос отображает все карточки
routerCards.get('/', getCards);

// POST-запрос на создание новой карточки
routerCards.post('/', createCard);

// DELETE-запрос на удаление карточки
routerCards.delete('/:cardId', deleteCard);

// PUT-запрос на добавление лайка
routerCards.put('/:cardId/likes', likeCard);

// DELETE-запрос на удаление лайка
routerCards.delete('/:cardId/likes', dislikeCard);

module.exports = routerCards;
