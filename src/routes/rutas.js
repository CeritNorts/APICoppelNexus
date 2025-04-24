const { Router } = require('express');
const RutaController = require('../controllers/rutasController');

const router = Router();

/**
 * @swagger
 * /rutas:
 *   get:
 *     summary: Obtiene la lista de todas las rutas
 *     description: Retorna un array con todas las rutas registradas en la base de datos
 *     tags: [Rutas]
 *     responses:
 *       200:
 *         description: Lista de rutas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ruta'
 *       500:
 *         description: Error del servidor
 */
router.get('/rutas', RutaController.getAllRutas);

/**
 * @swagger
 * /ruta/{id_ruta}:
 *   get:
 *     summary: Obtiene una ruta por su ID
 *     description: Retorna los datos de una ruta específica según su ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id_ruta
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ruta
 *     responses:
 *       200:
 *         description: Datos de la ruta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ruta'
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/ruta/:id_ruta', RutaController.getRutaById);

/**
 * @swagger
 * /nueva-ruta:
 *   post:
 *     summary: Crea una nueva ruta
 *     description: Crea un nuevo registro de ruta en la base de datos
 *     tags: [Rutas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_ruta
 *               - id_zona_asociada
 *               - ubicaciones
 *             properties:
 *               nombre_ruta:
 *                 type: string
 *                 description: Nombre de la ruta
 *               id_zona_asociada:
 *                 type: string
 *                 description: ID de la zona asociada a la ruta
 *               ubicaciones:
 *                 type: array
 *                 description: Lista de ubicaciones que componen la ruta
 *                 items:
 *                   type: object
 *                   properties:
 *                     descripcion_punto:
 *                       type: string
 *                     coordenadas:
 *                       type: object
 *                       properties:
 *                         latitud:
 *                           type: number
 *                         longitud:
 *                           type: number
 *     responses:
 *       201:
 *         description: Ruta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Ruta creada exitosamente
 *                 id_ruta:
 *                   type: string
 *                   example: rut123
 *       500:
 *         description: Error al crear la ruta
 */
router.post('/nueva-ruta', RutaController.createRuta);

/**
 * @swagger
 * /actualizar-ruta/{id_ruta}:
 *   put:
 *     summary: Actualiza una ruta
 *     description: Actualiza los datos de una ruta existente
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id_ruta
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ruta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_ruta:
 *                 type: string
 *                 description: Nombre de la ruta
 *               id_zona_asociada:
 *                 type: string
 *                 description: ID de la zona asociada a la ruta
 *               ubicaciones:
 *                 type: array
 *                 description: Lista de ubicaciones que componen la ruta
 *                 items:
 *                   type: object
 *                   properties:
 *                     descripcion_punto:
 *                       type: string
 *                     coordenadas:
 *                       type: object
 *                       properties:
 *                         latitud:
 *                           type: number
 *                         longitud:
 *                           type: number
 *     responses:
 *       200:
 *         description: Ruta actualizada exitosamente
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error al actualizar la ruta
 */
router.put('/actualizar-ruta/:id_ruta', RutaController.updateRuta);

/**
 * @swagger
 * /eliminar-ruta/{id_ruta}:
 *   delete:
 *     summary: Elimina una ruta
 *     description: Elimina una ruta de la base de datos según su ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id_ruta
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ruta a eliminar
 *     responses:
 *       200:
 *         description: Ruta eliminada exitosamente
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error al eliminar la ruta
 */
router.delete('/eliminar-ruta/:id_ruta', RutaController.deleteRuta);

/**
 * @swagger
 * /rutas-por-zona/{id_zona}:
 *   get:
 *     summary: Obtiene las rutas asociadas a una zona
 *     description: Retorna todas las rutas que pertenecen a una zona específica
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id_zona
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la zona
 *     responses:
 *       200:
 *         description: Lista de rutas de la zona
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ruta'
 *       500:
 *         description: Error del servidor
 */
router.get('/rutas-por-zona/:id_zona', RutaController.getRutasByZona);

/**
 * @swagger
 * components:
 *   schemas:
 *     Ruta:
 *       type: object
 *       required:
 *         - id_ruta
 *         - nombre_ruta
 *         - id_zona_asociada
 *         - ubicaciones
 *         - fecha_creacion
 *       properties:
 *         id:
 *           type: string
 *           description: ID del documento en Firebase
 *         id_ruta:
 *           type: string
 *           description: ID único de la ruta
 *         nombre_ruta:
 *           type: string
 *           description: Nombre descriptivo de la ruta
 *         id_zona_asociada:
 *           type: string
 *           description: ID de la zona asociada a esta ruta
 *         ubicaciones:
 *           type: array
 *           description: Lista de ubicaciones que componen la ruta
 *           items:
 *             type: object
 *             properties:
 *               descripcion_punto:
 *                 type: string
 *                 description: Descripción del punto (nombre del lugar)
 *               coordenadas:
 *                 type: object
 *                 properties:
 *                   latitud:
 *                     type: number
 *                     description: Coordenada de latitud
 *                   longitud:
 *                     type: number
 *                     description: Coordenada de longitud
 *         fecha_creacion:
 *           type: string
 *           format: date
 *           description: Fecha en que se creó la ruta
 *         fecha_actualizacion:
 *           type: string
 *           format: date
 *           description: Fecha de la última actualización de la ruta
 */

module.exports = router;