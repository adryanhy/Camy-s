const Generos = require('../models/genero');

exports.getAll = (req, res) => {
    Generos.findAll({
        order: [
            ['genero', 'ASC']
        ]
    }).then(generos => {
        res.render('generos/index', {generos: generos});
    })
}

exports.novo = (req, res) => {
    res.render('generos/novo');
}

exports.salvar = (req, res) => {
    var genero = req.body.genero;

    Generos.findOne({
        where: {
            genero : genero
        }
    }).then(gen => {
        if(gen == undefined)
        {
            Generos.create({
                genero: genero
            }).then(() => {
                res.redirect('/generos');
            })
        }
        else
        {
            res.redirect('/generos');
        }
    })
}

exports.getOne = (req, res) => {
    var id = req.params.id;
    Generos.findByPk(id).then(genero => {
        res.render('generos/editar', {genero: genero});
    });
}

exports.alterar = (req, res) => {
    var id = req.body.id;
    var genero = req.body.genero;

    Generos.update({
        genero: genero
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/generos');
    });
}

exports.excluir = (req, res) => {
    var id = req.params.id;

    Generos.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/generos');
    });
}
