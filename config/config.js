const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//database connection
const connection = new Sequelize("CarpoolingTEC", "admin", "cristofer12ff" , {
   host: "localhost",
   dialect: "mysql",
   operatorsAliases: Op
});

module.exports = connection;
