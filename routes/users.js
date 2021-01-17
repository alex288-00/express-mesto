const routerUsers = require('express').Router();
const {
  getUsers,
  getUsersId,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// GET-запрос отображает всех пользователей
routerUsers.get('/', getUsers);

// GET-запрос отображает конкретного пользователя по id
routerUsers.get('/:userId', getUsersId);

// POST-запрос на создание нового пользователя
routerUsers.post('/', createUser);

// PATCH-запрос на обновление данных пользователя
routerUsers.patch('/me', updateProfile);

// PATCH-запрос на обновление аватара
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
