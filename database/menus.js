var mongoose = require("./connect");
var Schema = mongoose.Schema;
var menusSchema = Schema({

    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant"
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
    foto: String
})
//Nombre, precio, descripción, fechaderegistro, fotografía del producto

var menus = mongoose.model("Menus", menusSchema);
module.exports = menus;
