import React, { useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import locationImg from "../assets/img/location1.png";
import styles from "../styles/ReserveDetail.module.css";
import star from "../assets/img/star.png";
import Loader from "./Loader";

export default function ReserveDetail({ infoItem, db,loading,handleSubmit,dateForBack}) {
  const { texts } = useContext(LanguageContext);

  const stars = () => {
    const newStars = [];
    for (let i = 0; i < db.starts; i++) {
      newStars.push({ id: i, star });
    }
    return newStars;
  };
  

  return (
    <>
      {loading && <Loader />}
      {db && (
          <div className={styles.container}>
            <p className={styles.titleReserveDetail}>{texts.ReserveDetail}</p>
            <div className={styles.main_box}>
              <div className={styles.image}>
                <img className={styles.imgDataReserve} src={db.category.imageUrl} alt="imagen de categoria"/>
              </div>

              <div className={styles.dateReserveContainer}>
                <p className={styles.category}>{db.category.title}</p>
                <p className={styles.hotel_name}>{db.name}</p>
                <div className={styles.stars}>
                  {
                    stars().map((el) => (
                      <img key={el.id} src={el.star} alt={"star"} />
                    ))
                  }
                </div>
                <div className={styles.ubicationReserveDetail}>
                  <img src={locationImg} alt="imagen de localizacion" />
                  <p>{db.city.name},</p>
                </div>
                <div className={styles.checkContainer}>
                  <span>{texts.CheckIn}</span>
                  <span>{dateForBack.checkIn}</span>
                </div>
                <div className={styles.checkContainer}>
                  <span>{texts.CheckOut}</span>
                  <span>{dateForBack.checkOut}</span>
                </div>
                <button onClick={handleSubmit} className={styles.btnConfirmReserve}>
                  {texts.confirmBooking}
                </button>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
