
const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");



/* -----------------------Administrator -------------------------- */

// Get all administrators
route.get("/admin/all", (req, res, next) => {
    Administrador.findAll()
    .then(admins => {
        res.json(admins)
    })
    .catch(err => {
        res.send(err)
    })
});

//Get by IdAdmin
route.get("/admin/:id", (req, res, next) => {
    Administrador.findOne({
        where: {
            IdAdmin: req.params.id
        }
    })
    .then(admins => {
        if(admins){
            res.json(admins)
        } else {
            res.status(404).send({message : "The value doesn't exist"})
        }
    })
    .catch(err => {
        res.send(err)
    })
});


/* -------------------------------------------------------------- */

module.exports = route;