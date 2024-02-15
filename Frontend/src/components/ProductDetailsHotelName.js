import React from 'react'
import { Link } from 'react-router-dom';
import beforeIcon from "../assets/img/beforeIcon.png";
import styles from "../styles/ProductDetailsHotelName.module.css";


export default function ProductDetailsHotelName({db,phrase=null}) {
  return (
    <div className={styles.title_category_box}>

        <div className={styles.title_category_info}>
          {db&&
            <>
              <p className={styles.hotel_category}>{db.category.title}</p>
              <p className={styles.hotel_name}>{db.name}</p>
            </>
          }
          {phrase&&
              <p className={styles.hotel_category}>{phrase}</p>
          }
          </div>
          <div>
            <Link to={"/"}>
              <img src={beforeIcon} alt="imagen de logo para devolver" />
            </Link>
        </div>
    </div>
  )
}
