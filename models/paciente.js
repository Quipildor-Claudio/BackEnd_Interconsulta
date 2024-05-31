const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PacienteSchema = new Schema({
  dni: String,
  nombre: String,
  apellido:String,
  edad: Number,
  fecha_nac: Date,
  sexo: String,
  cobertura_soc: String,
  hclinica: String,
  oda_pcte: String,
  odi_pcte: String,
  domicilio_pcte: String
});


module.exports = mongoose.model('Paciente', PacienteSchema);