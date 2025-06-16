const { validationResult } = require('express-validator');
var Usuarios = require('../models/usuarios');
var pasword =3423;
//sendhelp
var controller = {
    usuarios: function(req,res){
        
        Usuarios.find({}).exec((err,usuarios)=>{
            if(err) return res.status(500).json({
                status:500,
                mensaje: err
            });
            if(!usuarios) return res.status(200).json({status:200, mensaje:"No existen usuarios"});
            return res.status(200).json({
                status:200,
                data: users
            });
        }); //las llaves solas traen todo
    },

    usuario: function(req,res){
        let n_lista = req.params.n_lista;
        Usuarios.findOne({n_cuenta: n_lista}).exec((err,usuario)=>{
            if(err) return res.status(500).json({
                status:500,
                mensaje: err
            });
            if(!usuario) return res.status(200).json({status:200, mensaje:"No se encontro el usuario"});
            return res.status(200).json({
                status:200,
                data: user
            });
        }); //las llaves solas traen todo
    },

    crear_usuario: function(req,res){
        //validar los datos enviados al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array});
        }
        let user_info = req.body;

        Usuarios.findOne({n_cuenta: user_info.n_cuenta}).exec((err,usuario)=>{
            if(err) return res.status(500).json({status:500,mensaje: err});
            if(usuario) return res.status(200).json({status:200, mensaje:"El numero de cuenta ya existe"});
            var usuarios_model = new Usuarios();

            usuarios_model.n_cuenta = user_info.n_cuenta;
            usuarios_model.nombre = user_info.nombre;
            usuarios_model.edad =user_info.edad;
            usuarios_model.genero= user_info.genero;

            usuarios_model.save((err,usuarioStored) => {
                if(err) return res.status(500).json({status:500,mensaje: err});
                if(!usuarioStored) return res.status(200).json({status:200, mensaje:"No se almaceno el usuario"});
                return res.status(200).json({
                    status:200,
                    message: "usuario almacenado"
                });
            })
    });
    },

    update_usuario:function(req,res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).jdon({errors:errors.array()});
        }
        let n_lista = req.params.n_lista;
        let user_info = req.body;

        let usuario_info_update = {
            nombre: user_info.nombre,
            edad: user_info.edad,
            genero: user_info.genero
        }

        Usuarios.findOneAndUpdate({n_cuenta:n_lista}, usuario_info_update, {new:false}, (err,usuarioUpdate)=> {
            if(err) return res.status(500).json({message: 'Error al actualizar'});
            if(!usuarioUpdate) return res.status(404).json({message: 'No existe el usuario.'})
            return res.status(200).json({
                nombre: usuarioUpdate.nombre,
                edad: usuarioUpdate.edad,
                genero: usuarioUpdate.genero
            })
        });
    },
    delete_usuario:function(req,res){
        let n_lista = req.params.n_lista;

        Usuarios.findByIdAndRemove({n_cuenta:n_lista},( err,usuarioDelete)=> {
            if(err) return res.status(500).json({message: 'Error al eliminar'});
            if(!usuarioDelete) return res.status(404).json({message: 'No existe el usuario.'});

            return res.status(200).json({
                message: "Usuario eliminado."
            })
        })
    }

};
module.exports = controller;