const express = require('express');
const router = express.Router();
const testController = require('../../controllers/testController');
const userController = require('../../controllers/userController');
const pacienteController = require('../../controllers/pacienteController');
const medicoController = require('../../controllers/medicoController');
const servicioController = require('../../controllers/servicioController');
const interconsultaController = require('../../controllers/interconsultaController');


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
router.get('/paciente/dni/:dni',pacienteController.getByDni);
router.get('/search',pacienteController.search);
router.get('/searchp',pacienteController.searchDni);




/**  Rutas  de Medicos */

router.get('/medicos',medicoController.getAll);
router.get('/medico/:id',medicoController.getOne);
router.post('/medico',medicoController.save);
router.put('/medico/:id',medicoController.update);
router.delete('/medico/:id',medicoController.delete);

/**  Rutas  de Interconsulta */

router.get('/interconsultas',interconsultaController.getAll);
router.get('/interconsulta/:id',interconsultaController.getOne);
router.post('/interconsulta',interconsultaController.save);
router.put('/interconsulta/:id',interconsultaController.update);
router.delete('/interconsulta/:id',interconsultaController.delete);


/**  Rutas  de Servicio */

router.get('/servicios',servicioController.getAll);
router.get('/servicio/:id',servicioController.getOne);
router.post('/servicio',servicioController.save);
router.put('/servicio/:id',servicioController.update);
router.delete('/servicio/:id',servicioController.delete);

module.exports=router;