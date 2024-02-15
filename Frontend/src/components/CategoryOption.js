import { useContext, useEffect, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import { useApi } from "../hooks/useApi";
import CategoryOptionItems from "./CategoryOptionItems";
import styles from "../styles/CategoryOption.module.css";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const ITEMS_PER_PAGE = 4;

export default function CategoryOption({idCategory,setIdCategory,countryOption,setHotelOptions,hotelOptions,recomendation,setRecomendation}) {
  // const [url, setUrl] = useState(`http://3.144.218.41:8080/`);
  const [url, setUrl] = useState(`http://localhost:8080/`)
  const { db } = useApi(url);
  const [items, setItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { texts, language } = useContext(LanguageContext);
  const [nameHotel, setnameHotel] = useState("");

  useEffect(() => {
    if(recomendation){
      setUrl(`http://localhost:8080/`)
      // setUrl(`http://3.144.218.41:8080/`)
      setIdCategory("")
      setHotelOptions(`${texts.recommendations}`);
    }
  }, [recomendation])
  
  useEffect(() => {
    if (db) {
      setItems([...db].splice(0, ITEMS_PER_PAGE));
      setCurrentIndex(0);
      setCurrentPage(1);
    }
  }, [db]);

  useEffect(() => {
    if (
      hotelOptions === "Recomendaciones" ||
      hotelOptions === "Recommendations"
    ) {
      setHotelOptions(texts.recommendations);
    }
    if (
      hotelOptions === `Resultados de ${idCategory}` ||
      hotelOptions === `Results of ${idCategory}`
    ) {
      setHotelOptions(`${texts.resultsOf} ${idCategory}`);
    }
    if (
      hotelOptions === `Resultados de ${nameHotel}` ||
      hotelOptions === `Results of ${nameHotel}`
    ) {
      setHotelOptions(`${texts.resultsOf} ${nameHotel}`);
    }
  }, [language]);

  useEffect(() => {
    if (idCategory) {
      // setUrl(`http://3.144.218.41:8080/products/category/${idCategory}`);
      setUrl(`http://localhost:8080/products/category/${idCategory}`)
      setHotelOptions(`${texts.resultsOf} ${idCategory}`);
      setRecomendation(false)
    }
  }, [idCategory]);

  useEffect(() => {
    if (!countryOption) {
      return;
    } else {
      setUrl(
        // `http://localhost:8080/products/products-enabled/${countryOption.idDestiny}/${countryOption.checkIn}/${countryOption.checkOut}`
        `http://3.144.218.41:8080/products/products-enabled/${countryOption.idDestiny}/${countryOption.checkIn}/${countryOption.checkOut}`
      );
      setHotelOptions(`${texts.resultsOf} ${countryOption.destiny}`);
      setnameHotel(countryOption.destiny);
      setIdCategory("")
    }
  }, [countryOption]);

  const nextHandler = () => {
    const totalElementos = db.length;
    const nextPage = currentIndex + 1;
    const firstIndex = nextPage * ITEMS_PER_PAGE;
    if (firstIndex >= totalElementos) return;

    setItems([...db].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentIndex(nextPage);
    setCurrentPage(currentPage + 1);
  };

  const prevHandler = () => {
    const prevPage = currentIndex - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * ITEMS_PER_PAGE;
    setItems([...db].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentIndex(prevPage);
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className={styles.products_box}>
        {items &&
          items.map((el) => <CategoryOptionItems key={el.id} item={el} />)}
      </div>
      <div className={styles.button_next_prev}>
        <IoIosArrowDropleftCircle
          className={styles.icon}
          onClick={prevHandler}
        />
        <h4>{texts.page}: {currentPage}</h4>
        <IoIosArrowDroprightCircle
          className={styles.icon}
          onClick={nextHandler}
        />
      </div>
    </>
  );
}
