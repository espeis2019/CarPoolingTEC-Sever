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
        res.json({ status: 400})
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
            res.json({ status: 200})
        })
        .error(err => handleError(err))
    }
})

/* ------------------- Aceptar o eliminar solicitud --------------------- */

route.put('/aoes', (req, res, next) => {
    if(typeof(req.body.IdAmigo) != 'number' &&
       typeof(req.body.opcion) != 'boolean'){
        res.json({ status: 400})
    } else {
        if(req.body.opcion == true){
            Amigo.update(
                {
                    AMIGO: true
                },
                {where: {IdAmigo: req.body.IdAmigo} }
            )
            .then(() => {
                res.json({ status: 200})
            })
            .error(err => handleError(err))
        } else {
            Amigo.destroy({
                where: {
                    IdAmigo: req.body.IdAmigo
                }
            })
            .then(() => {
                res.json({ status: 200})
            })
            .catch(err => {
                res.json({ status: 500})
            })
        }
    }
})

/* ------------------- Administrar puntos ---------------------- */

route.put('/admin_pts', (req, res, next) => {
    if(typeof(req.body.IdPasajero) != 'number' &&
       typeof(req.body.PUNTOS) != 'number' &&
       typeof(req.body.operacion) != 'number'){
        res.json({ status: 400})
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
                    res.json({ status: 200})
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
                        res.json({ status: 200})
                    })
                    .error(err => handleError(err))
                } else {
                    res.json({ status: 400})
                }
            }
        }).catch(err => {
            res.json({ status: 500})
        })
    }
})


/* --------------------- Update Categoria -------------------- */

route.put('/u_categoria', (req, res, next) => {
    if(typeof(req.body.NOMBRE) != 'string' &&
       typeof(req.body.PUNTOSPORVIAJE != 'number'&&
       typeof(req.body.VMINIMOSCATEGORIA) != 'number' &&
       typeof(req.body.VMAXIMOSCATEGORIA) != 'number')){
        res.json({ status: 400})
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
            res.json({ status: 200})
        })
        .error(err => handleError(err))
    }
})


/* ----------------------- Habilitar pasajero --------------------- */

route.put('/admin_pasajero', (req, res, next) => {
    if(typeof(req.body.IdPasajero) != 'number' &&
       typeof(req.body.ACTIVO != 'number')){
        res.json({status: 400})
    }else{
        Pasajero.update(
            {
                ACTIVO: req.body.ACTIVO
            },
            {where: {IdPasajero: req.body.IdPasajero} }
        )
        .then(() => {
            res.json({ status: 200})
        })
        .error(err => handleError(err))
    }
})

module.exports = route;