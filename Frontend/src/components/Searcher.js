import React, { useContext, useState } from "react";
import { helpValidaciones } from "../helpers/helpValidaciones";
import { useApi } from "../hooks/useApi";
import styles from "../styles/Searcher.module.css";
import Calendar from "./Calendar";
import location from "../assets/img/location1.png";
import optionLocation from "../assets/img/optionLocation.png";
import LanguageContext from "../context/LanguageContext";
import { Link, animateScroll as scroll } from "react-scroll";

export default function Searcher({
  changeCountryOption,
  form,
  setForm,
  initialForm,
  moveToSection
}) {
  // const url = "http://3.144.218.41:8080/cities";
  const url = "http://localhost:8080/cities";
  const { db } = useApi(url);
  const [errors, setErrors] = useState({});
  const { validateFormMenu } = helpValidaciones();
  const [openOptions, setOpenOptions] = useState(false);
  const { texts } = useContext(LanguageContext);

  const handleSelectOption = (name, id) => {
    setForm({
      ...form,
      destiny: name,
      idDestiny: id,
    });
    handleOptions();
  };

  const handleOptions = () => {
    setOpenOptions(!openOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateFormMenu(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      changeCountryOption(form);
      setForm(initialForm);
      setTimeout(() => {
        moveToSection()
      }, 500);
    } else {
      return;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{texts.searchHotel}</h2>
        <h2> {texts.housesAndMuch}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.options_destiny}>
          <div
            data-testid="selectOption"
            className={styles.info_destiny}
            onClick={handleOptions}
          >
            <img src={location} alt="imagen de localizacion" />
            {<p>{form.destiny ? form.destiny : `${texts.whereWeGo}`}</p>}
          </div>
          {errors.destiny && <p className={styles.error}>{errors.destiny}</p>}

          {db && openOptions && (
            <ul>
              {db &&
                db.map((el) => (
                  <li
                    key={el.id}
                    onClick={() => handleSelectOption(el.name, el.id)}
                  >
                    <img src={optionLocation} alt="imagen de ubicacion" />
                    <div>
                      <p className={styles.state_name}>{el.name}</p>
                      <p className={styles.country_name}>Argentina</p>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className={styles.calendar}>
          <div>
            <Calendar setForm={setForm} form={form} />
          </div>
          {errors.checkInOut && (
            <p className={styles.error}>{errors.checkInOut}</p>
          )}
        </div>

        <div className={styles.btn_submit}>
          <input type={"submit"} value={`${texts.search}`} />
        </div>
      </form>
    </div>
  );
}
