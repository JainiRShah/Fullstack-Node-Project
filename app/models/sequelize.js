const dbConfig = require("../middlerwares/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user")(sequelize, Sequelize);
db.portfolio = require("../models/portfolio")(sequelize, Sequelize);
db.contact = require("../models/contact")(sequelize, Sequelize);
db.subscribe = require("../models/subscribe")(sequelize, Sequelize);
db.testimonial = require("../models/testimonial")(sequelize, Sequelize);

module.exports = db;