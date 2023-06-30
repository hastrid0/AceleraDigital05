const express = require('express');
const api = express.Router();
const {body} = require('express-validator');

var usuariosController = require('../controllers/usuariosController');
let AuthController = require('../controllers/auth');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get("/usuarios", usuariosController.usuarios);
api.get("/usuario/:n_lista", usuariosController.usuario);
api.post("/usuario",userProtectUrl,[
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], usuariosController.crear_usuario);

api.put("/usuario/:n_lista", [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
],usuariosController.update_usuario);
api.delete("/usuario/:n_lista", usuariosController.delete_usuario);

api.post("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
],
AuthController.login);
api.post("/logout", userProtectUrl, AuthController.logout);

module.exports = api;