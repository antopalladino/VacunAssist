var express = require('express');
var router = express.Router();

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

module.exports = router;
