const routerUsers = require("express").Router();
const fs = require("fs").promises;
const path = require("path");

//Функция чтения файла
function readJson(file) {
  return fs
    .readFile(file)
    .then((text) => {
      return JSON.parse(text);
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    });
}

//Роутинг GET-запроса
routerUsers.get("/", (req, res) => {
  const fileSrc = path.join(__dirname, "../data/users.json");
  readJson(fileSrc)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

routerUsers.get("/:id", (req, res) => {
  const { id } = req.params;
  const fileSrc = path.join(__dirname, "../data/users.json");
  readJson(fileSrc)
    .then((users) => {
      const user = users.find((user) => user._id === id);
      if (!user) {
        res
          .status(404)
          .send({ message: "Нет пользователя с таким id: " + `${id}` });
      }
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = routerUsers;
