const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");
const Pasajero = require("../model/Pasajero")
const Chofer = require("../model/Chofer")
const Auto = require("../model/Auto")
const Amigo = require("../model/Amigo")
const Categoria = require("../model/Categoria")
const Validacion = require("../model/Validacion")
const Parqueo = require("../model/Parqueo")
const Viaje = require("../model/Viaje")
const ParticipanteViaje = ("../model/ParticipanteViaje")

/* -----------------------Administrator -------------------------- */

//Create Administrator
route.post('/admin', (req, res, next) => {
    if(!req.body.IdPasajero){
        res.json({status: 400})
    }else{
        Administrador.create(req.body)
            .then((postCreated)=>{
            res.json({message: 201})
            }).catch((err)=>{
            res.json({status: 500})
        });
    }
})

/* ---------------------------- Ingresar ------------------------------- */

route.post('/ingresar/:t', (req, res, next) => {
    if(typeof(req.body.coc) != 'number' && typeof(req.body.pass) != 'string'){
        res.json({status: 400})
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
                    res.json({
                        IdPasajero: user.IdPasajero,
                        NOMBRE: user.NOMBRE,
                        APELLIDO: user.APELLIDO,
                        CORREO: user.CORREO,
                        CEDULA: user.CEDULA,
                        CARNET: user.CARNET
                    })
                } else {
                    res.json({status: 404})
                }
            })
            .catch(err => {
                res.json({status:500})
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
                    res.json({
                        IdPasajero: user.IdPasajero,
                        NOMBRE: user.NOMBRE,
                        APELLIDO: user.APELLIDO,
                        CORREO: user.CORREO,
                        CEDULA: user.CEDULA,
                        CARNET: user.CARNET
                    })
                } else {
                    res.json({status: 404})
                }
            })
            .catch(err => {
                res.json({status:500})
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
           res.json({status: 400})
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
                        res.json({status: 400})
                    }else{
                        res.json({status: 500})
                    }
            });
            } else {
                res.json({status: 404})
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
           res.json({status: 400})
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
                res.json(postCreated)
                }).catch((err)=>{
                res.json({message: 500})
            });
        })
    }
})

/* --------------------- Crear solicitud ------------------- */

route.post('/c_solicitud', (req, res, next) => {
    if(typeof(req.body.IdReceptor) != 'number' &&
       typeof(req.body.IdEmisor) != 'number'){
        res.json({status: 400})
    }else{
        Amigo.create(
            {
                IdReceptor: req.body.IdReceptor,
                IdEmisor: req.body.IdEmisor,
                AMIGO: false,
            })
            .then((postCreated)=>{
            res.json({status: 201})
            }).catch((err)=>{
            res.json({status: 500})
        });
    }
})

/* --------------------- Crear Categoria -------------------- */

route.post('/c_categoria', (req, res, next) => {
    if(typeof(req.body.NOMBRE) != 'string' &&
       typeof(req.body.PUNTOSPORVIAJE != 'number'&&
       typeof(req.body.VMINIMOSCATEGORIA) != 'number' &&
       typeof(req.body.VMAXIMOSCATEGORIA) != 'number')){
        res.json({status: 400})
    }else{
        Categoria.create(req.body)
            .then((postCreated)=>{
            res.json({status: 201})
            }).catch((err)=>{
            res.json({status: 500})
        });
    }
})

/* ---------------------- Crear Viaje --------------------------- */


//PENDING PARQUEO
route.post('/c_viaje', (req, res, next) => {
    if(typeof(req.body.AUTO) != 'number' &&
       typeof(req.body.CHOFER != 'number')){
        res.json({status: 400})
    }else{
        var IdAuto = req.body.AUTO
        Chofer.findOne({
            attributes: ["IdChofer"],
            where: {IdPasajerof: req.body.CHOFER}
        }).then(chofer => {

        console.log(chofer)
        var IdChofer = chofer.IdChofer
        var participantes = req.body.PARTICIPANTES

        Parqueo.findAll({
            where:{ACTIVO: true}
        }).then(Parqueos => {

            var IdParqueox = Parqueos[0].IdParqueo
            var d = new Date().getMonth();
            Viaje.create(
                {
                    IdChoferFV: IdChofer,
                    IdAutoFV: IdAuto,
                    IdParqueoFV: IdParqueox,
                    ACTIVO: false,
                    MES: d
                }
            ).then(viaje => {

                Parqueo.update(
                    {
                        ACTIVO: false
                    },
                    {where: {IdParqueo: IdParqueox} }
                ).then(x => {
                    var array = []
                    for(i=0; i<participantes.length; i++){
                        var r = Math.random().toString(36).substring(7);
                        array.push({
                            IdPasajeroFP: participantes[i],
                            IdViajeFP: viaje.IdViaje,
                            CODIGOVIAJE: r
                        })
                    }
                    ParticipanteViaje.bulkCreate(array)
                        .then((postCreated)=>{
                        res.json({status: 201})
                        }).catch((err)=>{
                        res.json({status: 500})
                    });
                })
            })            
        })
        })
    }
})



module.exports = route;