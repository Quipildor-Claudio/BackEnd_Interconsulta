const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DxsmSchema = new Schema({
    codigo: {
        type: String,
        unique: true,
        trim: true
    },
    nombre: String

});

module.exports = mongoose.model('DxSm', DxsmSchema);