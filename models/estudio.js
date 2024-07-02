const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EstudioSchema = new Schema({
    _id: Schema.Types.ObjectId,
    descripcion:String
},
{ timestamps: true } );

module.exports = mongoose.model('Estudio', EstudioSchema);