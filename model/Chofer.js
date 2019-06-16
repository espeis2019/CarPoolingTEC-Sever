const Sequelize = require("sequelize");
const connection = require("../config/config.js");


//the model is used to make the columns on the database
//once you run the application server
const Chofer = connection.sequelize.define(
  'Chofer', 
  {
    IdChofer:{
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    IdPasajerof:{
      type: Sequelize.INTEGER,
    }
  },
    {
      timestamps: false
    }
  )

  //run the sync command in order to create the database table
  //Post.sync();
  //then need to remove it, to avoid setting up the table every time
module.exports = Chofer;