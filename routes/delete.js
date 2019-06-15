const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");

/* ---------------------- Administrator ------------------------- */

route.delete('/admin/:id', (req, res, next) => {
    Administrador.destroy({
        where: {
            IdAdmin: req.params.id
        }
    })
    .then(() => {
        res.json({ status: 'Resource deleted'})
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = route;