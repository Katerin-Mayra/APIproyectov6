var mongoose = require("./connect");//pedidos
//var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

var facturaSchema = new Schema({

  //Idmenus : {type: Schema.ObjectId, ref: "menus"},
  //Idrestaurant: {type: Schema.ObjectId, ref: "restaurant"},
  //Idcliente : {type: Schema.ObjectId, ref: "cliente"},
  
  lugar_envio: String,
  precios : Number,
  cantidad :Number,
  nombre :String,
  descripcion :String,
  
  cliente: {
    type: String,
    ref: "cliente",
    default:"5f936fc13afe7401ab42a07f"
    },
  Fecha_Registro:
    {
      type:Date,
      default: Date.now()

    },
pago_total : Number
});
var factura = mongoose.model("factura", facturaSchema);
module.exports = factura;
