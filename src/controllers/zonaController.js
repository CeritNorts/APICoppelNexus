const ZonaModel = require('../models/zonaModel');

class ZonaController {
    /**
     * Crea una nueva zona
     * @param {object} req - Objeto de solicitud
     * @param {object} res - Objeto de respuesta
     */
    static async createZona(req, res) {
        const {
            nombre_zona,
            estado,
            municipios_incluidos,
            codigos_postales_relacionados
        } = req.body;

        try {
            const resultado = await ZonaModel.create({
                nombre_zona,
                estado,
                municipios_incluidos,
                codigos_postales_relacionados
            });

            res.status(201).json({
                mensaje: 'Zona creada exitosamente',
                id_zona: resultado.id_zona
            });
        } catch (error) {
            res.status(500).json({
                error: 'Error al crear la zona',
                detalle: error.message
            });
        }
    }

    /**
     * Obtiene todas las zonas
     * @param {object} req - Objeto de solicitud
     * @param {object} res - Objeto de respuesta
     */
    static async getAllZonas(req, res) {
        try {
            const zonas = await ZonaModel.getAll();
            res.status(200).json(zonas);
        } catch (error) {
            res.status(500).json({
                error: 'Error al obtener las zonas',
                detalle: error.message
            });
        }
    }

    /**
     * Obtiene una zona por su ID
     * @param {object} req - Objeto de solicitud
     * @param {object} res - Objeto de respuesta
     */
    static async getZonaById(req, res) {
        const { id_zona } = req.params;

        try {
            const zona = await ZonaModel.getById(id_zona);

            if (!zona) {
                return res.status(404).json({
                    error: 'No se encontró la zona con el ID especificado'
                });
            }

            res.status(200).json(zona);
        } catch (error) {
            res.status(500).json({
                error: 'Error al obtener la zona',
                detalle: error.message
            });
        }
    }

    /**
     * Actualiza una zona existente
     * @param {object} req - Objeto de solicitud
     * @param {object} res - Objeto de respuesta
     */
    static async updateZona(req, res) {
        const { id_zona } = req.params;
        const updateData = req.body;

        try {
            const resultado = await ZonaModel.update(id_zona, updateData);

            if (!resultado) {
                return res.status(404).json({
                    error: 'No se encontró la zona con el ID especificado'
                });
            }

            res.status(200).json({
                mensaje: 'Zona actualizada exitosamente',
                id_zona: id_zona
            });
        } catch (error) {
            res.status(500).json({
                error: 'Error al actualizar la zona',
                detalle: error.message
            });
        }
    }

    /**
     * Elimina una zona
     * @param {object} req - Objeto de solicitud
     * @param {object} res - Objeto de respuesta
     */
    static async deleteZona(req, res) {
        const { id_zona } = req.params;

        try {
            const resultado = await ZonaModel.delete(id_zona);

            if (!resultado) {
                return res.status(404).json({
                    error: 'No se encontró la zona con el ID especificado'
                });
            }

            res.status(200).json({
                mensaje: 'Zona eliminada exitosamente',
                id_zona: id_zona
            });
        } catch (error) {
            res.status(500).json({
                error: 'Error al eliminar la zona',
                detalle: error.message
            });
        }
    }
}

module.exports = ZonaController;