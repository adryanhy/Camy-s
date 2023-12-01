const Sequelize = require('sequelize');
const connection = require('../database/database');

const Produtor = connection.define(
    'produtores',
    {
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

//Produtor.sync({force: true});

module.exports = Produtor;