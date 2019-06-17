'use stricts'

const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000/api/';


before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});

after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});


/* asyn test */
describe('#Asynchronous user CRUD test', () => {
    // -------------------- GET Tests: --------------------------------------
    //Test#1
    it('GET: "administrador" table: all admins', (done) => {
        chai.request(url)
            .get('admin/all')
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#2
    it('GET: "administrador" table: admin by id: 1', (done) => {
        chai.request(url)
            .get('admin/1')
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#3
    it('GET: "Amigos" table: friendship request by id: 1', (done) => {
        chai.request(url)
            .get('listasolicitudes/1')
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#4
    it('GET: "Pasajero y Categoria" tables: trip points and category by id', (done) => {
        chai.request(url)
            .get('puntos/1')
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#5
    it('GET: "Amigos" table: user friendship by id ', (done) => {
        chai.request(url)
            .get('amigos/1')
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#6
    it('GET: "Autos" table: user cars list by id ', (done) => {
        chai.request(url)
            .get('autos/1')
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#7
    it('GET: "Amistad" table: friendship request list by id of user ', (done) => {
        chai.request(url)
            .get('list_pasajeros/"Juan"')
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#8
    it('GET: "Categoria" table: categories list', (done) => {
        chai.request(url)
            .get('l_categoria')
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#9
    it('GET: "Categoria" table: categories list', (done) => {
        chai.request(url)
            .get('l_categoria')
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //-------------------- POST Tests: --------------------------------------
    //Test#10
    it('POST: "Administrador" table: create admin', (done) => {
        chai.request(url)
            .post('admin')
            .send({"IdPasajero":1})
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#11
    it('POST: "Pasajero" table: login and validation', (done) => {
        chai.request(url)
            .post('ingresar/1')
            .send({"coc":2016081117,
                  "CONTRASENA": "Nano13"})
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#12
    it('POST: "Pasajero" table: register new user', (done) => {
        chai.request(url)
            .post('registrar')
            .send({"CEDULA": 62730486,
	                 "CARNET": 1994048657,
	                 "NOMBRE": "Angela",
	                 "APELLIDO": "Fernandez",
	                 "CORREO": "angelafd33@gmail.com",
	                 "CONTRASENA": "joel"})
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#13
    it('POST: "Auto" table: register new car', (done) => {
        chai.request(url)
            .post('r_auto/1')
            .send({"PLACA":"CFF-277",
	                 "MARCA":"TESLA",
	                 "MODELO":"ROASTER",
	                 "CAPACIDAD":2})
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#14
    it('POST: "Amigos" table: create friendship request', (done) => {
        chai.request(url)
            .post('c_solicitud')
            .send({"IdReceptor": 1,
	                 "IdEmisor": 2})
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#15
    it('POST: "Categoria" table: create new category', (done) => {
        chai.request(url)
            .post('c_categoria')
            .send({"NOMBRE": "Vibranio",
                  "PUNTOSPORVIAJE": 2,
                  "VMINIMOSCATEGORIA": 3,
                  "VMAXIMOSCATEGORIA": 4})
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);
    //Test#16
    it('POST: "Viaje" table: create new trip', (done) => {
        chai.request(url)
            .post('c_viaje')
            .send({"AUTO":1,
                  "CHOFER":1,
                  "PARTICIPANTES":[1,2,3]})
            .end(function(err,res) {
              console.log(bodyParser(res));
              console.log("Exito!");
              done();
            });
    }).timeout(0);

});
