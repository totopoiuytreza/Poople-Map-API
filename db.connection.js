const dbConfig = require('./db.config.js');
const Sequelize = require('sequelize');

const connection = new Sequelize (dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
    },
    pool :{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    port: 5432
});

module.exports = {
    library: Sequelize,
    connection: connection
}

