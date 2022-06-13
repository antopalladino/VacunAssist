var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.get('/registro', async function(req, res, next) {
  res.setHeader('Content-type', 'text/json');
  var pacienteDni = await prisma.paciente.findUnique({where: {dni: parseInt(req.query.dni)}});
  var pacienteEmail = await prisma.paciente.findUnique({where: {email: req.query.email}});
  if(pacienteDni) res.send({resultado: 'dni'});
  else if(pacienteEmail) res.send({resultado: 'email'});
  else res.send({resultado: true});
});

module.exports = router;
