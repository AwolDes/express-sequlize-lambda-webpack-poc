const Sequelize = require('sequelize');
const pg = require('pg');
const config = require('../config/config');
const { applyExtraSetup } = require('./setup');

const sequelize = new Sequelize(
  {
    ...config[process.env.NODE_ENV],
    dialect: 'postgres',
    loadDialectModule: pg,
  },
);

// This ensures models get bundled with webpack https://github.com/sequelize/express-example/issues/74#issuecomment-434054029
const context = require.context('.', true, /^\.\/(?!index|setup\.js).*\.js$/, 'sync');

context.keys().map(context).forEach((module) => {
  module(sequelize);
});

applyExtraSetup(sequelize);

// ONLY IN DEV - it wipes the DB
// if (process.env.NODE_ENV !== 'prod' && true) {
//   sequelize.sync({ force: true, logging: console.log }).then(() => console.log('re-synced DB'));
// }

module.exports = { sequelize, models: sequelize.models };
