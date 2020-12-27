const routerCards = require("express").Router();
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
routerCards.get("/", (req, res) => {
  const fileSrc = path.join(__dirname, "../data/cards.json");
  readJson(fileSrc)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = routerCards;
