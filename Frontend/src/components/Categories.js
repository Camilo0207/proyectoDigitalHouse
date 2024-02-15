import React, { forwardRef, useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import CategoriesItem from "./CategoriesItem";
import styles from "../styles/Categories.module.css";
import CategoryOption from "./CategoryOption";
import LanguageContext from "../context/LanguageContext";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import Loader from "./Loader";

 function Categories({ countryOption ,recomendation,setRecomendation},ref) {
  // const url = "http://3.144.218.41:8080/categories";
  const url = "http://localhost:8080/categories";
  const { loading, db } = useApi(url);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { texts } = useContext(LanguageContext);
  const [hotelOptions, setHotelOptions] = useState(texts.recommendations);
  const [open, close] = useBodyScrollLock();

  useEffect(() => {
    loading ? open() : close();
  }, [loading]);

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.categories_box}>
        <h3 className={styles.searchText}>{texts.typeOfAccommodation}</h3>
        <div className={styles.container_elements}>
          {db &&
            db.map((el) => (
              <CategoriesItem
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                key={el.id}
                item={el}
              />
            ))}
        </div>
      </div>

      <div id="section1" className={styles.containerRecomendationsAndOptions} ref={ref} >
        <h3>{hotelOptions}</h3>
        <div className={styles.containerOptions}>
          <CategoryOption
            idCategory={selectedCategory}
            setIdCategory={setSelectedCategory}
            countryOption={countryOption}
            setHotelOptions={setHotelOptions}
            hotelOptions={hotelOptions}
            recomendation={recomendation}
            setRecomendation={setRecomendation}
          />
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Categories)
