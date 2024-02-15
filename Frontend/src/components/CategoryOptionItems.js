import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/CategoryOptionItems.module.css";
import star from "../assets/img/star.png";
import ubication from "../assets/img/ubication.png";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import LanguageContext from "../context/LanguageContext";
import { AiTwotoneHeart } from "react-icons/ai";
import FavoriteContext from "../context/FavoriteContext";
import { useSessionStorage } from "../hooks/useSessionStorage";
import ProductDetailsServices from "./ProductDetailsServices";

export default function CategoryOptionItems({ item }) {
  const { id, category, name, address1, description, starts, score } = item;
  const [hotelCalifacation, setHotelCalifacation] = useState("");
  // const url = `http://3.144.218.41:8080/images/${id}`;
  // const url = `http://3.144.218.41:8080/images/imagesproduct/${id}`;
  const url = `http://localhost:8080/images/imagesproduct/${id}`;
  const { texts,language} = useContext(LanguageContext);
  const [favorite, setFavorite] = useState(false);
  const { favorites, addToFavorites, deleteFromFavorites } =
    useContext(FavoriteContext);
  const { user } = useSessionStorage("userData");
  const favoriteFound = favorites.find((el) => el.id === id);
  const { db } = useApi(url);
  const [noLoginMsg, setNoLoginMsg] = useState(false);

  useEffect(() => {
    if (user && favoriteFound) {
      setFavorite(true);
    }
  }, [user]);

  const toggleFavorite = () => {
    if (favorite && user) {
      deleteFromFavorites(item);
      setFavorite(false);
    }
    if (!favorite && user) {
      addToFavorites(item);
      setFavorite(true);
    }
    if (!user) {
      setNoLoginMsg(true);
      setTimeout(() => {
        setNoLoginMsg(false);
      }, 1500);
    }
  };

  useEffect(() => {
    switch (starts) {
      case 1:
        setHotelCalifacation(texts.veryBad);
        break;
      case 2:
        setHotelCalifacation(texts.bad);
        break;
      case 3:
        setHotelCalifacation(texts.regular);
        break;
      case 4:
        setHotelCalifacation(texts.good);
        break;
      case 5:
        setHotelCalifacation(texts.veryGood);
        break;

      default:
        break;
    }
  }, [item,language]);

  const stars = () => {
    const newStars = [];
    for (let i = 0; i < starts; i++) {
      newStars.push({ id: i, star });
    }
    return newStars;
  };
  return (
    <div className={styles.card}>
      <div className={styles.img_card}>
        {db && db.length > 0 && (
          <img
            className={styles.image_hotel}
            src={db[0].imageUrl}
            alt="img hotel"
          />
        )}
        <AiTwotoneHeart
          onClick={toggleFavorite}
          onMouseOver={() => (!user ? setNoLoginMsg(true) : "")}
          onMouseLeave={() => (!user ? setNoLoginMsg(false) : "")}
          className={`${styles.heart_img} ${favorite ? styles.favorite : ""}`}
        />
        {noLoginMsg && <p>{texts.YouMustLogIn}</p>}
      </div>

      <div className={styles.info_hotel}>
        <div className={styles.name_stars_calification}>
          <div className={styles.name_stars}>
            <div className={styles.stars_box}>
              <p>{category.title}</p>
              <div>
                {item &&
                  stars().map((el) => (
                    <img key={el.id} src={el.star} alt={"star"} />
                  ))}
              </div>
            </div>
            <p className={styles.name_product}>{name}</p>
          </div>

          <div className={styles.calification}>
            <div>
              <p>{score}</p>
            </div>
            <p>{hotelCalifacation}</p>
          </div>
        </div>

        <div className={styles.hotel_location}>
          <img src={ubication} alt="ubication" />
          <p>
            {address1} 
            {/* - <span>{texts.showMap}</span> */}
          </p>
        </div>

        <div className={styles.services}>
          <ProductDetailsServices infoItem={id} productMain={true}/>
        </div>

        <div className={styles.description_hotel}>
          <p>{description}</p>
        </div>
        <Link to={`/productDetails/${id}`}>
          <button>{texts.seeMore}</button>
        </Link>
      </div>
    </div>
  );
}
