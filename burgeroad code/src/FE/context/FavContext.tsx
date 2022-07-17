import React, { createContext, ReactNode, useEffect, useState } from "react";
import { db } from "../../BE/Firebase";
import { getUserFromLocalStorage } from "../Login/UserManager";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const FavoritesContext = createContext({
  favorites: [] as any[],
  favoritesIds: [] as string[],
  loadingContext: [] as boolean[],
  onFavorite: (e: any, burger: any) => {},
  onUnFavorite: (e: any, place_id: string) => {},
});

interface propTypes {
  children: ReactNode;
}

export const FavoritesContextProvider = (props: propTypes) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [favoritesIds, setFavoritesId] = useState<string[]>([]);
  const [loadingContext, setLoadingContext] = useState<any[]>([true]);
  const user = getUserFromLocalStorage();
  const [userLogin, setUserLogin] = useState<any>(user);

  useEffect(() => {
    let unsubscribe = () => {};
    if (!user) {
      if (favorites.length > 0) {
        setFavorites([]);
        setFavoritesId([]);
        setLoadingContext([false]);
      }
      return unsubscribe();
    }
    console.log("use id is:", user.uid);
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", user.uid)
    );
    unsubscribe = onSnapshot(q, (snapshot) => {
      const favoritesIds = [] as string[];
      const favorites = snapshot?.docs?.map((doc) => {
        const data = doc.data();
        favoritesIds.push(data.place_id);
        return data;
      });
      setFavorites(favorites);
      setFavoritesId(favoritesIds);
      setLoadingContext([false]);
    });
    return () => unsubscribe();

    // const unsub = onSnapshot(collection(db, "favorites"), (snapshot) => {
    // });
  }, [userLogin]);

  const onFavorite = (e: any, burger: any) => {
    e.stopPropagation();
    if (!user) return;
    const data = { ...burger, userId: user.uid };
    setDoc(doc(db, "favorites", data.place_id), data)
      .then((res) => console.log(res))
      .catch((err) => console.log("error in onFavorite", err));
  };

  const onUnFavorite = (e: any, place_id: string) => {
    e.stopPropagation();
    if (!user) return;
    deleteDoc(doc(db, "favorites", place_id))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <FavoritesContext.Provider
      value={{
        loadingContext,
        favorites,
        favoritesIds,
        onFavorite,
        onUnFavorite,
      }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
};
