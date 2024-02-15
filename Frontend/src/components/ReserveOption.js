import React, { useContext } from 'react'
import LanguageContext from "../context/LanguageContext";
import locationImg from "../assets/img/location1.png";
import styles from '../styles/ReserveOption.module.css'


export default function ReserveOption({ item }) {
  const { texts } = useContext(LanguageContext);
  return (
      <div className={styles.containerReserveOption}>
        <div className={styles.dateReserveContainer}>
          <div className={styles.containerImg}>
            <img className={styles.imgDataReserve} src={item.product.category.imageUrl} alt="imagen" />
            <p>{item.product.category.title}</p>
            <h4>{item.product.name}</h4>
          </div>
          <div className={styles.ubicationReserveDetail}>
            <img className={styles.imgLocation} style={{width:'15px'}} src={locationImg} alt="imagen de localizacion" />
            <p>{item.product.city.name},</p>
          </div>
          <div className={styles.checkContainer}>
            <span>{texts.CheckIn}</span>
            <span>{item.checkIn}</span>
          </div>
          <div className={styles.checkContainer}>
            <span>{texts.CheckOut}</span>
            <span>{item.checkOut}</span>
          </div>
        </div>
      </div>
  )
}
