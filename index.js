'use strict'

/* Para correrlo con nodemon se corre:
npm start */

//Const=constante
//body-parser sirve para leer el cuerpo de peticiones tipo post
//Express se le agregan capas con librerias para agregar funcionalidades
//nodemon sirve para actualizar las modificaciones al server sin tener que pararlo

/* Import express */
const express = require('express')

/*Import body-parser*/
const bodyParser = require('body-parser')

/* Instanciar una variable tipo express que funciona para inicializar el server */
const app = express()

/* Definición del puerto mediante variable de entorno o 3000 por defecto*/
const port = process.env.PORT || 3000 

/*  */
app.use(bodyParser.urlencoded({ extended: false}))
/* Para poder admitir peticiones en formato json */
app.use(bodyParser.json())

/* Escucha a la URI definida por una petición, :param es un parametro de entrada 
req = reques
res = response*/

/*app.get('/api/:param', (req, res) => {
    //Se manda un Json
    res.send({message:`Funciona ${req.params.param}!`})
})*/

app.get('/api/product', (req, res) => {
    res.status(200).send({products: ['la ni', 'la pinta', 'la santa maria']})
})

app.get('/api/product/:productID', (req, res) => {
    
})


app.post('/api/product', (req, res) => {
    console.log(req.body)
    res.status(200).send({message: 'se recibió la merca'})
})

app.put('/api/product/:productID', (req, res) => {
    
})

app.delete('/api/product/:productID', (req, res) => {
    
})


/* Inicializar el puerto y poner a correr el server
console.log sirve para hacer prints. ${variable} funciona para 
agregar variables a string*/

/* () => == function () */

app.listen(port, () => {
    console.log(`Está corriendo el server cabrón en Http://localhost:${port}`)
})
