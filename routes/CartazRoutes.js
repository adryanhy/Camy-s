const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checkLogin');

const CartazController = require('../controllers/CartazController');

router.get('/cartaz', checkLogin, CartazController.getAll);

module.exports = router;