import React, { useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import styles from "../styles/ProductDetailsInfo.module.css";
import stylesCalendarBookingProduct from "../styles/CalendarBookingProduct.module.css";
import beforeIcon from "../assets/img/beforeIcon.png";
import locationImg from "../assets/img/location1.png";
import star from "../assets/img/star.png";
import ProductDetailsServices from "./ProductDetailsServices";
import LanguageContext from "../context/LanguageContext";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { useModal } from "../hooks/useModal";
import ModalPortal from "./ModalPortal";
import Slider from "./Slider";
import { useResizeScroll } from "../hooks/useResizeScroll";
import CalendarBookingProduct from "./CalendarBookingProduct";
import Loader from "./Loader";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import ProductDetailsPhotos from "./ProductDetailsPhotos";
import ProductDetailsShare from "./ProductDetailsShare";
import ProductDetailsHotelName from "./ProductDetailsHotelName";
import ProductDetailsPolitics from "./ProductDetailsPolitics";
import FavoriteContext from "../context/FavoriteContext";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { AiTwotoneHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import MessageContext from '../context/MessageContext';


export default function ProductDetailsInfo({ infoItem }) {
  // const url = `http://3.144.218.41:8080/products/${infoItem}`;
  const url = `http://localhost:8080/products/${infoItem}`;
  const { loading, db } = useApi(url);
  const { texts } = useContext(LanguageContext);
  const [hotelCalifacation, setHotelCalifacation] = useState("");
  const [isOpenPortal, openModalPortal, closeModalPortal] = useModal(false);
  const { width } = useResizeScroll();
  const [open, close] = useBodyScrollLock();
  const [openShare, setOpenShare] = useState(false);
  const { favorites, addToFavorites, deleteFromFavorites } =
    useContext(FavoriteContext);
  const [favorite, setFavorite] = useState(false);
  const { user } = useSessionStorage("userData");
  const favoriteFound = favorites.find((el) => el.id === parseInt(infoItem));
  const [noLoginMsg, setNoLoginMsg] = useState(false);
  const { toggleMessage} = useContext(MessageContext);

  useEffect(() => {
    if (user && favoriteFound) {
      setFavorite(true);
    }
  }, [user]);

  const toggleFavorite = () => {
    if (favorite && user) {
      deleteFromFavorites(db);
      setFavorite(false);
    }
    if (!favorite && user) {
      addToFavorites(db);
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
    loading ? open() : close();
  }, [loading]);

  useEffect(() => {
    if (db) {
      switch (db.starts) {
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
    }
  }, [db]);

  const stars = () => {
    const newStars = [];
    for (let i = 0; i < db.starts; i++) {
      newStars.push({ id: i, star });
    }
    return newStars;
  };
  const openShareFunction = (e) => {
    setOpenShare(!openShare);
    e.stopPropagation();
  };

  return (
    <>
      {loading && <Loader />}
      {db && (
        <div className={styles.container} onClick={() => setOpenShare(false)}>
          <ProductDetailsHotelName db={db} />

          <div className={styles.ubication_data}>
            <div className={styles.location_info}>
              <img src={locationImg} alt="imagen de localizacion" />
              <p>{db.city.name}, Argentina</p>
            </div>

            <div className={styles.calification_box}>
              <div className={styles.stars_imgs}>
                <p>{hotelCalifacation}</p>
                  {db &&
                    stars().map((el) => (
                      <img key={el.id} src={el.star} alt={"star"} />
                    ))}
                
              </div>
              <div className={styles.calification_number}>
                <p>{db.score}</p>
              </div>
            </div>
          </div>

          <div className={styles.images_block}>
            <div className={styles.icons_box}>
              {favorite ? (
                <AiTwotoneHeart
                  onClick={toggleFavorite}
                  className={styles.favorite}
                />
              ) : (
                <AiOutlineHeart
                  onClick={toggleFavorite}
                  onMouseOver={() => (!user ? setNoLoginMsg(true) : "")}
                  onMouseLeave={() => (!user ? setNoLoginMsg(false) : "")}
                  className={styles.icon}
                />
              )}
              {noLoginMsg && <p>{texts.YouMustLogIn}</p>}

              <FiShare2 onClick={openShareFunction} className={styles.icon} />
              {openShare && (
                <div className={styles.share_box}>
                  <ProductDetailsShare id={db.id} />
                </div>
              )}
              {user && user.rol.id===4 &&
                <Link to={`/administration/${infoItem}`}>
                  <FiSettings className={styles.icon}/>
                </Link>
              }
            </div>

            {width >= 769 ? (
              <div className={styles.hotel_images}>
                <ProductDetailsPhotos
                  id={db.id}
                  openModalPortal={openModalPortal}
                />
                <ModalPortal
                  isOpen={isOpenPortal}
                  closeModal={closeModalPortal}
                >
                  <div className={styles.modal_box}>
                    <Slider
                      controles={true}
                      autoplay={false}
                      velocidad="500"
                      intervalo="5000"
                      id={db.id}
                    />
                  </div>
                </ModalPortal>
              </div>
            ) : (
              <div className={styles.slider}>
                <Slider
                  controles={false}
                  autoplay={true}
                  velocidad="4000"
                  intervalo="6000"
                  id={db.id}
                />
              </div>
            )}
          </div>

          <div className={styles.description_hotel}>
            <h2>{texts.stayAt} {db.city.name}</h2>
            <p>{db.description}</p>
          </div>

          <div className={styles.caracteristics}>
            <h2>{texts.hotelDeals}</h2>
            <div className={styles.services_list}>
              <ProductDetailsServices infoItem={infoItem}/>
            </div>
          </div>

          <div className={styles.calendar}>
            <h2 className={stylesCalendarBookingProduct.titleDate}>{texts.availableDates}</h2>
            <div className={stylesCalendarBookingProduct.calendarContainer}>
              <CalendarBookingProduct infoItem={infoItem} />
              <div className={stylesCalendarBookingProduct.reserveContainer}>
                <p>{texts.addDates}</p>
                <Link onClick={() => toggleMessage(true, infoItem)} to={user?`/reservation/${infoItem}`:`/login`} >
                  {/* to={`/reservation/${infoItem}`} */}
                  <button className={stylesCalendarBookingProduct.btnReserve}>{texts.startReservation}</button>
                </Link> 
              </div>
            </div>
          </div>
          <ProductDetailsPolitics db={db} />
        </div>
      )}
    </>
  );
}
