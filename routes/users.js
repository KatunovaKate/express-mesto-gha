const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUsersById,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUsersById);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateAvatar);
router.post('/users', createUser);

module.exports = router;
