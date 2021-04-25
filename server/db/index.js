const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/box_jumpers_db');

const initDB = () => {
  try {
    db.sync({ force: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { db, initDB };
