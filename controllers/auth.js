const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const Usuarios = require('../models/usuarioLogin');
const Sessions = require('../models/sessions');

var controller = {
    login: function(req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array});
        }
        let login_info = req.body;

        Usuarios.findOne({mail: login_info.mail, pass:login_info.pass}).exec((err,usuario)=>{
            if(err) return res.status(500).json({
                status:500,
                mensaje: err
            });
            if(!usuario) return res.status(200).json({status:200, mensaje:"Los datos no son validos"});
            
            const payload = {
                user_id : usuario.id
            };
            
            const access_token = jwt.sign(payload, '827ccb0eea8a706c4c34a16891f84e7b', {
                expiresIn:'1d'
            });

            let update = {
                user_id: user_id,
                jwt: access_token
            };

            Sessions.findByIdAndUpdate({user_id:user_id}, update, {upsert:true, new:true},(err, sessionsUpdate)=>{
                if(err) return res.status(500).send({message:err});
                
                if(!sessionsUpdate) return res.status(400).send({message: "Datos erroneos."});

                return res.status(200).json({
                    status:200,
                    message: "Autenticacion correcta",
                    token: access_token
                });
            } );

            
        });
    },

    logout: function(req,res){
        console.log(req.decoded);
        Sessions.findByIdAndRemove({user_id:req.decoded.user_id}, (err,sessionDeleted) =>{
            if(err) return res.status(500).send({message:err});
            if(!sessionDeleted) return res.status(404).send({message:"Datos erroneos"});

            return res.status(200).send({message: "Usuario salio correctamente"});
        })
    },

};
module.exports = controller;