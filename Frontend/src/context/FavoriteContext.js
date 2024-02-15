import { useEffect, useState } from "react";
import { createContext } from "react";

const FavoriteContext = createContext();
const initialFavorites = [];

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(initialFavorites);
    

  const addToFavorites = (item) => {
    const findItem = favorites.find((el) => el.id === item.id);
    if(!findItem)setFavorites([...favorites, item])
  };

  const deleteFromFavorites = (item) => {
     setFavorites(favorites.filter((el) => el.id !== item.id));
    }
  

  const deleteAllFavorites=()=>{
    setFavorites(initialFavorites)
  }

  const data = { favorites, addToFavorites, deleteFromFavorites, deleteAllFavorites };
  return <FavoriteContext.Provider value={data}>{children}</FavoriteContext.Provider>;
};

export { FavoritesProvider };
export default FavoriteContext;