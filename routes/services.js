var express = require('express');
var router = express.Router();

var Menus = require("../database/menus");
var Cliente = require("../database/cliente");
var Orden = require("../database/orden");
var Users = require("../database/user");
var factura = require("../database/factura");
var valid=require("./utils/valid");

//var jwt = require("jsonwebtoken");

/*LOGIN*/
//http://localhost:8000/api/1.0/login

router.post("/login", (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var result = Cliente.findOne({email: email,password: password}).exec((err, doc) => {
    if (err) {
      res.status(300).json({
        msn : "No se puede concretar con la peticion"
      });
      return;
    }
    console.log(doc);
    if (doc) {
       console.log(result);
      //res.status(200).json(doc);
      /*jwt.sign({name: doc.email, password: doc.password}, "secretkey123", (err, token) => {
          console.log(result);
          res.status(200).json({
            resp:200,
            token : token,
            dato:doc
          });
      })*/
      
        console.log(result);
        res.status(200).json({
          resp:200,
          //token : token,
          dato:doc,
          msn : "ingreso"
          
        });
        
    
    } else {
      res.status(400).json({
        resp: 400,
        msn : "El usuario no existe en la base de datos"
      });
    }
  });
});

//Middelware
function verifytoken (req, res, next) {
  //Recuperar el header
  const header = req.headers["authorization"];
  if (header  == undefined) {
      res.status(403).json({
        msn: "No autorizado"
      })
  } else {
      req.token = header.split(" ")[1];
      jwt.verify(req.token, "secretkey123", (err, authData) => {
        if (err) {
          res.status(403).json({
            msn: "No autorizado"
          })
        } else {
          next();
        }
      });
  }
}

/*MENUS*/
//http://localhost:8000/api/1.0/menus
router.post("/menus", (req, res) => {
  console.log(req.body);
  //Ejemplo de validacion
  var data = req.body;
  data ["registerdate"] = new Date();
  var newmenus = new Menus(data);
  newmenus.save().then((rr) =>{
    res.status(200).json({
      "resp": 200,
      "dato": newmenus,
      "id" : rr._id,
      "msn" : "Menu agregado con exito"
    });
    console.log(newmenus.body);
  });
});
//http://localhost:8000/api/1.0/menus
router.get("/menus",(req, res) => {
  var skip = 0;
  var limit = 20;
  if (req.query.skip != null) {
    skip = req.query.skip;
  }

  if (req.query.limit != null) {
    limit = req.query.limit;
  }
  Menus.find({}).skip(skip).limit(limit).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn" : "Error en la db"
      });
      return;
    }
    
    res.status(200).json(
      docs
      
    );
  });
});



//menus por id de restaurante kato
router.get(/menus\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Menus.find({restaurante : id}).exec( (error, docs) => {
   /* if (docs != null) {
      
        res.status(200).json({docs});
        return;
    }

    res.status(400).json({
      "respuesta":400,
      "msn" : "No existe el recurso seleccionado"
    });*/

    if (docs != null) {
      res.status(200).json(docs);
      return;
  }

  res.status(200).json({
    "msn" : "No existe el pedido "
  });
  })
});

//http://localhost:8000/api/1.0/menus/?id=5f81420fd4b47400cc212c8e
//router.delete('/menus/:id', (req, res,)
/*
router.delete('/menus', (req, res,) => {
  var idMenus = req.params.id;

  Menus.findByIdAndRemove(idMenus).exec()
      .then(() => {
         
      res.status(200).json({
        "resp": 200,
        "msn" :  "eliminado con exito"
      });
      }).catch(err => {
          res.status(500).json({
              error: err
         
            });

      });


});*/

///eliminar menus kato
router.delete("/menus",(req,res)=>{

  console.log(req.query);
  var params = req.query;
  if (params.id == null) {
      res.status(300).json({msn: "El parámetro ID es necesario"});
      return;
  }
  Menus.remove({_id: params.id}, (err, docs) => {
      if (err) {
          res.status(500).json({msn: "Existen problemas en la base de datos"});
           return;
       } 
       res.status(200).json({
           msn:"Eliminado",
           docs
       });
  });
});



