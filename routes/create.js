const express = require("express");
const route = express.Router();

const Administrador = require("../model/Administrador");

/* -----------------------Administrator -------------------------- */

//Create Administrator
route.post('/admin', (req, res, next) => {
    if(!req.body.IdPasajero){
        res.status(400)
        res.json({error: 'Bad Data'})
    }else{
        Administrador.create(req.body)
            .then((postCreated)=>{
            res.status(201).json({message: postCreated})
            }).catch((err)=>{
            res.status(500).json({message: err})
        });
    }
})

/* -------------------------------------------------------------- */

module.exports = route;