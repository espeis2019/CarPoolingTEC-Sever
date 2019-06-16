const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");
const Pasajero = require("../model/Pasajero")
const Chofer = require("../model/Chofer")
const Auto = require("../model/Auto")

/* -----------------------Administrator -------------------------- */

//Create Administrator
route.post('/admin', (req, res, next) => {
    if(!req.body.IdPasajero){
        res.status(400)
        res.json({error: 'Bad Data'})
    }else{
        Administrador.create(req.body)
            .then((postCreated)=>{
            res.status(201).json({message: postCreated})
            }).catch((err)=>{
            res.status(500).json({message: err})
        });
    }
})

/* ---------------------------- Ingresar ------------------------------- */

route.post('/ingresar/:t', (req, res, next) => {
    if(typeof(req.body.coc) != 'integer' && typeof(req.body.pass) != 'string'){
        res.status(400)
        res.json({error: 'Bad Data'})
    } else {
        //Cedula
        if(req.params.t == "0"){
            Pasajero.findOne({
                where: {
                    CEDULA: req.body.coc,
                    CONTRASENA: req.body.pass,
                    ACTIVO: true
                }
            })
            .then(user => {
                if(user){
                    res.status(200).send({message: "Valid"})
                } else {
                    res.status(404).send({message: "Invalid"})
                }
            })
            .catch(err => {
                res.send(err)
            })
        }else{
            //carnet
            Pasajero.findOne({
                where: {
                    CARNET: req.body.coc,
                    CONTRASENA: req.body.pass,
                    ACTIVO: true
                }
            })
            .then(user => {
                if(user){
                    res.status(200).send({message: "Valid"})
                } else {
                    res.status(404).send({message: "Invalid"})
                }
            })
            .catch(err => {
                res.send(err)
            })
        }
    }
})

/* ------------------------- Registrar ------------------------ */

route.post('/registrar', (req, res, next) => {
    if(typeof(req.body.CEDULA) != 'integer' &&
       typeof(req.body.CARNET) != 'integer' &&
       typeof(req.body.NOMBRE) != 'string' &&
       typeof(req.body.APELLIDO) != 'string' &&
       typeof(req.body.CORREO) != 'string' &&
       typeof(req.body.CONTRASENA) != 'string'){
           res.status(400)
           res.json({error: 'Bad Data'})
    }else{
        Pasajero.create({
            CEDULA: req.body.CEDULA,
            CARNET: req.body.CARNET,
            NOMBRE: req.body.NOMBRE,
            APELLIDO: req.body.APELLIDO,
            CORREO: req.body.CORREO,
            IdCategoria: 1,
            PUNTOS: 0,
            CONTRASENA: req.body.CONTRASENA,
            ACTIVO: 1
        })
            .then((postCreated)=>{
            res.status(201).json({message: postCreated})
            }).catch((err)=>{
            res.status(500).json({message: err})
        });
    }
})

/* ----------------------- Registrar Auto ---------------------- */


//Modify
route.post('/r_auto/:id', (req, res, next) => {
    if(typeof(req.body.PLACA) != 'string' &&
       typeof(req.body.MARCA) != 'string' &&
       typeof(req.body.MODELO) != 'string' &&
       typeof(req.body.CAPACIDAD) != 'integer'){
           res.status(400)
           res.json({error: 'Bad Data'})
    }else{
        Chofer.findOne({
            attributes: ["IdChofer"],
            where: {IdPasajerof: req.params.id}
        }).then(chofer =>{
            Auto.create({
                PLACA: req.body.PLACA,
                MARCA: req.body.MARCA,
                MODELO: req.body.MODELO,
                CAPACIDAD: req.body.CAPACIDAD,
                IdChofer: chofer.IdChofer
            })
                .then((postCreated)=>{
                res.status(201).json({message: postCreated})
                }).catch((err)=>{
                res.status(500).json({message: err})
            });
        })
    }
})



module.exports = route;