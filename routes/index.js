var express = require('express');
var router = express.Router();

var USER =require("../database/user");


/* GET home page. */
router.get('/', function(req, res, next) {
  
  console.log("ingreso al index /api/v1.0")
  
  res.status(200).json({
      msm:"Bienvenido al Proyecto Seminario"
  });
  /*
  res.render('index', { title: 'Bienvenido al Proyecto Seminario' });
  */
});

//get y post usuario de EJeMPLO para probar postman (K)
router.get('/usuario', (req, res, next) =>{
  
  var datos =req.query; //optengo el cuerpo UTILIZO QUERY cuando trabajo con GET
  var name= datos.name; //saco el nombre 
   console.log(datos); //muestro en la consola datos
   console.log(name);//muestro en la consola el nombre
  
  res.status(200).json({
      msm:"Nombre :" + name  //muestro el nombre
  });


  USER.find({},(err,docs)=>{
    res.status(200).json(docs);
  });
  

 
});

router.post('/usuario', (req, res, next) =>{
  
  var datos =req.body;//optengo el cuerpo UTILIZO BODY cuando trabajo con POST
  
  console.log(datos); //para ver que me muestra datos en consola
  datos["timeserver"] =new Date();//fecha
  datos["method"] ="POST";//metodo
  
//almacenar los datos antes de subirlo a la base de datos
  var user={};
  user["name"]= datos.name;
  user["lastname"]=datos.lastname;
  user["date"]=new Date();

//guardar a la base de datos
var newuser=new USER(user);
  newuser.save().then(()=>{
    res.status(200).json({"msn":"Usuario Registrado"});
  });


  res.status(200).json(datos); //muestro todos los datos que resivo
 
});

router.put("/usuario",(req,res)=>{
  var datos =req.body;//optengo el cuerpo UTILIZO BODY cuando trabajo con POST
  console.log(datos); //para ver que me muestra datos en consola
  datos["timeserver"] =new Date();
  datos["method"] ="PUT";//metodo
  res.status(200).json(datos); //muestro todos los datos que resivo
})

router.delete('/usuario', (req, res, next) =>{
  
  var datos =req.query; //optengo el cuerpo UTILIZO QUERY cuando trabajo con GET
  var id= datos.id; //saco el id
   console.log(datos); //muestro en la consola datos
   console.log(id);//muestro en la consola el id
  
  res.status(200).json({
      msm:"DELETE"
  });
 
});
module.exports = router;
