const jwt = require('jsonwebtoken');

let Sessions = require('../models/sessions');
const sessions = require('../models/sessions');

const middlewares = {
    userProtectUrl: function(req, res, next){

        const token = req.headers['access-token'];

        if(token){
            jwt.verify(token, '827ccb0eea8a706c4c34a16891f84e7b',(err,decoded)=>{
                if(err){
                    return res.status(403).json({message: "Token no valido"});
                }else{
                    req.decoded = decoded;
                    Sessions.findOne({user_id:req.decoded.user_id, jwt:token}).exec((err, session)=>{
                        if(err) return req.status(500).send({message: "Error al devolver los datos"});
                        
                        if(!session) return res.status(400).send({message:"Los datos de autenticacion no son validos"});
                        
                        next();
                    })

                    
                }
            });
        }else{
            res.status(403).send({
                message: "Token no valido."
            });
        }
    }
};

module.exports = middlewares