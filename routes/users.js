var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware')

/* Users Routes */

//Login
router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);

//Register
router.get('/register', usersController.register);
router.post('/register', usersController.processRegister);


module.exports = router;
