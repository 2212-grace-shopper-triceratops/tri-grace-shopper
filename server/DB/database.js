const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const config = require('config');
const database_url = process.env.DATABASE_URL;

console.log('Using database url ', database_url);

const db = new Sequelize(
  // loads the correct database url based on NODE_ENV (default / dev / test)
  database_url,
  {
    logging: false,
  }
);

module.exports = db;
