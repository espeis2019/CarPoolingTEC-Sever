

const express = require("express");
const bodyParser = require("body-parser");
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect();
const server = express();

chai.use(chaiHttp);

before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});

after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});
//(req, res, next) =>
/* asyn test */
describe('#Asynchronous administrador crud test', () => {
    it('get "administrador" record', (done) => {
        chai.request(server)
            .get("/api/admin/all")
            .end(function(err,res) {
                if(err) done(err);

                done();
                console.log('status code: %s, admins: %s',res.statusCode, res.body.length)
              });
    }).timeout(0);
  });
