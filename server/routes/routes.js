const express = require('express');
const router = express.Router();
const testController = require('../../controllers/testController');
const userController = require('../../controllers/userController');
const pacienteController = require('../../controllers/pacienteController');
const medicoController = require('../../controllers/medicoController');

/**  Ruta de testeo */
router.get('/test',testController.test);

/**  Ruta de Usuario */
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/logout',userController.logout);
router.delete('/user/:id',userController.delete);




/**  Rutas  de Pacientes */

router.get('/pacientes',pacienteController.getAll);
router.get('/paciente/:id',pacienteController.getOne);
router.post('/paciente',pacienteController.save);
router.put('/paciente/:id',pacienteController.update);
router.delete('/paciente/:id',pacienteController.delete);

/**  Rutas  de Medicos */

router.get('/medicos',medicoController.getAll);
router.get('/medico/:id',medicoController.getOne);
router.post('/medico',medicoController.save);
router.put('/medico/:id',medicoController.update);
router.delete('/medico/:id',medicoController.delete);

module.exports=router;