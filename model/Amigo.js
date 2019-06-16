const Sequelize = require("sequelize");
const connection = require("../config/config.js");


//the model is used to make the columns on the database
//once you run the application server
const Amigo = connection.sequelize.define(
  'Amigo', 
  {
    IdReceptor:{
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    IdEmisor:{
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    AMIGO:{
      type: Sequelize.BOOLEAN
    },
    IdAmigo:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
    }
  },
    {
      timestamps: false
    }
  )

  //run the sync command in order to create the database table
  //Post.sync();
  //then need to remove it, to avoid setting up the table every time
module.exports = Amigo;