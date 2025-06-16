var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//comentario2
var UsuariosSchema = Schema(
    {
        mail:{type: String, require:true, unique:true},
        pas:{type: String, require:true}
    }
);

module.exports = mongoose.model('usuarioPrincipal', UsuariosSchema);
