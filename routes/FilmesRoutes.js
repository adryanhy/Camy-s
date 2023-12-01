const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checkLogin');

const FilmesController = require('../controllers/FilmesController');

router.get('/filmes', checkLogin, FilmesController.getAll);
router.get('/filmes/novo', checkLogin, FilmesController.novo);
router.post('/filmes/salvar', checkLogin, FilmesController.salvar);
router.get('/filmes/editar/:id', checkLogin, FilmesController.getOne);
router.post('/filmes/alterar', checkLogin, FilmesController.alterar);
router.get('/filmes/excluir/:id', checkLogin, FilmesController.excluir);

module.exports = router;