//CREAR EL ESQUEMA ESTRUCTURA DE LA TABLA DE RESTAURANTE


var mongoose= require("./connect"); //conectar con el connect.js
var RESTAURANTESCHEMA =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"EL nombre del restaurante es necesario"]
        
    },
    nit:{
        type:Number,
        required:[true,"Es necesario el NIT de su restaurante"]
        
    },
    propietario:{
        type:String,
        required:[true,"Es necesario el nombre del propietario "]
        
    },
    direccion:{
        type: String,
        required:[true,"La direccion es necesario"],
        
    },
    telefono:{
        type: Number,
         
        required:[true,"El numero es necesario"],

    },
    log:{
        type: String,
        required: [true,"EL log es necesario"],
    },
    lat:String,
    logo:String,
    date:Date,
    foto:String

});
var REST = mongoose.model("restaurante",RESTAURANTESCHEMA);
module.exports=REST;