var mongoose = require("./connect");//pedidos
//var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

var ordenSchema = new Schema({

  //Idmenus : {type: Schema.ObjectId, ref: "menus"},
  //Idrestaurant: {type: Schema.ObjectId, ref: "restaurant"},
  //Idcliente : {type: Schema.ObjectId, ref: "cliente"},
  

  restaurant:{
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  },
  menus:{
    type: String,
    ref: "Menus"
  },
  lugar_envio: String,
  precios : Number,
  cantidad :Number,
  nombre :String,
  descripcion :String,
  cliente: {
    type: String,
    default:"5f91fbc7b5000900cedb06d0"
    },
  estado:{
    type: String, 
    default:"espera"

  },
  Fecha_Registro:
    {
      type:Date,
      default: Date.now()

    },

pago_total : Number
});
var orden = mongoose.model("Orden", ordenSchema);
module.exports = orden;
