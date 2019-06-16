
const Sequelize = require("sequelize");
const connection = require("../config/config.js");


//the model is used to make the columns on the database
//once you run the application server
const Pasajero = connection.sequelize.define(
  'Pasajero', 
  {
    IdPasajero:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    CEDULA:{
      type: Sequelize.INTEGER
    },
    CARNET:{
        type:Sequelize.INTEGER
    },
    NOMBRE:{
        type:Sequelize.STRING
    },
    APELLIDO:{
        type:Sequelize.STRING
    },
    CORREO:{
        type:Sequelize.STRING
    },
    IdCategoria:{
        type:Sequelize.INTEGER
    },
    PUNTOS:{
        type:Sequelize.INTEGER
    },
    CONTRASENA:{
        type:Sequelize.STRING
    },
    ACTIVO:{
        type:Sequelize.BOOLEAN
    }
  },
    {
      timestamps: false
    }
  )

  //run the sync command in order to create the database table
  //Post.sync();
  //then need to remove it, to avoid setting up the table every time
module.exports = Pasajero;