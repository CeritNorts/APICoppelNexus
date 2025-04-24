const RutaModel = require('../models/rutasModel');

class RutaController {
    /**
     * Obtiene todas las rutas
     */
    static async getAllRutas(req, res) {
        try {
            const rutas = await RutaModel.getAll();
            res.status(200).json(rutas);
        } catch (error) {
            res.status(500).json({
                error: 'Error al obtener las rutas',
                detalle: error.message
            });
        }
    }

    /**
     * Obtiene una ruta por su ID
     */
    static async getRutaById(req, res) {
        const { id_ruta } = req.params;

        try {
            const ruta = await RutaModel.getById(id_ruta);

            if (!ruta) {
                return res.status(404).json({
                    error: 'No se encontró la ruta con el ID especificado'
                });
            }

            res.status(200).json(ruta);
        } catch (error) {
            res.status(500).json({
                error: 'Error al obtener la ruta',
                detalle: error.message
            });
        }
    }

    /**
     * Crea una nueva ruta
     */
    static async createRuta(req, res) {
        const { nombre_ruta, id_zona_asociada, ubicaciones } = req.body;
        
        try {
            const resultado = await RutaModel.create({ nombre_ruta, id_zona_asociada, ubicaciones });
            
            res.status(201).json({
                mensaje: 'Ruta creada exitosamente',
                id_ruta: resultado.id_ruta
            });
        } catch (error) {
            res.status(500).json({
                error: 'Error al crear la ruta',
                detalle: error.message
            });
        }
    }

    /**
     * Actualiza una ruta existente
     */
    static async updateRuta(req, res) {
        const { id_ruta } = req.params;
        const datosActualizar = req.body;
        
        try {
            const resultado = await RutaModel.update(id_ruta, datosActualizar);
            
            if (!resultado) {
                return res.status(404).json({
                    error: 'No se encontró la ruta con el ID especificado'
                });
            }
            
            res.status(200).json({
                mensaje: 'Ruta actualizada exitosamente',
                id_ruta
            });
        } catch (error) {
            res.status(500).json({
                error: 'Error al actualizar la ruta',
                detalle: error.message
            });
        }
    }

    /**
     * Elimina una ruta
     */
    static async deleteRuta(req, res) {
        const { id_ruta } = req.params;
        
        try {
            const resultado = await RutaModel.delete(id_ruta);
            
            if (!resultado) {
                return res.status(404).json({
                    error: 'No se encontró la ruta con el ID especificado'
                });
            }
            
            res.status(200).json({
                mensaje: 'Ruta eliminada exitosamente',
                id_ruta
            });
        } catch (error) {
            res.status(500).json({
                error: 'Error al eliminar la ruta',
                detalle: error.message
            });
        }
    }

    /**
     * Obtiene las rutas asociadas a una zona
     */
    static async getRutasByZona(req, res) {
        const { id_zona } = req.params;

        try {
            const rutas = await RutaModel.getRutasByZona(id_zona);
            res.status(200).json(rutas);
        } catch (error) {
            res.status(500).json({
                error: 'Error al obtener las rutas por zona',
                detalle: error.message
            });
        }
    }
}

module.exports = RutaController;