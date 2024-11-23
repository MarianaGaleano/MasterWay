import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from './../../configs/FirebaseConfig';

const FAVORITES_DOC_ID = "global_favorites"; // Documento único para todos los favoritos

export const GetFavList = async () => {
    try {
        const docSnap = await getDoc(doc(db, 'favorites', FAVORITES_DOC_ID));
        if (docSnap?.exists()) {
            const data = docSnap.data();
            return data?.favorites || []; // Retorna el array de favoritos
        } else {
            // Crear un documento vacío si no existe
            await setDoc(doc(db, 'favorites', FAVORITES_DOC_ID), {
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

export const UpdateFav = async (favorites) => {
    if (!Array.isArray(favorites)) {
        console.error("Los favoritos deben ser un array");
        return;
    }

    const docRef = doc(db, 'favorites', FAVORITES_DOC_ID);
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