//Elimina un restaurant
/*router.delete(/menus\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Menus.find({_id : id}).remove().exec( (err, docs) => {
    res.json({
        message: "Menu eliminado"
        });
  });
});
*/


//actualizar kato
router.patch("/menus", (req, res) => {
  console.log(req.body);
    if (req.query.id == null) {
        res.status(300).json({
        msn: "Error no existe menu"
    });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    Menus.findByIdAndUpdate(id, params, (err, docs) => {
    res.status(200).json({
        msn:"Actualizado menu",
        docs
    });
    });
});


//Actualizar solo por elementos
//http://localhost:8000/api/1.0/menus/?id=5f81420fd4b47400cc212c8e
//"/menus/:id"
/*router.patch("/menus",(req, res) => {
  var params = req.body;
  var id = req.query.id;
  //Collection of data
  var keys = Object.keys(params);
  var updatekeys = ["nombre", "precio", "descripcion", "foto"];
  var newkeys = [];
  var values = [];
  //seguridad
  for (var i  = 0; i < updatekeys.length; i++) {
    var index = keys.indexOf(updatekeys[i]);
    if (index != -1) {
        newkeys.push(keys[index]);
        values.push(params[keys[index]]);
    }
  }
  var objupdate = {}
  for (var i  = 0; i < newkeys.length; i++) {
      objupdate[newkeys[i]] = values[i];
  }
  console.log(objupdate);
  Menus.findOneAndUpdate({_id: id}, objupdate ,(err, docs) => {
    if (err) {
      res.status(500).json({
          msn: "Existe un error en la base de datos"
      });
      return;
    }
    res.status(200).json({
      "resp": 200,
      "dato": menus,
      "msn" : "Menu editado con exito"
    });
    return;
    
  });
});
*/
//Actualiza los datos del restaurant
router.put(/menus\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['nombre', 'precio', 'descripcion'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "No se puede actualizar error utilice el formato patch"
    });
    return;
  }

  var menus = {
    restaurant : req.body.restaurant,
    nombre : req.body.nombre,
    precio : req.body.precio,
    descripcion : req.body.descripcion,
    foto : req.body.foto

  };
  Menus.findOneAndUpdate({_id: id}, objupdate, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "No se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json({
        "resp": 200,
        "dato": menus,
        "msn" : "Menu editado con exito"
      });
      return;
  });
});

/*CLIENTE*/
/*
router.post("/cliente",  (req, res) => {
console.log(req.body);
  var data = req.body;0
  data ["registerdate"] = new Date();
  var newcliente = new Cliente(data);
  newcliente.save().then((rr) =>{
    res.status(200).json({
      "resp": 200,
      "dato": newcliente,
      "msn" : "Cliente agregado con exito a la Base de Datos"
    });
    
  });
});*/

//kato post cliente
/*router.post("/cliente", (req, res) => {
  var userRest = req.body;
  var userDB = new Cliente(userRest);
  userDB.save((err, docs) => {
      if (err) {
          var errors = err.errors;
          var keys = Object.keys(errors);
          var msn = {};
          for (var i = 0; i < keys.length; i++) {
              msn[keys[i]] = errors[keys[i]].message;
          }
          res.status(500).json(msn);
          return;
      }
         res.status(200).json({
        "resp": 200,
        "dato": docs,
        "msn" : "Cliente agregado con exito a la Base de Datos K"
      });
      return;
  })
});
*/
router.post('/cliente', async(req, res) => {
  var params = req.body;
  console.log(req.body);
  params["registerdate"] = new Date();

//checkPassword tendrá que verificar si el password contiene números y caracteres. que sea mínimamente de 6 caracteres y que siempre comience con una letra mayúscula
 // k1ana&
  if(!valid.checkPassword(params.password)){
  res.status(300).json({"msn":"EL password  . Necesita almenos un numero una letra minuscula ,un caracter especial y minimamente de 6 caracteres"});
  return;
  }
  
  if(!valid.checkEmail(params.email)){
      res.status(300).json({
        "resp": 300,
        "msn":"Correo invalido"});
      return;
      }
//checkParams tendrá que verificar si los parámetros del esquema son válidos


  // params.password = sha1(params.password);
  //params.email = sha1(params.email);
  var users = new Cliente(params);
  var result = await users.save();
 // res.status(200).json(result);
  res.status(200).json({
    "resp": 200,
    "dato": result,
    "msn" : "Cliente agregado con exito a la Base de Datos K"
  });
  /*
  Ejemplo de post
         
               "password": Ca&ggguuuuC%1,
               "sex": femenino,
               "name": kato,
               "address": Colombia#15,
              "email": eje11mplo@gmail.com,
 

  */
});




