const mongoose = require('mongoose');
const interconsulta = require('./interconsulta');
const Schema = mongoose.Schema;
const PacienteSchema = new Schema({
  _id: String,
  dni: String,
  nombre: String,
  apellido: String,
  edad: Number,
  fecha_nac: Date,
  sexo: String,
  cobertura_soc: String,
  hclinica: String,
  oda_pcte: String,
  odi_pcte: String,
  domicilio_pcte: String,
  numero_dom: Number,
  man_dom: Number,
  lote_dom: Number,
  interconsultas:[{
    id_interconsulta: { type: Schema.Types.ObjectId, ref: 'Interconsulta' },
  }]
});


module.exports = mongoose.model('Paciente', PacienteSchema);