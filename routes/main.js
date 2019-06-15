const express = require("express");
const route = express.Router();

route.get('/', (req, res, next) => {
    res.send("CarpoolingTEC-Server_")
})

module.exports = route;