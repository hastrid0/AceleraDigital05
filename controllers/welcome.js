controller = {

    welcome: function(req, res){
        console.log("Get ejecutando en raiz");
        res.send("esto es un endpoint");
    },

    users: function(req,res){
        console.log("Get ejecutando en raiz");
        res.send("esto es un usuario");
    },
    updateUser: function(req,res){
        console.log("Get ejecutando en raiz");
        res.send("crear un usuario");
    },
    createUser: function(req,res){
        console.log("Get ejecutando en raiz");
        res.send("actualizar un usuario");
    },
    deleteUser: function(req,res){
        console.log("Get ejecutando en raiz");
        res.send("eliminar usuario");
    }
};

module.exports = controller;