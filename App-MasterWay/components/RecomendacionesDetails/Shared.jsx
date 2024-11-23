import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from './../../configs/FirebaseConfig';

// Obtener lista de favoritos de un usuario específico
export const GetFavList = async (userId) => {
    try {
        const docSnap = await getDoc(doc(db, 'favorites', userId)); // Usa el userId como documento
        if (docSnap?.exists()) {
            const data = docSnap.data();
            return data?.favorites || []; // Retorna el array de favoritos
        } else {
            // Crear un documento vacío si no existe
            await setDoc(doc(db, 'favorites', userId), {
                favorites: [],
                createdAt: new Date().toISOString(),
            });
            return [];
        }
    } catch (error) {
        console.error("Error al obtener la lista de favoritos:", error);
        return [];
    }
};

// Actualizar lista de favoritos de un usuario específico
export const UpdateFav = async (favorites, userId) => {
    if (!Array.isArray(favorites)) {
        console.error("Los favoritos deben ser un array");
        return;
    }

    const docRef = doc(db, 'favorites', userId); // Usa el userId como documento
    try {
        await updateDoc(docRef, { favorites });
    } catch (error) {
        console.error("Error al actualizar la lista de favoritos:", error);
    }
};

export default {
    GetFavList,
    UpdateFav
};
