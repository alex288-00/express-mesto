const routerUsers = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

// Функция чтения файла
function readJson(file) {
  return fs.readFile(file).then((text) => JSON.parse(text));
}

// Роутинг GET-запроса пользователей
routerUsers.get('/', (req, res) => {
  const fileSrc = path.join(__dirname, '../data/users.json');
  readJson(fileSrc)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Роутинг GET-запроса пользователя по йди
routerUsers.get('/:id', (req, res) => {
  const { id } = req.params;
  const fileSrc = path.join(__dirname, '../data/users.json');
  readJson(fileSrc)
    .then((users) => {
      const user = users.find((use) => use._id === id);
      if (!user) {
        res
          .status(404)
          .send({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = routerUsers;
