import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { db } from '../../BE/Firebase';
import { getUserFromLocalStorage } from '../Login/UserManager';
import { addDoc, doc, collection, deleteDoc, setDoc, onSnapshot, query, where } from 'firebase/firestore';


export const FavoritesContext = createContext({
    favorites: [] as any[],
    favoritesIds: [] as string[],
    onFavorite: (burger: any) => { },
    onUnFavorite: (place_id: string) => { }
});


interface propTypes {
    children: ReactNode;
}

export const FavoritesContextProvider = (props: propTypes) => {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [favoritesIds, setFavoritesId] = useState<string[]>([]);
    const user = getUserFromLocalStorage();
    useEffect(() => {
        let unsubscribe = () => {

        };
        if (!user) {
            if (favorites.length > 0) {
                setFavorites([]);
                setFavoritesId([])
            }
            return unsubscribe();
        }
        console.log(user.uid)
        const q = query(collection(db, "favorites"), where("userId", "==", user.uid));
        unsubscribe = onSnapshot(q, snapshot => {
            const favoritesIds = [] as string[];
            const favorites = snapshot.docs.map(doc => {
                const data = doc.data();
                favoritesIds.push(data.place_id);
                return data;
            })
            setFavorites(favorites);
            setFavoritesId(favoritesIds);
        });
        return () => unsubscribe()

        // const unsub = onSnapshot(collection(db, "favorites"), (snapshot) => {
        // });
    }, [user])

    const onFavorite = (burger: any) => {
        if (!user) return;
        const data = { ...burger, userId: user.uid };
        setDoc(doc(db, 'favorites', data.place_id), data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const onUnFavorite = (place_id: string) => {
        if (!user) return
        deleteDoc(doc(db, 'favorites', place_id))
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <FavoritesContext.Provider value={{ favorites, favoritesIds, onFavorite, onUnFavorite }}>
            {props.children}
        </FavoritesContext.Provider>
    )
}