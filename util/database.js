const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'node',
    'root',
    'password',
    {
        dialect: "mysql",
        port: 6603,
        host: 'localhost'
    }
);

module.exports = sequelize
