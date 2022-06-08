var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/* GET home page. */
router.all('/', function(req, res, next) {
  res.render('index', { title: 'Inicio | VacunAssist' });
});

router.post('/iniciarSesion', function(req, res, next) {
  res.render('/', { title: 'Inicio | VacunAssist' });
});


router.post('/registroPasoUno', function(req, res, next) {
  res.render('registroPasoUno', { title: 'Registro | VacunAssist' });
});

router.post('/registroPasoDos', function(req, res, next) {
  var reque = req.body;
  var fn = reque.fechaNac;
  reque.fechaNac = fn.substr(6,4) + "-" + fn.substr(3,2) + "-" + fn.substr(0,2);
  res.render('registroPasoDos',
    { title: 'Registro | VacunAssist', reque: reque }
  );
});

router.get('/misDatos', async function(req, res, next){
  const paciente = await prisma.paciente.findUnique({
    where:{
      id:2 //obtener id o algo desde el log de sesion
    }
  })

  res.render('misDatos', { title: 'Mis datos | VacunAssist', paciente: paciente });
});


router.post('/misDatos', async function(req, res, next){

  const centroIdVar = req.body.centroId;
  const esRiesgoVar = req.body.esRiesgo; 


  const paciente = await prisma.paciente.update({
    where:{
      id:2 //obtener id o algo desde el log de sesion
    },
    data: {
      centroId: Number(centroIdVar),
      esRiesgo: esRiesgoVar
    }
  })

  res.render('misDatos', { title: 'Mis datos | VacunAssist', paciente: paciente }); 
});


router.get('/misDatosModificar', async function(req, res, next){
  const paciente = await prisma.paciente.findUnique({
    where:{
      id:2 //obtener id o algo desde el log de sesion
    }
  })
  res.render('misDatosModificar', { title: 'Modificar mis datos | VacunAssist', paciente: paciente });
});



router.post('/modificarMail', async function(req, res, next){
  //obtener los datos del usuario en la bd
  const paciente1 = await prisma.paciente.findUnique({
    where: {id:2} //obtener id o algo desde el log de sesion
  });

  //obtener los datos ingresados en la vista
  const claveVar = req.body.clave; 
  const emailVar = req.body.email;
  var nuevomail = '';


  //consultar existencia del mail
  const existeMail = await prisma.paciente.findUnique({
    where: {email: emailVar}
  })
  if (existeMail){
    nuevomail = "El mail que ingresaste ya esta registrado";
  }


  else{
    //verificar datos
    if (paciente1.clave == claveVar){
      const paciente = await prisma.paciente.update({
        where: {
          id :2, //obtener id o algo desde el log de sesion
        },

        data: {
          email: emailVar
        }
      })
      nuevomail = "Tu nuevo mail es "+ paciente.email;
    }
    else {
      nuevomail = "Tu contraseña es incorrecta";
    }
  }

  res.render('modificarMail', {title: 'Cambiar mail | VacunAssist' , nuevomail: nuevomail});
});


router.get('/modificarMail', function(req, res, next){
  res.render('modificarMail', {title: 'Cambiar mail | VacunAssist'});
});

router.get('/modificarContrasenia', function(req, res, next){
  res.render('modificarContrasenia', {title: 'Cambiar contraseña | VacunAssist'});
});

router.post('/modificarContrasenia', async function(req, res, next){
  //obtener los datos del usuario en la bd
  const paciente = await prisma.paciente.findUnique({
    where: {id:2} //obtener id o algo desde el log de sesion
  });

  const claveVar = req.body.claveActual;
  const clavenuevaVar = req.body.claveNueva;
  var resultado;

  if ( claveVar == paciente.clave) {
    const pacienteclave = await prisma.paciente.update({
      where:{
        id:2 //obtener id o algo desde el log de sesion
      },
      data:{
        clave: clavenuevaVar
      }
    })
    resultado = "Cambiaste tu contraseña";
  }
  else{
    resultado = "Tu contraseña es incorrecta";
  }
  
  res.render('modificarContrasenia', {title: 'Cambiar contraseña | VacunAssist', resultado: resultado});
});

router.get('/solicitarTurnoFiebreAmarilla', function(req, res, next){
  res.render('solicitarTurnoFiebreAmarilla', {title: 'Turno fiebre amarilla | VacunAssist'});
});


router.get('/turnosyCertificados', function(req, res, next){
  res.render('turnosyCertificados', {title: 'Turnos y certificados | VacunAssist'});
});

router.get('/registroCompletado', function(req, res, next){
  res.render('registroCompletado', {title: 'Registro completado | VacunAssist'});
});

router.get('/inicioPaciente', function(req, res, next){
  res.render('inicioPaciente', {title: 'Menu | VacunAssist'});
});


module.exports = router;