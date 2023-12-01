const Diretores = require('../models/diretor');
const {fmDate} = require('../utilidades/utilidades');

exports.getAll = (req, res) => {
    Diretores.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(diretores => {
        res.render('diretores/index', {diretores: diretores});
    })
}

exports.novo = (req, res) => {
    res.render('diretores/novo');
}

exports.salvar = (req, res) => {
    var nome = req.body.nome;
    var nascimento = req.body.nascimento;
    var morte = req.body.morte;

    if(!morte)
    {
        morte = null;
    }

    Diretores.findOne({
        where: {
            nome : nome
        }
    }).then(diretor => {
        if(diretor == undefined)
        {
            Diretores.create({
                nome: nome,
                nascimento: nascimento,
                morte: morte
            }).then(() => {
                res.redirect('/diretores');
            })
        }
        else
        {
            res.redirect('/diretores');
        }
    })
}

exports.getdiretor = (req, res) => {
    var id = req.params.id;
    var nascimento;
    var morte = '';
    Diretores.findByPk(id).then(diretor => {
        nascimento = fmDate(diretor.nascimento);
        if(diretor.morte)
        {
            morte = fmDate(diretor.morte);
        }
        res.render('diretores/editar', {diretor: {id: id, nome: diretor.nome, nascimento: nascimento, morte: morte}});
    });
}

exports.alterar = (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var nascimento = req.body.nascimento;
    var morte = req.body.morte;

    Diretores.update({
        nome: nome,
        nascimento: nascimento,
        morte: morte
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/diretores');
    });
}

exports.excluir = (req, res) => {
    var id = req.params.id;

    Diretores.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/diretores');
    });
}
