import React, { useContext } from 'react'
import FavoriteContext from '../context/FavoriteContext'
import CategoryOptionItems from './CategoryOptionItems'
import styles from "../styles/FavoritesContainer.module.css"
import { BsTrash } from 'react-icons/bs';
import LanguageContext from '../context/LanguageContext';

export default function FavoritesContainer() {
    const {favorites, deleteAllFavorites}=useContext(FavoriteContext)
    const { texts } = useContext(LanguageContext);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>{texts.favorites} {favorites.length}</p>
        <BsTrash className={styles.icon} onClick={deleteAllFavorites}/>
      </div>
      <div className={styles.main_box}>
          {favorites.length > 0 
            ?(
              favorites.map(el=>(
                  <CategoryOptionItems key={el.id} item={el} />
              ))
            )
            :(
              <div className={styles.message}>
                <h3>{texts.favoritesMsg}</h3>
              </div>
            )
          }
      </div>
    </div>
  )
}
