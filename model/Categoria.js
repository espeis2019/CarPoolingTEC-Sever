const Sequelize = require("sequelize");
const connection = require("../config/config.js");


//the model is used to make the columns on the database
//once you run the application server
const Categoria = connection.sequelize.define(
  'Categorias', 
  {
    IdCategoria:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    NOMBRE:{
      type: Sequelize.STRING
    },
    PUNTOSPORVIAJE:{
      type: Sequelize.INTEGER
    },
    PUNTOSPORCATEGORIA:{
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
module.exports = Categoria;