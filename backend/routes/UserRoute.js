const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/Auth');


router.post('/create',userController.authUser);
router.post('/login',userController.Login)
router.post('/logout', auth ,userController.Logout)
router.post('/refresh', auth ,userController.FRefreshToken)

module.exports = router;