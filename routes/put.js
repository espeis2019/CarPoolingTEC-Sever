const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");
const Pasajero = require("../model/Pasajero")
const Amigo = require("../model/Amigo")


/* ---------------------- Administrator ------------------------- */

route.put('/admin/:id', (req, res, next) => {
    if(!req.body.IdPasajero){
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        Administrador.update(
            {IdPasajero: req.body.IdPasajero},
            {where: {IdAdmin: req.params.id} }
        )
        .then(() => {
            res.json({ status: 'Resource Updated'})
        })
        .error(err => handleError(err))
    }
})

/* -------------------------- Editar Perfil --------------------------- */

route.put('/editarp/:id', (req, res, next) => {
    if(typeof(req.body.NOMBRE) != 'string' &&
       typeof(req.body.APELLIDO) != 'string' &&
       typeof(req.body.CORREO) != 'string' &&
       typeof(req.body.CONTRASENA) != 'string'){
           res.status(400)
           res.json({error: 'Bad Data'})
    } else {
        Pasajero.update(
            {
                NOMBRE: req.body.NOMBRE,
                APELLIDO: req.body.APELLIDO,
                CORREO: req.body.CORREO,
                CONTRASENA: req.body.CONTRASENA
            },
            {where: {IdPasajero: req.params.id} }
        )
        .then(() => {
            res.status(200).json({ message: 'Resource Updated'})
        })
        .error(err => handleError(err))
    }
})

/* ------------------- Aceptar o eliminar solicitud --------------------- */

route.put('/aoes', (req, res, next) => {
    if(typeof(req.body.IdAmigo) != 'number' &&
       typeof(req.body.opcion) != 'boolean'){
           res.status(400)
           res.json({error: 'Bad Data'})
    } else {
        if(req.body.opcion == true){
            Amigo.update(
                {
                    AMIGO: true
                },
                {where: {IdAmigo: req.body.IdAmigo} }
            )
            .then(() => {
                res.status(200).json({ message: 'Resource Updated'})
            })
            .error(err => handleError(err))
        } else {
            Amigo.destroy({
                where: {
                    IdAmigo: req.body.IdAmigo
                }
            })
            .then(() => {
                res.json({ status: 'Resource deleted'})
            })
            .catch(err => {
                res.send(err)
            })
        }
    }
})


module.exports = route;