router.get("/cliente",(req, res) => {
  var skip = 0;
  var limit = 10;
  if (req.query.skip != null) {
    skip = req.query.skip;
  }

  if (req.query.limit != null) {
    limit = req.query.limit;
  }
  Cliente.find({}).skip(skip).limit(limit).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn" : "Error en la db"
      });
      return;
    }
    res.json({
      result : docs
    });
  });
});

/*router.get("/cliente", (req, res, ) =>{
  Cliente.find({}).exec((error, docs) => {
    
    res.status(200).json({
      "msn" : "No existe el pedido "
    });
  });
});*/

router.get(/cliente\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Cliente.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el pedido "
    });
  })
});

//Elimina un cliente
//http://localhost:8000/api/1.0/cliente/5f8657d9cfa905001d8849ce
router.delete(/cliente\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Cliente.find({_id : id}).remove().exec( (err, docs) => {
    res.json({
        message: "cliente eliminado"
        });
  });
});

//Actualizar solo por elementos
/*
router.patch(/cliente\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split( "/")[4];
  var keys = Object.keys(req.body);
  var cliente = {
    nombre : req.body.nombre,
    ci : req.body.ci,
    telefono : req.body.telefono,
    email : req.body.email,

  };
  console.log(cliente);
  Cliente.findOneAndUpdate({_id: id}, cliente, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json({
        "resp": 200,
        "dato": cliente,
        "msn" : "Cliente editado con exito"
      });
      return;
  });
});*/

//Actualizar kato
router.patch("/cliente", (req, res) => {
  console.log(req.body);
    if (req.query.id == null) {
        res.status(300).json({
        msn: "Error no existe restaurante"
    });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    Cliente.findByIdAndUpdate(id, params, (err, docs) => {
    res.status(200).json({
      
        msn:"Actualizado",
        docs
    });
    });
});





//Actualiza los datos del cliente
router.put(/cliente\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['nombre', 'ci', 'telefono', 'email'];
  var result = _.difference(oficialkeys, keys);
 
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Error no se puede actualizar intentar con patch"
    });fmulter
    return;
  }
  var cliente = {
    nombre : req.body.nombre,
    ci : req.body.ci,
    telefono : req.body.telefono,
    email : req.body.email,

  };
  Cliente.findOneAndUpdate({_id: id}, cliente, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json({
        "resp": 200,
        "dato": cliente,
        "msn" : "Cliente editado con exito"
      });
      return;
  });
});

/*ORDEN*/
//Insertar datos de la pedido
router.post("/orden",  (req, res) => {
  console.log(req.body);
  var cant=req.body.cantidad;
   var prec=req.body.precios;
   
   console.log(cant);
   console.log(prec);

   var pago_total=cant*prec;
  var data = req.body;
  data ["registerdate"] = new Date();
  data ["pago_total"] = pago_total;
   
  var neworden = new Orden(data);
  
  neworden.save().then((rr) =>{
    res.status(200).json({
      "resp": 200,
      "dato": neworden,
      "msn" : "Orden agregado con exito"
    });
  });
});

router.get("/orden", (req, res, next) =>{
  Orden.find({}).populate("menus").populate("cliente").populate("restaurant").exec((error, docs) => {
    res.status(200).json(docs);
  });
});

// Read only one user
router.get(/orden\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];

  Orden.find({cliente  : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({

        "array_texto":
          {
            "texto":"<b>orden</b>",
            "texto":"registrado con exito"
          }


    });
  })
  
  
});
////ver pedidos segun el menu
router.get(/ordenm\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];

  Orden.find({menus  : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({

        "array_texto":
          {
            "texto":"<b>orden</b>",
            "texto":"registrado con exito"
          }
    });
  })

});

