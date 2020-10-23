//CREAR EL ESQUEMA ESTRUCTURA DE LA TABLA


var mongoose= require("./connect"); //conectar con el connect.js
var USERSCHEMA =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"EL nombre es necesario"]
        
    },
    lastname:{
        type:String,
        required:[true,"EL apellido es necesario"]
        
    },
    age:{
        type:String,
        required:[true,"La edad es necesario"]
        
    },
    email:{
        type: String,
        required:[true,"El email es necesario"],
        validate:{
            validator:(value)=>{
                var reg =new RegExp("[\w\.]+@[\w\.]+\.\w(3,3)","g");
                 /^[\w\.]+@[\w\.]+\.\w{3,3}$/.test(value);
                
            }
        },
        message: props =>`${props.value}no es valido `
    },
    password:{
        type: String,
        required: [true,"EL password es necesario"],
        max:[15,"EL password debe tener un maximo 15 caracteres"],

        min:[6,"EL password debe tener un minimo de 6 caracteres"],

        validate:{
            validator:(value)=>{
                var reg =new RegExp("/[A-Z](?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]","g");
                /[A-Z](?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$/g.test(value);
                
                
            }
        },
    
    },
    date:Date

});
var USER = mongoose.model("user",USERSCHEMA);
module.exports=USER;