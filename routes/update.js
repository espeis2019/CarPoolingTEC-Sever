const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");

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



module.exports = route;