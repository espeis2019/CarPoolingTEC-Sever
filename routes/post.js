const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");
const Pasajero = require("../model/Pasajero")
const Chofer = require("../model/Chofer")
const Auto = require("../model/Auto")
const Amigo = require("../model/Amigo")
const Categoria = require("../model/Categoria")
const Validacion = require("../model/Validacion")

/* -----------------------Administrator -------------------------- */

//Create Administrator
route.post('/admin', (req, res, next) => {
    if(!req.body.IdPasajero){
        res.status(400)
        res.json({error: 'Bad Data'})
    }else{
        Administrador.create(req.body)
            .then((postCreated)=>{
            res.status(201).json({message: "created"})
            }).catch((err)=>{
            res.status(500).json({message: err})
        });
    }
})

/* ---------------------------- Ingresar ------------------------------- */

route.post('/ingresar/:t', (req, res, next) => {
    if(typeof(req.body.coc) != 'number' && typeof(req.body.pass) != 'string'){
        res.status(400)
        res.json({error: 'Bad Data'})
    } else {
        //Cedula
        if(req.params.t == "0"){
            Pasajero.findOne({
                where: {
                    CEDULA: req.body.coc,
                    CONTRASENA: req.body.CONTRASENA,
                    ACTIVO: true
                }
            })
            .then(user => {
                if(user){
                    res.status(200).json({
                        IdPasajero: user.IdPasajero,
                        NOMBRE: user.NOMBRE,
                        APELLIDO: user.APELLIDO,
                        CORREO: user.CORREO,
                        CEDULA: user.CEDULA,
                        CARNET: user.CARNET
                    })
                } else {
                    res.status(404).send({message: "Invalid"})
                }
            })
            .catch(err => {
                res.status(500).send(err)
            })
        }else{
            //carnet
            Pasajero.findOne({
                where: {
                    CARNET: req.body.coc,
                    CONTRASENA: req.body.CONTRASENA,
                    ACTIVO: true
                }
            })
            .then(user => {
                if(user){
                    res.status(200).json({
                        IdPasajero: user.IdPasajero,
                        NOMBRE: user.NOMBRE,
                        APELLIDO: user.APELLIDO,
                        CORREO: user.CORREO,
                        CEDULA: user.CEDULA,
                        CARNET: user.CARNET
                    })
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
    if(typeof(req.body.CEDULA) != 'number' &&
       typeof(req.body.CARNET) != 'number' &&
       typeof(req.body.NOMBRE) != 'string' &&
       typeof(req.body.APELLIDO) != 'string' &&
       typeof(req.body.CORREO) != 'string' &&
       typeof(req.body.CONTRASENA) != 'string'){
           res.status(400)
           res.json({error: 'Bad Data'})
    }else{
        Validacion.findOne({
            where: {
                CARNET: req.body.CARNET
            } 
        }).then(carnet => {
            if(carnet != null){
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
                res.json(postCreated)
                }).catch((err)=>{
                    if(err.message == "Validation error"){
                        res.json({message: 400})
                    }else{
                        res.json({message: 500})
                    }
            });
            } else {
                res.json({message: 404})
            }
        })
    }
})

/* ----------------------- Registrar Auto ---------------------- */


route.post('/r_auto/:id', (req, res, next) => {
    if(typeof(req.body.PLACA) != 'string' &&
       typeof(req.body.MARCA) != 'string' &&
       typeof(req.body.MODELO) != 'string' &&
       typeof(req.body.CAPACIDAD) != 'number'){
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
                res.status(201).json({message: "created"})
                }).catch((err)=>{
                res.status(500).json({message: err})
            });
        })
    }
})

/* --------------------- Crear solicitud ------------------- */

route.post('/c_solicitud', (req, res, next) => {
    if(typeof(req.body.IdReceptor) != 'number' &&
       typeof(req.body.IdEmisor) != 'number'){
        res.status(400)
        res.json({error: 'Bad Data'})
    }else{
        Amigo.create(
            {
                IdReceptor: req.body.IdReceptor,
                IdEmisor: req.body.IdEmisor,
                AMIGO: false,
            })
            .then((postCreated)=>{
            res.status(201).json({message: "created"})
            }).catch((err)=>{
            res.status(500).json({message: err})
        });
    }
})

/* --------------------- Crear Categoria -------------------- */

route.post('/c_categoria', (req, res, next) => {
    if(typeof(req.body.NOMBRE) != 'string' &&
       typeof(req.body.PUNTOSPORVIAJE != 'number'&&
       typeof(req.body.VMINIMOSCATEGORIA) != 'number' &&
       typeof(req.body.VMAXIMOSCATEGORIA) != 'number')){
        res.status(400)
        res.json({error: 'Bad Data'})
    }else{
        Categoria.create(req.body)
            .then((postCreated)=>{
            res.status(201).json({message: "created"})
            }).catch((err)=>{
            res.status(500).json({message: err})
        });
    }
})

/* ---------------------- Crear Viaje --------------------------- */


//PENDING PARQUEO
route.post('/c_viaje', (req, res, next) => {
    if(typeof(req.body.AUTO) != 'number' &&
       typeof(req.body.CHOFER != 'number')){
        res.status(400)
        res.json({error: 'Bad Data'})
    }else{
        var IdAuto = req.body.AUTO
        var IdPasajero =  Chofer.findOne({
            attributes: ["IdPasajero"],
            where: {IdChofer: req.body.CHOFER}
        })
        //var IdParqueo = 
        var participantes = req.body.PARTICIPANTES
        var arr = JSON.parse(participantes);
        for(var i = 0; i < arr.length; i++)
        {

        }
    }
})



module.exports = route;