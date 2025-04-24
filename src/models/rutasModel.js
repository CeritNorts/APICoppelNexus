const { db } = require('../firebase');

class RutaModel {
    /**
     * Obtiene todas las rutas de la base de datos
     */
    static async getAll() {
        const querySnapshot = await db.collection('rutas').get();
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    /**
     * Busca una ruta por su ID de ruta
     * @param {string} id_ruta - ID de la ruta a buscar
     */
    static async getById(id_ruta) {
        const rutasRef = db.collection('rutas');
        const snapshot = await rutasRef.where('id_ruta', '==', id_ruta).get();

        if (snapshot.empty) {
            return null;
        }

        return {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
        };
    }

    /**
     * Crea una nueva ruta
     * @param {object} rutaData - Datos de la ruta a crear
     */
    static async create(rutaData) {
        // Generar ID aleatorio de 3 dígitos
        const randomNum = Math.floor(Math.random() * 900) + 100;
        const id_ruta = `rut${randomNum}`;

        // Obtener fecha actual en formato AAAA-MM-DD
        const fecha_creacion = new Date().toISOString().split('T')[0];

        const nuevaRuta = {
            id_ruta,
            ...rutaData,
            fecha_creacion
        };

        await db.collection('rutas').add(nuevaRuta);
        
        return {
            id_ruta,
            ...nuevaRuta
        };
    }

    /**
     * Actualiza una ruta existente
     * @param {string} id_ruta - ID de la ruta a actualizar
     * @param {object} datosActualizar - Datos actualizados de la ruta
     */
    static async update(id_ruta, datosActualizar) {
        const rutasRef = db.collection('rutas');
        const snapshot = await rutasRef.where('id_ruta', '==', id_ruta).get();
        
        if (snapshot.empty) {
            return null;
        }
        
        const docRef = snapshot.docs[0].ref;
        const datosConFecha = {
            ...datosActualizar,
            fecha_actualizacion: new Date().toISOString().split('T')[0]
        };
        
        await docRef.update(datosConFecha);
        
        return {
            id_ruta,
            ...datosConFecha
        };
    }

    /**
     * Elimina una ruta
     * @param {string} id_ruta - ID de la ruta a eliminar
     */
    static async delete(id_ruta) {
        const rutasRef = db.collection('rutas');
        const snapshot = await rutasRef.where('id_ruta', '==', id_ruta).get();
        
        if (snapshot.empty) {
            return false;
        }
        
        await snapshot.docs[0].ref.delete();
        return true;
    }

    /**
     * Obtiene las rutas asociadas a una zona
     * @param {string} id_zona - ID de la zona
     */
    static async getRutasByZona(id_zona) {
        const rutasRef = db.collection('rutas');
        const snapshot = await rutasRef.where('id_zona_asociada', '==', id_zona).get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
}

module.exports = RutaModel;