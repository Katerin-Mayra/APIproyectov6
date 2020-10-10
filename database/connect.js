var mongoose =require("mongoose");
mongoose.connect("mongodb://172.25.0.2:27017/proyecto1database",{useNewUrlParser:true});
var db= mongoose.connection;
db.on("error",()=>{
    console.log("ERROR no se puede conectar al servidor");
});
db.on("open",()=>{
    console.log("Conexion Exitosa")
});
module.exports=mongoose; 