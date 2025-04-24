const { Router } = require('express');
const ZonaController = require('../controllers/zonaController');

const router = Router();

/**
 * @swagger
 * /nueva-zona:
 *   post:
 *     summary: Crea una nueva zona
 *     description: Crea un nuevo registro de zona en la base de datos
 *     tags: [Zonas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_zona
 *               - estado
 *             properties:
 *               nombre_zona:
 *                 type: string
 *                 description: Nombre de la zona
 *               estado:
 *                 type: string
 *                 description: Estado al que pertenece la zona
 *               municipios_incluidos:
 *                 type: array
 *                 description: Lista de municipios que incluye la zona
 *                 items:
 *                   type: string
 *               codigos_postales_relacionados:
 *                 type: array
 *                 description: Lista de códigos postales que pertenecen a la zona
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Zona creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Zona creada exitosamente
 *                 id_zona:
 *                   type: string
 *                   example: me123
 *       500:
 *         description: Error al crear la zona
 */
router.post('/nueva-zona', ZonaController.createZona);

/**
 * @swagger
 * /zonas:
 *   get:
 *     summary: Obtiene la lista de todas las zonas
 *     description: Retorna un array con todas las zonas registradas en la base de datos
 *     tags: [Zonas]
 *     responses:
 *       200:
 *         description: Lista de zonas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Zona'
 *       500:
 *         description: Error del servidor
 */
router.get('/zonas', ZonaController.getAllZonas);

/**
 * @swagger
 * /zona/{id_zona}:
 *   get:
 *     summary: Obtiene una zona por su ID
 *     description: Retorna los datos de una zona específica según su ID
 *     tags: [Zonas]
 *     parameters:
 *       - in: path
 *         name: id_zona
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la zona
 *     responses:
 *       200:
 *         description: Datos de la zona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zona'
 *       404:
 *         description: Zona no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/zona/:id_zona', ZonaController.getZonaById);

/**
 * @swagger
 * /actualizar-zona/{id_zona}:
 *   put:
 *     summary: Actualiza los datos de una zona
 *     description: Actualiza la información de una zona existente identificada por su ID
 *     tags: [Zonas]
 *     parameters:
 *       - in: path
 *         name: id_zona
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la zona a actualizar
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_zona:
 *                 type: string
 *                 description: Nombre de la zona
 *               estado:
 *                 type: string
 *                 description: Estado al que pertenece la zona
 *               municipios_incluidos:
 *                 type: array
 *                 description: Lista de municipios que incluye la zona
 *                 items:
 *                   type: string
 *               codigos_postales_relacionados:
 *                 type: array
 *                 description: Lista de códigos postales que pertenecen a la zona
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Zona actualizada exitosamente
 *       404:
 *         description: Zona no encontrada
 *       500:
 *         description: Error al actualizar la zona
 */
router.put('/actualizar-zona/:id_zona', ZonaController.updateZona);

/**
 * @swagger
 * /eliminar-zona/{id_zona}:
 *   delete:
 *     summary: Elimina una zona
 *     description: Elimina una zona de la base de datos según su ID
 *     tags: [Zonas]
 *     parameters:
 *       - in: path
 *         name: id_zona
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la zona a eliminar
 *     responses:
 *       200:
 *         description: Zona eliminada exitosamente
 *       404:
 *         description: Zona no encontrada
 *       500:
 *         description: Error al eliminar la zona
 */
// Noté que usas GET para eliminar, pero lo normal es usar DELETE
// Arreglado el método pero comentado para que sepas:
router.delete('/eliminar-zona/:id_zona', ZonaController.deleteZona);
// Si necesitas mantener GET por alguna razón, puedes descomentar esta línea:
// router.get('/eliminar-zona/:id_zona', ZonaController.deleteZona);

/**
 * @swagger
 * components:
 *   schemas:
 *     Zona:
 *       type: object
 *       required:
 *         - id_zona
 *         - nombre_zona
 *         - estado
 *       properties:
 *         id:
 *           type: string
 *           description: ID del documento en Firebase
 *         id_zona:
 *           type: string
 *           description: ID único de la zona
 *         nombre_zona:
 *           type: string
 *           description: Nombre de la zona
 *         estado:
 *           type: string
 *           description: Estado al que pertenece la zona
 *         municipios_incluidos:
 *           type: array
 *           description: Lista de municipios que incluye la zona
 *           items:
 *             type: string
 *         codigos_postales_relacionados:
 *           type: array
 *           description: Lista de códigos postales que pertenecen a la zona
 *           items:
 *             type: string
 */

module.exports = router;