
const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");
const NombreSolicitud = require("../model/NomSolicitud");
const Pasajero = require("../model/Pasajero")
const Auto = require("../model/Auto")
const Categoria = require("../model/Categoria")
const PasajeroReduc = require("../model/PasajeroReduc")



/* -----------------------Administrator -------------------------- */

// Get all administrators
route.get("/admin/all", (req, res, next) => {
    Administrador.findAll()
    .then(admins => {
        res.json(admins)
    })
    .catch(err => {
        res.json({ status: 500})
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
            res.json({ status: 404})
        }
    })
    .catch(err => {
        res.json({ status: 500})
    })
});


/* ---------------------------- Lista Solicitudes ------------------------------ */

route.get("/listasolicitudes/:id", (req, res, next) => {
    NombreSolicitud.sequelize.query(`CALL sp_solicitudes(${req.params.id});`)
    .then(solicitud => {
        if(solicitud){
            res.json({solicitudes:solicitud})
        } else {
            res.json({ status: 404})
        }
    })
    .catch(err => {
        res.json({ status: 500})
    })
});

/* ----------------------------- Obtener Puntos y cat -------------------------------- */

route.get("/puntos/:id", (req, res, next) => {
    Pasajero.findOne({
        attributes: ["PUNTOS", "IdCategoria"],
        where: {IdPasajero: req.params.id}
    })
    .then(pasajero => {
        Categoria.findOne({
            attributes:["NOMBRE"],
            where: {IdCategoria: pasajero.IdCategoria}
        }).then(Cat => {
            res.json({PUNTOS: pasajero.PUNTOS, CATEGORIA: Cat.NOMBRE})
        })
        .catch(err => {
            res.json({ status: 500})
        })
    })
})

/* ----------------------------- Lista Amigos -------------------------------- */

route.get("/amigos/:id", (req, res, next) => {
    NombreSolicitud.sequelize.query(`CALL sp_amigos(${req.params.id});`)
    .then(amigo => {
        if(amigo){
            res.json({amigos:amigo})
        } else {
            res.json({ status: 404})
        }
    })
    .catch(err => {
        res.json({ status: 500})
    })
});

/* -------------------------------- Lista Autos ----------------------------- */


route.get("/autos/:id", (req, res, next) => {
    Auto.sequelize.query(`CALL sp_listaAutos(${req.params.id});`)
    .then(auto => {
        if(auto){
            res.json({ autos : auto})
        } else {
            res.json({ status: 404})
        }
    })
    .catch(err => {
        res.json({ status: 500})
    })
});

/* --------------- Lista pasajeros para solicitudes ------------------ */

route.get("/list_pasajeros/:txt", (req, res, next) => {
    PasajeroReduc.sequelize.query(`CALL sp_buscar(" ${req.params.txt});"`)
    .then(pasajero => {
        if(pasajero){
            res.json({pasajeros:pasajero})
        } else {
            res.json({ status: 404})
        }
    })
    .catch(err => {
        res.json({ status: 500})
    })
});

/* ---------------------------- Lista Categoria ---------------------------- */

route.get("/l_categoria", (req, res, next) => {
    Categoria.findAll()
    .then(admins => {
        res.json(admins)
    })
    .catch(err => {
        res.json({ status: 500})
    })
});



module.exports = route;