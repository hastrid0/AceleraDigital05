const express = require('express');
const api = express.Router();
const {body} = require('express-validator');

//var welcomController = require('../controllers/welcome');
var alumnosController = require('../controllers/alumnosController');
let AuthController = require('../controllers/auth');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

//api.get("/", welcomController.welcome);
api.get("/alumnos", alumnosController.alumnos);
api.get("/alumno/:n_lista", alumnosController.alumno);
api.post("/alumno",userProtectUrl,[
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], alumnosController.crear_alumno);

api.put("/alumno/:n_lista", [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
],alumnosController.update_alumno);
api.delete("/alumno/:n_lista", alumnosController.delete_alumno);

api.post("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
],
AuthController.login);
api.post("/logout", userProtectUrl, AuthController.logout);

module.exports = api;