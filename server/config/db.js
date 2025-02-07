const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.DB_URL, {
    dialect: config.DB_DIALECT,
});

sequelize
    .authenticate()
    .then(() => console.log('✅ Database Connected'))
    .catch((err) => console.error('❌ Database Connection Error:', err));

module.exports = sequelize;
