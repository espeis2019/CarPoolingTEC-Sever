const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");
const Pasajero = require("../model/Pasajero")
const Amigo = require("../model/Amigo")
const Categoria = require("../model/Categoria")


/* ---------------------- Administrator ------------------------- */
/*
route.put('/u_admin/:id', (req, res, next) => {
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
*/
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

/* ------------------- Administrar puntos ---------------------- */

route.put('/admin_pts', (req, res, next) => {
    if(typeof(req.body.IdPasajero) != 'number' &&
       typeof(req.body.PUNTOS) != 'number' &&
       typeof(req.body.operacion) != 'number'){
        res.status(400)
        res.json({error: 'Bad Data'})
    }else{
        Pasajero.findOne({
            attributes: ["PUNTOS"],
            where: {IdPasajero: req.body.IdPasajero}
        }).then(pasajero => {
            
            if(req.body.operacion == 1){
                Pasajero.update(
                    {
                        PUNTOS: pasajero.PUNTOS + req.body.PUNTOS
                    },
                    {where: {IdPasajero: req.body.IdPasajero} }
                )
                .then(() => {
                    res.status(200).json({ message: 'Resource Updated'})
                })
                .error(err => handleError(err))
            } else {
                if(req.body.PUNTOS <= pasajero.PUNTOS){
                    Pasajero.update(
                        {
                            PUNTOS: pasajero.PUNTOS - req.body.PUNTOS
                        },
                        {where: {IdPasajero: req.body.IdPasajero} }
                    )
                    .then(() => {
                        res.status(200).json({ message: 'Resource Updated'})
                    })
                    .error(err => handleError(err))
                } else {
                    res.status(400).json({message: "Not enougth points"})
                }
            }
        }).catch(err => {
            res.status(500).send(err)
        })
    }
})


/* --------------------- Update Categoria -------------------- */

route.put('/u_categoria', (req, res, next) => {
    if(typeof(req.body.NOMBRE) != 'string' &&
       typeof(req.body.PUNTOSPORVIAJE != 'number'&&
       typeof(req.body.VMINIMOSCATEGORIA) != 'number' &&
       typeof(req.body.VMAXIMOSCATEGORIA) != 'number')){
        res.status(400)
        res.json({error: 'Bad Data'})
    }else{
        Categoria.update(
            {
                NOMBRE: req.body.NOMBRE,
                PUNTOSPORVIAJE: req.body.PUNTOSPORVIAJE,
                VMINIMOSCATEGORIA: req.body.VMINIMOSCATEGORIA,
                VMAXIMOSCATEGORIA: req.body.VMAXIMOSCATEGORIA
            },
            {where: {NOMBRE: req.body.NOMBRE} }
        )
        .then(() => {
            res.status(200).json({ message: 'Resource Updated'})
        })
        .error(err => handleError(err))
    }
})


/* ----------------------- Habilitar pasajero --------------------- */

route.put('/admin_pasajero', (req, res, next) => {
    if(typeof(req.body.IdPasajero) != 'number' &&
       typeof(req.body.ACTIVO != 'number')){
        res.status(400)
        res.json({error: 'Bad Data'})
    }else{
        Pasajero.update(
            {
                ACTIVO: req.body.ACTIVO
            },
            {where: {IdPasajero: req.body.IdPasajero} }
        )
        .then(() => {
            res.status(200).json({ message: 'Resource Updated'})
        })
        .error(err => handleError(err))
    }
})

module.exports = route;