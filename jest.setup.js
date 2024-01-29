require('dotenv').config({ path: './config/.env' });

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

sequelize.sync();

module.exports = sequelize;
