import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth } from './../../configs/FirebaseConfig'; // Asegúrate de tener acceso al usuario autenticado
import { db } from './../../configs/FirebaseConfig';

export const GetFavList = async () => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado.");

        const docRef = doc(db, 'favorites', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap?.exists()) {
            const data = docSnap.data();
            return data?.favorites || []; // Retorna el array de favoritos
        } else {
            // Crear un documento vacío si no existe
            await setDoc(docRef, {
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

    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuario no autenticado.");

        const docRef = doc(db, 'favorites', user.uid);
        await updateDoc(docRef, { favorites });
    } catch (error) {
        console.error("Error al actualizar la lista de favoritos:", error);
    }
};

export default {
    GetFavList,
    UpdateFav
};
