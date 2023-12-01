const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checkLogin');

const DiretoresController = require('../controllers/DiretoresController');

router.get('/diretores', checkLogin, DiretoresController.getAll);
router.get('/diretores/novo', checkLogin, DiretoresController.novo);
router.post('/diretores/salvar', checkLogin, DiretoresController.salvar);
router.get('/diretores/editar/:id', checkLogin, DiretoresController.getdiretor);
router.post('/diretores/alterar', checkLogin, DiretoresController.alterar);
router.get('/diretores/excluir/:id', checkLogin, DiretoresController.excluir);

module.exports = router;