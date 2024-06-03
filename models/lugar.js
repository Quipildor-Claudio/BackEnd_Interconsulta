const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LugarSchema = new Schema({
    nombre_lugar: String
});

module.exports = mongoose.model('Lugar', LugarSchema);
