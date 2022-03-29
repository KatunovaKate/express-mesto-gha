const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        return res.status(404).send({ message: err.message });
      } return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const err = new Error('Карточка не найдена');
      err.name = 'not_found';
      throw err;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы неправильные данные' });
      }
      if (err.name === 'not_found') {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).orFail(() => {
    const err = new Error('id не найден');
    err.name = 'not_found';
    throw err;
  }).then((card) => res.send({ data: card })).catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы неправильные данные' });
    }
    if (err.name === 'not_found') {
      return res.status(404).send({ message: err.message });
    }
    return res.status(500).send({ message: 'Произошла ошибка' });
  });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).orFail(() => {
    const err = new Error('id не найден');
    err.name = 'not_found';
    throw err;
  }).then((card) => res.send({ data: card })).catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы неправильные данные' });
    }
    if (err.name === 'not_found') {
      return res.status(404).send({ message: err.message });
    }
    return res.status(500).send({ message: 'Произошла ошибка' });
  });
};
