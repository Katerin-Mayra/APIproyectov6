var mongoose = require("./connect");
var Schema = mongoose.Schema;
var menusSchema = Schema({

    restaurante: {
        type: String,
      //  ref: "Restaurant",
        default:"5f9211bee6c06d0168d5bf20"
    },
    nombre: String,
    precio: {
        type: Number
    },
    descripcion: String,
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    foto:{
        type: String, 
        default: "No IMAGE",
        required: [true, "la ruta de la imagen es necesaria"]
    }
})
//Nombre, precio, descripción, fechaderegistro, fotografía del producto

var menus = mongoose.model("Menus", menusSchema);
module.exports = menus;
