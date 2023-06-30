var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuariosSchema = Schema(
    {
        nombre:{type: String, require:true},
        apellido:{type: String, require:true},
        n_cuenta: {type: Number, require:true, unique:true},
        edad:Number,
        genero:String
    }
);

module.exports = mongoose.model('usuarios', UsuariosSchema);
