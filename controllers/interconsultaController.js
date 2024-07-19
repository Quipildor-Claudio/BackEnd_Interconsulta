const Interconsulta = require('../models/interconsulta');
let interconsultaController = {

    getAll: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 50;
            const skip = (page - 1) * limit;
    
            const items = await Interconsulta.find()
            .populate('medico')   
            .populate('estudios')
            .skip(skip).limit(limit);
            const totalItems = await Interconsulta.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);
    
            res.json({
                items,
                totalItems,
                totalPages,
                currentPage: page
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const item = await Interconsulta.findById(req.params.id);
            if (item == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    save: async (req, res) => {
        try {
            const item = new Interconsulta(req.body);
            const savedItem = await item.save();
            res.status(201).json(savedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const updatedItem = await Interconsulta.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(updatedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const deletedItem = await Interconsulta.findByIdAndDelete(req.params.id);
            if (deletedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json({ message: 'Item eliminado' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getInterconsultaByPaciente: async (req, res) => {
        try {
            const interconsultas = await Interconsulta.find({ paciente: req.params.id })
                .populate('paciente') // Si deseas obtener información del paciente
                .populate('medico')   // Si deseas obtener información del médico
                .populate('estudios'); // Si deseas obtener información de los estudios

            res.json(interconsultas);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    interRangoFecha: async (req, res) => {
        const { fechaInicio, fechaFin } = req.query;
        console.log(fechaInicio + " -------" + fechaFin);
        
        // Añadir un día a la fecha final
        const fechaFinMasUnDia = new Date(fechaFin);
        fechaFinMasUnDia.setDate(fechaFinMasUnDia.getDate() + 1);
    
        try {
            const interConsultas = await Interconsulta.find({
                createdAt: {
                    $gte: new Date(fechaInicio),
                    $lte: fechaFinMasUnDia
                }
            }).populate('medico').exec();
            res.json(interConsultas);
    
        } catch (error) {
            console.error("Error al buscar interconsultas por rango de fecha:", error);
            res.status(500).send("Error al buscar interconsultas por rango de fecha");
        }
    }

}

module.exports = interconsultaController;