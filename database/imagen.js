const mongoose = require("./connect");
var IMGSCHEMA ={
name  :String,
image: {
    type: String, 

    //required: [true, "la ruta de la imagen es necesaria"]
},
size: {
    type: String,
    //required: [true, "la ruta de la canción es necesaria"]
},
md5: {
    type: String,
    //required: [true, "la ruta de la canción es necesaria"]
},
relativepath: {
    type: String
},
pathfile: {
    type: String,
    required: [true, "la ruta de la canción es necesaria"]
},
hash: {
    type: String,
    required: [true, "la ruta de la canción es necesaria"]
}
};
const IMG = mongoose.model("imagenes", IMGSCHEMA);
module.exports = IMG;