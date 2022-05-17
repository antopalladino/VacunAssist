var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
  res.render('index', { title: 'Inicio | VacunAssist' });
});

router.post('/iniciarSesion', function(req, res, next) {
  res.render('/', { title: 'Inicio | VacunAssist' });
});


router.post('/registro', function(req, res, next) {
  res.render('registro', { title: 'Registro | VacunAssist' });
});

router.post('/registroPasoDos', function(req, res, next) {
  res.render('registroPasoDos', { title: 'Registro | VacunAssist' });
});

module.exports = router;
