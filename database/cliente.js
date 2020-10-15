var mongoose = require("./connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var clienteSchema = new Schema({
  nombre : String,
  ci : String,
  telefono : Number,
  email : {
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
  password : {
    type: String,
    required: [true,"EL password es necesario"],
    min:[6,"EL password debe tener un minimo de 6 caracteres"],

},
  Fecha_Registro: {
      type: Date,
      default: Date.now()
  },
  tipo : String
});
var cliente = mongoose.model("Cliente", clienteSchema);
module.exports = cliente;
