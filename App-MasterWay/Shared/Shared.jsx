import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from './../configs/FirebaseConfig';

export const GetFavList = async (user) => {
    try {
        const userEmail = user?.primaryEmailAddress?.emailAddress; // Obtener el email del usuario

        // Asegúrate de que el email esté definido antes de hacer la consulta
        if (!userEmail) {
            console.error("User email is undefined");
            return { favorites: [] }; // Retornar un objeto con un array vacío
        }

        const docSnap = await getDoc(doc(db, 'UserFavorite', userEmail));
        if (docSnap?.exists()) {
            return docSnap.data();
        } else {
            await setDoc(doc(db, 'UserFavorite', userEmail), {
                email: userEmail,
                favorites: []
            });
            return { favorites: [] }; // Retorna un objeto con un array vacío
        }
    } catch (error) {
        console.error("Error al obtener la lista de favoritos:", error);
        return { favorites: [] }; // En caso de error, devuelve un array vacío
    }
};

export const UpdateFav = async (user, favorites) => {
    // Verifica que favorites sea un array
    if (!Array.isArray(favorites)) {
        console.error("Favorites must be an array");
        return; // Salir si favorites no es un array
    }

    const userEmail = user?.primaryEmailAddress?.emailAddress; // Obtener el email del usuario
    // Asegúrate de que el email esté definido
    if (!userEmail) {
        console.error("User email is undefined");
        return; // Salir si el email del usuario es undefined
    }

    const docRef = doc(db, 'UserFavorite', userEmail);
    try {
        await updateDoc(docRef, {
            favorites: favorites
        });
    } catch (error) {
        console.error("Error al actualizar la lista de favoritos:", error);
    }
};

export default {
    GetFavList,
    UpdateFav
};

