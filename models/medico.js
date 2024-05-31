const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MedicoSchema = new Schema({
    nombre_medico: String,
    dni_medico: String,
    mp_medico: String,
    especialidad_medico: String,
    telefono_medico: String
  });
  
  module.exports = mongoose.model('Medico', MedicoSchema);
  