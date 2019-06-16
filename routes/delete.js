const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");
const Categoria = require("../model/Categoria")

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

/* ------------------------ Delete Categoria -------------------------- */

route.delete('/d_categoria', (req, res, next) => {
    Categoria.destroy({
        where: {
            NOMBRE: req.body.NOMBRE
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