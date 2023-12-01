const Sequelize = require('sequelize');
const connection = require('../database/database');

const Diretor = require('./diretor');
const Genero = require('./genero');
const Produtor = require('./produtor');

const Filme = connection.define(
    'filmes',
    {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }
);

Filme.belongsTo(Diretor);
Filme.belongsTo(Produtor);
Filme.belongsTo(Genero);

//Filmes.sync({force: true});

module.exports = Filme;