const Sequelize = require('sequelize');
const connection = require('../database/database');

const Diretor = connection.define(
    'diretores',
    {
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nascimento: {
            type: Sequelize.DATE,
            allowNull: false
        },
        morte: {
            type: Sequelize.DATE
        }
    }
);

//Diretor.sync({force: true});

module.exports = Diretor;