const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checkLogin');

const GenerosController = require('../controllers/GenerosController');

router.get('/generos', checkLogin, GenerosController.getAll);
router.get('/generos/novo', checkLogin, GenerosController.novo);
router.post('/generos/salvar', checkLogin, GenerosController.salvar);
router.get('/generos/editar/:id', checkLogin, GenerosController.getOne);
router.post('/generos/alterar', checkLogin, GenerosController.alterar);
router.get('/generos/excluir/:id', checkLogin, GenerosController.excluir);

module.exports = router;