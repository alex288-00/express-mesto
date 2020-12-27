const express = require("express");
const routerUsers = require("./routes/users");
const routerCards = require("./routes/cards");
const { PORT = 3000 } = process.env;
const app = express();

//Роутер для пользователей
app.use("/users", routerUsers);

//Роутер для карточек
app.use("/cards", routerCards);

//Раздаем статику, фронтенд
app.use(express.static(__dirname + "/public"));

//Роутер для ненайденной на сервере страницы
app.use("/*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

//Порт для нашего приложения
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
