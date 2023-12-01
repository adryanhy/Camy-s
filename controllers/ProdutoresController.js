const Produtores = require('../models/produtor');

exports.getAll = (req, res) => {
    Produtores.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(produtores => {
        res.render('produtores/index', {produtores: produtores});
    })
}

exports.novo = (req, res) => {
    res.render('produtores/novo');
}

exports.salvar = (req, res) => {
    var nome = req.body.nome;

    Produtores.findOne({
        where: {
            nome : nome
        }
    }).then(produtor => {
        if(produtor == undefined)
        {
            Produtores.create({
                nome: nome
            }).then(() => {
                res.redirect('/produtores');
            })
        }
        else
        {
            res.redirect('/produtores');
        }
    })
}

exports.getOne = (req, res) => {
    var id = req.params.id;
    Produtores.findByPk(id).then(produtor => {
        res.render('produtores/editar', {produtor: produtor});
    });
}

exports.alterar = (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;

    Produtores.update({
        nome: nome
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/produtores');
    });
}

exports.excluir = (req, res) => {
    var id = req.params.id;

    Produtores.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/produtores');
    });
}
