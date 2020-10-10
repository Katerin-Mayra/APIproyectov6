var express = require("express");
var sha1 = require("sha1");
var router = express.Router();
var REST= require("../database/restaurante");
var IMG= require("../database/imagen");
var fileUpload = require("express-fileupload");
var mongoose = require("mongoose");
router.use(fileUpload({
    fileSize: 50 * 1024 * 1024
}));

///subir imagen
//http://localhost:8000/api/1.0/sendfile
//FormData-data  ===  file ===
router.post("/sendfile", (req, res) => {
    /*console.log(req.files.file);
    console.log(__dirname);
   */
   var imgrest=req.files.file;
   console.log(imgrest);
   
    var path = __dirname.replace(/routes/gi, "imgrestaurante");
    ///routes/gi
    console.log(path);
    var date=new Date();
    var sing= sha1(date.toString()).substr(1, 5);
    console.log(sing);
    var totalpath = path + "/" + sing + "_" + imgrest.name.replace(/\s/g,"_");
    console.log(totalpath);
    imgrest.mv(totalpath, async(err) => {
        if (err) {
            return res.status(300).send({msn : "Error al escribir el archivo en el disco duro"});
        }
        var meta = await (imgrest);
        console.log(meta);
        var obj = {};
      
            obj["name"] = imgrest.name;
            obj["image"]=totalpath;
            obj["size"] = imgrest.size;
            obj["md5"] = imgrest.md5;
            obj["pathfile"] = totalpath;
            obj["hash"] = sha1(totalpath);
            obj["relativepath"] = "/api/1.0/getfile/?id=" + obj["hash"];
            
        var updateimg = new IMG(obj);
        updateimg.save((err, docs) => {
            if (err) {
                res.status(500).json({msn: "ERROR "})
                return;
            }
            res.status(200).json({name: imgrest.name});
        });
    });
});
//listar por imagen determinado mostrar en croome o postman
//http://localhost:8000/api/1.0/getfile?id=4ab2d87d9d267a67fcdce3feb092c90370a1452e  <-- id= hash de la imagen 
router.get("/getfile", async(req, res, next) => {
    var params = req.query;

    if (params == null) {
        res.status(300).json({
            msn: "Error es necesario un ID"
        });
        return;
    }
    var id=params.id;
    var imgresta =  await IMG.find({hash:id});

    if (imgresta.length > 0) {
        var path = imgresta[0].pathfile;
        res.sendFile(path);
        return;
    }

    res.status(300).json({
        msn: "Error en la petición"
    });

    return;
});
//listar todas las imagenes con limites
//http://localhost:8000/api/1.0/listimg
router.get("/listimg", async(req, res) => {
    var filterdata=req.query;
    var filterarray=["name","size"];
    var name=filterdata["name"];
    var size=filterdata["size"];
    var filter={};
    if(name !=null){
        filter["name"] =new RegExp(name,"g");
    }
    if(size!=null){
        filter["size"] =new RegExp(size,"g");
    }
    var limit =100;
    var skip=0;
    if(filterdata["limit"]){
        limit=parseInt(filterdata["limit"]);
    }
    if(filterdata["skip"]){
        skip=parseInt(filterdata["skip"]);
    }
    var docs=await IMG.find(filter).limit(limit).skip(skip);
    res.status(200).json(docs);
});

//listar imagenes segun su id  mostrarno la imagen por croome o postamn 
//http://localhost:8000/api/1.0/listarIMG?id=5f5d2fc817b89300f1a95a10 <-- id de una imagen
router.get("/listarIMG",async(req,res)=>{
    var params = req.query;

    if (params == null) {
        res.status(300).json({
            msn: "Error es necesario un ID"
        });
        return;
    }
    var id=params.id;
    var imgss =  await IMG.find({_id:id});

    if (imgss.length > 0) {
        var path = imgss[0].pathfile;
        res.sendFile(path);
        return;
    }

    res.status(300).json({
        msn: "Error en la petición"
    });

    return;

});



module.exports = router;