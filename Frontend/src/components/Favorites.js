import FavoritesContainer from '../components/FavoritesContainer'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from "../styles/Favorites.module.css"

export default function Favorites() {
    return (
      <div className={styles.container}>
          <Header/>
          <FavoritesContainer/>
          <Footer/>
      </div>
    )
  }