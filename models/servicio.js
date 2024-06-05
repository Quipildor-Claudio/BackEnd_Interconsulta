const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ServicioSchema = new Schema({
    nombre_servicio: String,
});

module.exports = mongoose.model('Servicio', ServicioSchema);
