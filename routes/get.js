
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
            res.status(200).json({PUNTOS: pasajero.PUNTOS, CATEGORIA: Cat.NOMBRE})
        })
        .catch(err => {
            res.send(err)
        })
    })
})

/* ----------------------------- Lista Amigos -------------------------------- */

route.get("/amigos/:id", (req, res, next) => {
    NombreSolicitud.sequelize.query(`CALL sp_amigos(${req.params.id});`)
    .then(amigos => {
        if(amigos){
            res.json(amigos)
        } else {
            res.status(404).send({message : "The value doesn't exist"})
        }
    })
    .catch(err => {
        res.send(err)
    })
});

/* -------------------------------- Lista Autos ----------------------------- */


route.get("/autos/:id", (req, res, next) => {
    Auto.sequelize.query(`CALL sp_listaAutos(${req.params.id});`)
    .then(autos => {
        if(autos){
            res.json(autos)
        } else {
            res.status(404).send({message : "The value doesn't exist"})
        }
    })
    .catch(err => {
        res.send(err)
    })
});

/* --------------- Lista pasajeros para solicitudes ------------------ */

route.get("/list_pasajeros/:txt", (req, res, next) => {
    PasajeroReduc.sequelize.query(`CALL sp_buscar(${req.params.txt});`)
    .then(pasajeros => {
        if(pasajeros){
            res.json(pasajeros)
        } else {
            res.status(404).send({message : "The value doesn't exist"})
        }
    })
    .catch(err => {
        res.send(err)
    })
});


module.exports = route;