import React, { useContext, useEffect, useState} from "react";
import styles from "../styles/ProductDetailsServices.module.css";
import LanguageContext from "../context/LanguageContext";
import { useApi } from "../hooks/useApi";

export default function ProductDetailsServices({infoItem,productMain = false,}) {
  const url = `http://localhost:8080/featuresproduct/${infoItem}`;
  // const url = `http://3.144.218.41:8080/featuresproduct/${infoItem}`;
  const { db } = useApi(url);
  const { language} = useContext(LanguageContext);
  

  return (
    <>
      {db &&
        (productMain
          ? db.map((el) => (
              <div className={styles.product_main} key={el.id}>
                <i className={`${el.imageUrl} ${styles.icon_main}`}></i>
              </div>
            ))
          : language === "es"
            ?(db.map((el) => (
              <div className={styles.services} key={el.id}>
                <i className={`${el.imageUrl} ${styles.icon_services}`}></i>
                <p>{el.name}</p>
              </div>
            )))
            :(db.map((el) => (
              <div className={styles.services} key={el.id}>
                <i className={`${el.imageUrl} ${styles.icon_services}`}></i>
                <p>{el.name}</p>
              </div>
            )))
            )
            }
    </>
  );
}
