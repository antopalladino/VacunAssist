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


router.get('/misDatosModificar', async function(req, res, next){
  const paciente = await prisma.paciente.findUnique({
    where:{
      id:2 //obtener id o algo desde el log de sesion
    }
  })
  res.render('misDatosModificar', { title: 'Modificar mis datos | VacunAssist', paciente: paciente });
});

router.post('/misDatosModificar', function(req, res, next){
  var paciente = {
    email: req.body.email ,
    nombre: req.body.nombre ,
    apellido: req.body.apellido ,
    fechaNacimiento: req.body.fechaNacimiento ,
    dni: req.body.dni ,
    genero: req.body.genero ,
    centro: req.body.centro ,
    esRiesgo: req.body.esRiesgo ,
  }
  res.render('misDatos', { title: 'Mis datos | VacunAssist', paciente: paciente }); 
});


router.post('/modificarMail', function(req, res, next){
  res.render('modificarMail', {title: 'Cambiar mail | VacunAssist'});
});

router.get('/modificarMail', function(req, res, next){
  res.render('modificarMail', {title: 'Cambiar mail | VacunAssist'});
});

router.get('/modificarContrasenia', function(req, res, next){
  res.render('modificarContrasenia', {title: 'Cambiar contraseña | VacunAssist'});
});

router.post('/modificarContrasenia', function(req, res, next){
  res.render('modificarContrasenia', {title: 'Cambiar contraseña | VacunAssist'});
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