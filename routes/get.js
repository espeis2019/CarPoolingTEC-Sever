
const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");

route.get("/admin/all", (req, res, next) => {
    Administrador.findAll()
    .then(admins => {
        res.json(admins)
    })
    .catch(err => {
        res.send(err)
    })
});

route.get("/admin/:id", (req, res, next) => {
    Administrador.findAll()
    .then(admins => {
        res.json(admins)
    })
    .catch(err => {
        res.send(err)
    })
});

module.exports = route;