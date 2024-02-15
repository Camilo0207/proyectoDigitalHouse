import React, { useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import { useApi } from "../hooks/useApi";

export default function AdminFormCategories({ setForm, form, errors }) {
  const { texts} = useContext(LanguageContext);
  const url = "http://localhost:8080/categories";
  // const url="http://3.144.218.41:8080/categories"
  const { db } = useApi(url);


  const handleChange = (e) => {
    setForm({
      ...form,
      category: {
        [e.target.name]: parseInt(e.target.value),
      },
    });
  };
  return (
    <>
      <label htmlFor="categories">{texts.categories}</label>
      <select
        className={`${errors.category ? "error_input" : ""}`}
        name={"id"}
        id={"categories"}
        onChange={handleChange}
        value={form.category.id?form.category.id:texts.chooseCategory}
      >
        <option  disabled>
          {texts.chooseCategory}
        </option>
        {db &&
          db.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
      </select>
    </>
  );
}
