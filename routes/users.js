const router = require('express').Router();
const { userValidation } = require('../middlewares/validation');
const {
  getUsers,
  getUsersById,
  getCurrentUser,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', userValidation, getUsers);
router.get('/users/me', userValidation, getCurrentUser);
router.get('/users/:userId', userValidation, getUsersById);
router.patch('/users/me', userValidation, updateUserInfo);
router.patch('/users/me/avatar', userValidation, updateAvatar);

module.exports = router;
