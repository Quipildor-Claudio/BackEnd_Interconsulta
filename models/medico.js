const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MedicoSchema = new Schema({
  apellido: String,
  nombre: String,
  cuil: {
    type: String,
    unique: true,
    trim: true
  },
  titulo: String,
  matricula: String,
  servicio: String,
  funcion: String
},
);

module.exports = mongoose.model('Medico', MedicoSchema);
