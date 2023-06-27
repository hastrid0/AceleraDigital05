var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnosSchema = Schema(
    {
        nombre:{type: String, require:true},
        apellido:{type: String, require:true},
        n_cuenta: {type: Number, require:true, unique:true},
        edad:Number,
        genero:String,
        mail:{type: String, require:true},
        pass:{type: String, require:true}
    }
);

module.exports = mongoose.model('alumnos', AlumnosSchema);
