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
    property:{
        type:String,
        required:[true,"Es necesario el nombre del propietario "]
        
    },
    street:{
        type: String,
        required:[true,"La direccion es necesario"],
        
    },
    phone:{
        type: Number,
         
        required:[true,"El numero es necesario"],

    },
    
    log:{
        type: String,
        required: [true,"EL log K es necesario"],
        default: "111111111",
    },
    lat:{
        type: String,
        required: [true,"EL log es necesario"],
        default: "111111111",
    },
    logo:String,
    registerdate:Date,
    
    picture:{
        type: String, 
        default: "No IMAGE",
        required: [true, "la ruta de la imagen es necesaria"]
    }

});
var REST = mongoose.model("restaurante",RESTAURANTESCHEMA);
module.exports=REST;