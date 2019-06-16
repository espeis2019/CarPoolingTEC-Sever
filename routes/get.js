
const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");
const NombreSolicitud = require("../model/nomSolicitud")



/* -----------------------Administrator -------------------------- */

// Get all administrators
route.get("/admin/all", (req, res, next) => {
    Administrador.findAll()
    .then(admins => {
        res.json(admins)
    })
    .catch(err => {
        res.send(err)
    })
});

//Get by IdAdmin
route.get("/admin/:id", (req, res, next) => {
    Administrador.findOne({
        where: {
            IdAdmin: req.params.id
        }
    })
    .then(admins => {
        if(admins){
            res.json(admins)
        } else {
            res.status(404).send({message : "The value doesn't exist"})
        }
    })
    .catch(err => {
        res.send(err)
    })
});


/* ---------------------------- Lista Solicitudes ------------------------------ */

route.get("/listasolicitudes/:id", (req, res, next) => {
    NombreSolicitud.sequelize.query(`CALL sp_solicitudes(${req.params.id});`)
    .then(solicitudes => {
        if(solicitudes){
            res.json(solicitudes)
        } else {
            res.status(404).send({message : "The value doesn't exist"})
        }
    })
    .catch(err => {
        res.send(err)
    })
});




module.exports = route;