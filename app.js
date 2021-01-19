const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const urlencodedParser = bodyParser.urlencoded({ extended: true });
const { PORT = 3000 } = process.env;
const app = express();

// Подключаемся к Mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(urlencodedParser);

// Временное решение авторизации, захардкодили id
app.use((req, res, next) => {
  req.user = {
    _id: '6002fe1edd9edd2ecc23bafb',
  };
  next();
});

// Роутер для пользователей
app.use('/users', routerUsers);

// Роутер для карточек
app.use('/cards', routerCards);

// Роутер для ненайденной на сервере страницы
app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// Порт для нашего приложения
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
