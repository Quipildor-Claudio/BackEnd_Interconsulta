const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MedicoSchema = new Schema({
  
  apellido: String,
  nombre: String,
  cuil: String,
  titulo: String,
  matricula: String,
  servicio: String,
  funcion: String
},
);

module.exports = mongoose.model('Medico', MedicoSchema);
