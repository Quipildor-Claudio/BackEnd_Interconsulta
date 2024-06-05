const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const InterConsultaSchema = new Schema({
    _id:String,
    descripcion:String,
    lugar:String,
    tipo:String,  // valor tipo de atencion nueva seguimineto 
    id_paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' },
    id_medio: { type: Schema.Types.ObjectId, ref: 'Medico' },
    estudios:[
        {
            _id:String,
            tipo:String,
            fecha:Date
        }
    ],
    
},
{ timestamps: true } 
);
module.exports = mongoose.model('Interconsulta', InterConsultaSchema);