//orden kato id de menu
/*router.get("/orden", (req, res) => {
  var url = req.url;
  var id = url.split("?id=")[2];
  console.log(id);
  Orden.find({menus : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({

        "array_texto":
          {
            "texto":"<b>orden</b>",
            "texto":"registrado con exito"
          }


    });
  })
});

*/

//Elimina una orden
/*router.delete('/orden', (req, res,) => {
  var idOrden = req.params.id;

  Orden.findByIdAndRemove(idOrden).exec()
      .then(() => {
          res.json({
              msn: "Orden eliminado",
             docs
          });
      }).catch(err => {
          res.status(500).json({

              error: err
          });
      });


});*/

//eliminar kato
router.delete("/orden",(req,res)=>{

  console.log(req.query);
  var params = req.query;
  if (params.id == null) {
      res.status(300).json({msn: "El parámetro ID es necesario"});
      return;
  }
  Orden.remove({_id: params.id}, (err, docs) => {
      if (err) {
          res.status(500).json({msn: "Existen problemas en la base de datos"});
           return;
       } 
       res.status(200).json({
           msm:"Eliminado",
           docs
       });
  });
});



//kato
router.patch("/orden", (req, res) => {
  console.log(req.body);
    if (req.query.id == null) {
        res.status(300).json({
        msn: "Error no existe restaurante"
    });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    console.log(res.body);
    Orden.findByIdAndUpdate(id, params, (err, docs) => {
    res.status(200).json({
        msn:"Actualizado",
        docs
    });
    });
});





/*

//Actualizar solo por elementos
router.patch(/orden\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var orden = {};
  for (var i = 0; i < keys.length; i++) {
    orden[keys[i]] = req.body[keys[i]];
  }
  console.log(orden);
  Orden.findOneAndUpdate({_id: id}, orden, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json({
        "resp": 200,
        "dato": orden,
        "msn" : "Orden editado con exito"
      });
      return;
  });
});
*/
//Actualiza los datos de la orden
router.put(/orden\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['idmenu', 'idrestaurant', 'cantidad', 'idcliente', 'lat', 'lon', 'pagototal'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hacer uso del metodo patch si desea editar solo un fragmento de la informacion"
    });
    return;
  }

  var orden = {
    menu : req.body.idmenu,
    restaurant : req.body.idrestaurant,
    cliente : req.body.idcliente,
    lugar_envio : req.body.lugar_envio,
    cantidad : req.body.cantidad,
    precio : req.body.precio,
    pagototal : req.body.pagototal
  };
  Orden.findOneAndUpdate({_id: id}, orden, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos de la orden"
        });
        return;
      }
      res.status(200).json({
        "resp": 200,
        "dato": orden,
        "msn" : "Orden editado con exito"
      });
      return;
  });
});
/*

router.get("/factura", (req, res, next) =>{
  factura.find({}).populate("menus").populate("cliente").populate("restaurant").exec((error, docs) => {
    res.status(200).json(docs);
  });
});*/

router.post("/factura",(req, res) => {
  console.log(req.body);
    var data = req.body;
    //Validacion
    //Ustedes se opupan de validar estos datos
    //OJO
    data["registerdate"] = new Date();
    var newfactura = new factura(data);
    newfactura.save().then( (rr) => {
      
      //content-type
      res.status(200).json({
        
        "id" : rr._id,
        "msn" : "factura Agregado con exito"
      });
      console.log(newfactura.body);
    });
  });

  router.get("/factura",(req, res) => {
    var skip = 0;
    var limit = 10;
    if (req.query.skip != null) {
      skip = req.query.skip;
    }
  
    if (req.query.limit != null) {
      limit = req.query.limit;
    }
    factura.find({}).skip(skip).limit(limit).exec((err, docs) => {
      if (err) {
        res.status(500).json({
          "msn" : "Error en la db"
        });
        return;
      }
      res.status(200).json(docs);
    });
  });

module.exports = router;