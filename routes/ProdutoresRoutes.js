const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checkLogin');

const ProdutoresController = require('../controllers/ProdutoresController');

router.get('/produtores', checkLogin, ProdutoresController.getAll);
router.get('/produtores/novo', checkLogin, ProdutoresController.novo);
router.post('/produtores/salvar', checkLogin, ProdutoresController.salvar);
router.get('/produtores/editar/:id', checkLogin, ProdutoresController.getOne);
router.post('/produtores/alterar', checkLogin, ProdutoresController.alterar);
router.get('/produtores/excluir/:id', checkLogin, ProdutoresController.excluir);

module.exports = router;