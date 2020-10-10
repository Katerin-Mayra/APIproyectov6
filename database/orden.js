var mongoose = require("./connect");//pedidos
//var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

var ordenSchema = new Schema({

  //Idmenus : {type: Schema.ObjectId, ref: "menus"},
  //Idrestaurant: {type: Schema.ObjectId, ref: "restaurant"},
  //Idcliente : {type: Schema.ObjectId, ref: "cliente"},
  cliente: {
  type: Schema.Types.ObjectId,
  ref: "Cliente"
  },

  restaurant:{
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  },
  menus : {
    type: Schema.Types.ObjectId,
    ref: "Menus"
  },
  lugar_envio: Number,
  precios : Number,
  cantidad :Number,
  Fecha_Registro:
    {
      type:Date,
      default: Date.now()

    },

pago_total : Number,
});
var orden = mongoose.model("Orden", ordenSchema);
module.exports = orden;
