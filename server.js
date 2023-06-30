const mongoose = require('mongoose');
const app = require('./app'); //en el mismo nivel del servidor se encuentra app
const port = 8080;

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://user:pass@localhost:27017/curso',{ useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connect('mongodb://localhost:27017/curso',{ useNewUrlParser:true, useUnifiedTopology:true})
        .then(() => {
            console.log("conexion exitosa a base de datos");

            //crear el servidor
            var server = app.listen(port, ()=> {
                console.log("Servidor ejecutando en "+port);
            });
        })
        .catch(err => console.log(err));

