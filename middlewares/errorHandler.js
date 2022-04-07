const { isCelebrateError } = require('celebrate');

module.exports.errorHandler = (err, req, res, next) => {
  console.log(err.stack || err);
  const status = err.statusCode || 500;

  if (isCelebrateError(err)) {
    const [error] = err.details.values();
    return res.status(400).send({ message: error.message });
  }

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы неправильные данные' });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(401).send({ message: 'Доступ запрещен' });
  }

  if (err.name === 'ReferenceError') {
    return res.status(404).send({ message: err.message });
  }

  res.status(status).send({
    message: err.message,
    err,
  });
  return next();
};
