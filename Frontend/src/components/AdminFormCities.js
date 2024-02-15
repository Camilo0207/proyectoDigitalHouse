import React, { useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import { useApi } from "../hooks/useApi";

export default function AdminFormCities({ form, setForm, errors }) {
  const { texts} = useContext(LanguageContext);

  const url = "http://localhost:8080/cities";
  // const url="http://3.144.218.41:8080/cities"
  const { db } = useApi(url);
  const handleChange = (e) => {
    setForm({
      ...form,
      city: {
        [e.target.name]: parseInt(e.target.value),
      },
    });
  };
  return (
    <>
      <label htmlFor="city">{texts.city}</label>
      <select
        className={`${errors.city ? "error_input" : ""}`}
        name={"id"}
        id={"city"}
        onChange={handleChange}
        value={form.city.id?form.city.id:texts.chooseCity}
      >
        <option disabled>
          {texts.chooseCity}
        </option>
        {db &&
          db.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
      </select>
    </>
  );
}
