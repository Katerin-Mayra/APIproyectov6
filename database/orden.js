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
 
  lugar_envio: String,
  precios : Number,
  cantidad :Number,
  nombre :String,
  descripcion :String,
  menus:{
    type: String,
    default:"5f923511b8b401024a4924a1"
  },
  cliente: {
    type: String,
    ref: "cliente",
    default:"5f936fc13afe7401ab42a07f"
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

pago_total : Number,
correo:{
  type:String,
  default:"kat@gmail.com"
},
correoC:{
  type:String,
  default:"lui@gmail.com"
}  

});
var orden = mongoose.model("Orden", ordenSchema);
module.exports = orden;
