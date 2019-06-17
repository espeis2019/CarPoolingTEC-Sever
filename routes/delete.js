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
        res.json({ status: 200})
    })
    .catch(err => {
        res.json({ status: 500})
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
        res.json({ status: 200})
    })
    .catch(err => {
        res.json({ status: 500})
    })
})

module.exports = route;