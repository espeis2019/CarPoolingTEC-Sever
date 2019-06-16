const Sequelize = require("sequelize");
const db = {}

/*
const sequelize = new Sequelize('csx48i21toab0xq1', 'y1xcisaj0woc3gro', 'b30ur04542y26hws',{
   host: 'u0zbt18wwjva9e0v.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
*/
const sequelize = new Sequelize('CarpoolingTEC', 'admin', 'cristofer12ff',{
   host: 'localhost',

   dialect: 'mysql',
   operatorsAliases: false,

   pool: {
      max: 5,
      min: 0,
      acquiere: 30000,
      idle: 10000
   }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db



/*
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//database connection
const connection = new Sequelize("CarpoolingTEC", "admin", "cristofer12ff" , {
   host: "localhost",
   dialect: "mysql",
   operatorsAliases: Op
});

module.exports = connection;
*/
