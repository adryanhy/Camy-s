const Filmes = require('../models/filme');
const Diretores = require('../models/diretor');
const Generos = require('../models/genero');
const Produtor = require('../models/produtor');

exports.getAll = (req, res) => {
    Filmes.findAll({
        order: [
            ['titulo', 'ASC']
        ],
        include: [{
            model: Diretores
        }]
    }).then(Filmes => {
        res.render('filmes/index', {filmes: Filmes});
    })
}

exports.novo = (req, res) => {
    Diretores.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(Diretores => {
        Generos.findAll({
            order: [
                ['genero', 'ASC']
            ]
        }).then(Generos => {
            Produtor.findAll({
                order: [
                    ['nome', 'ASC']
                ]
            }).then(Produtores => {
                res.render('filmes/novo', {diretores: Diretores, generos: Generos, produtores: Produtores});
            })
        })
        
    });
    
}

exports.salvar = (req, res) => {
    var titulo = req.body.titulo;
    var diretoreId = req.body.diretoreId;
    var produtoreId = req.body.produtoreId;
    var generoId = req.body.generoId;

    Filmes.findOne({
        where: {
            titulo : titulo
        }
    }).then(filme => {
        if(filme == undefined)
        {
            Filmes.create({
                titulo: titulo,
                diretoreId: diretoreId,
                produtoreId: produtoreId,
                generoId: generoId
            }).then(() => {
                res.redirect('/filmes');
            })
        }
        else
        {
            res.redirect('/filmes');
        }
    })
}

exports.getOne = (req, res) => {
    var id = req.params.id;
    
    Filmes.findByPk(id).then(filme => {
        Diretores.findAll({
            order: [
                ['nome', 'ASC']
            ]
        }).then(Diretores => {
            Generos.findAll({
                order: [
                    ['genero', 'ASC']
                ]
            }).then(Generos => {
                Produtor.findAll({
                    order: [
                        ['nome', 'ASC']
                    ]
                }).then(Produtores => {
                    res.render('filmes/editar', {filme: filme, diretores: Diretores, generos: Generos, produtores: Produtores});
                });
            });
        });
    });
}

exports.alterar = (req, res) => {
    var id = req.body.id;
    var titulo = req.body.titulo;
    var diretoreId = req.body.diretoreId;
    var ProdutoreId = req.body.ProdutoreId;
    var generoId = req.body.generoId;

    Filmes.update({
        titulo: titulo,
        diretoreId: diretoreId,
        ProdutoreId: ProdutoreId,
        generoId: generoId
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/filmes');
    });
}

exports.excluir = (req, res) => {
    var id = req.params.id;

    Filmes.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/filmes');
    });
}
