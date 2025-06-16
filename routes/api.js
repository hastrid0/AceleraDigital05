const express = require('express');
const api = express.Router();
const { body, param } = require('express-validator');

const usuariosController = require('../controllers/usuariosController');
const AuthController = require('../controllers/auth');
const { userProtectUrl } = require('../middlewares/authUser');

// Obtener todos los usuarios
api.get("/usuarios", usuariosController.usuarios);

// Obtener usuario por número de lista (con validación de parámetro)
api.get("/usuario/:n_lista", [
    param('n_lista').isInt().withMessage('El número de lista debe ser un entero')
], usuariosController.usuario);

// Crear un nuevo usuario (requiere autenticación y validación)
api.post("/usuario", userProtectUrl, [
    body('n_cuenta').notEmpty().withMessage('El número de cuenta es obligatorio'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('edad').isInt({ min: 0 }).withMessage('Edad debe ser un número válido'),
    body('genero').notEmpty().withMessage('El género es obligatorio')
], usuariosController.crear_usuario);

// Actualizar usuario por número de lista (validaciones)
api.put("/usuario/:n_lista", [
    param('n_lista').isInt().withMessage('El número de lista debe ser un entero'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('edad').isInt({ min: 0 }).withMessage('Edad debe ser un número válido'),
    body('genero').notEmpty().withMessage('El género es obligatorio')
], usuariosController.update_usuario);

// Eliminar usuario por número de lista
api.delete("/usuario/:n_lista", [
    param('n_lista').isInt().withMessage('El número de lista debe ser un entero')
], usuariosController.delete_usuario);

// Login
api.post("/login", [
    body('mail').isEmail().withMessage('Email no válido'),
    body('pass').notEmpty().withMessage('La contraseña es obligatoria')
], AuthController.login);

// Logout (requiere autenticación)
api.post("/logout", userProtectUrl, AuthController.logout);

module.exports = api;
