const express = require('express');
const router = express.Router();
const blogController = require('../controllers/BlogController');
const auth = require('../middleware/Auth');


router.post('/create',auth,blogController.authUser);


module.exports = router;