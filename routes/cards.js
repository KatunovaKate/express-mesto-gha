const router = require('express').Router();
const { cardValidation } = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', cardValidation, getCards);
router.post('/cards', cardValidation, createCard);
router.delete('/cards/:cardId', cardValidation, deleteCard);
router.put('/cards/:cardId/likes', cardValidation, likeCard);
router.delete('/cards/:cardId/likes', cardValidation, dislikeCard);

module.exports = router;
