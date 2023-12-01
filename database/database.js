const Sequelize = require('sequelize');

const connection = new Sequelize(
    'mangas', // nome do banco
    'root', // usuário de acesso
    'Paimae123_', // senha
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;