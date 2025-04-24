const { db } = require('../firebase');

class ZonaModel {
    /**
     * Crea una nueva zona en la base de datos
     * @param {object} zonaData - Datos de la zona a crear
     * @returns {object} - Objeto con el mensaje y el ID de la zona creada
     */
    static async create(zonaData) {
        const { nombre_zona, estado, municipios_incluidos, codigos_postales_relacionados } = zonaData;

        const randomNum = Math.floor(Math.random() * 900) + 100;
        const id_zona = `me${randomNum}`;

        const nuevaZona = {
            id_zona,
            nombre_zona,
            estado,
            municipios_incluidos: municipios_incluidos || [],
            codigos_postales_relacionados: codigos_postales_relacionados || []
        };

        await db.collection('zonas').add(nuevaZona);
        
        return {
            id_zona,
            ...nuevaZona
        };
    }

    /**
     * Obtiene todas las zonas de la base de datos
     * @returns {Array} - Lista de todas las zonas
     */
    static async getAll() {
        const snapshot = await db.collection('zonas').get();
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    /**
     * Obtiene una zona por su ID
     * @param {string} id_zona - ID de la zona a buscar
     * @returns {object|null} - Datos de la zona o null si no se encuentra
     */
    static async getById(id_zona) {
        const zonasRef = db.collection('zonas');
        const snapshot = await zonasRef.where('id_zona', '==', id_zona).get();

        if (snapshot.empty) {
            return null;
        }

        return {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
        };
    }

    /**
     * Actualiza los datos de una zona existente
     * @param {string} id_zona - ID de la zona a actualizar
     * @param {object} updateData - Datos a actualizar
     * @returns {object|null} - Resultado de la actualización o null si no se encuentra
     */
    static async update(id_zona, updateData) {
        const zonasRef = db.collection('zonas');
        const snapshot = await zonasRef.where('id_zona', '==', id_zona).get();

        if (snapshot.empty) {
            return null;
        }

        const filteredUpdateData = {};
        
        // Solo incluir los campos que se proporcionan
        if (updateData.nombre_zona) filteredUpdateData.nombre_zona = updateData.nombre_zona;
        if (updateData.estado) filteredUpdateData.estado = updateData.estado;
        if (updateData.municipios_incluidos) filteredUpdateData.municipios_incluidos = updateData.municipios_incluidos;
        if (updateData.codigos_postales_relacionados) filteredUpdateData.codigos_postales_relacionados = updateData.codigos_postales_relacionados;

        // Actualizar el documento
        await snapshot.docs[0].ref.update(filteredUpdateData);
        
        return {
            id_zona,
            ...filteredUpdateData
        };
    }

    /**
     * Elimina una zona de la base de datos
     * @param {string} id_zona - ID de la zona a eliminar
     * @returns {boolean} - true si se eliminó correctamente, false si no se encontró
     */
    static async delete(id_zona) {
        const zonasRef = db.collection('zonas');
        const snapshot = await zonasRef.where('id_zona', '==', id_zona).get();

        if (snapshot.empty) {
            return false;
        }

        const deletes = [];
        snapshot.forEach(doc => {
            deletes.push(doc.ref.delete());
        });

        await Promise.all(deletes);
        return true;
    }
}

module.exports = ZonaModel;