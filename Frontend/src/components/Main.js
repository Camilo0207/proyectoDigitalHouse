import React, { useEffect, useRef, useState } from "react";
import Categories from "./Categories";
import Searcher from "./Searcher";
import styles from "../styles/Main.module.css";

const initialForm = {
  destiny: "",
  checkIn: "",
  checkOut: "",
  idDestiny:""
};

export default function Main({recomendation,setRecomendation}) {
  const [form, setForm] = useState(initialForm);
  const [countryOption, setCountryOption] = useState(null);

 
  const ref = useRef(null)
  
  const moveToSection=()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  }

  const changeCountryOption = (form) => {
    let newCheckin= form.checkIn.toLocaleDateString("fr-CA")
    let newCheckout= form.checkOut.toLocaleDateString("fr-CA")
    form.checkIn=newCheckin
    form.checkOut=newCheckout
    setCountryOption(form);
  };

  return (
    <div className={styles.container}>
      <Searcher
        changeCountryOption={changeCountryOption}
        form={form}
        setForm={setForm}
        initialForm={initialForm}
        moveToSection={moveToSection}
      />
      <Categories countryOption={countryOption} recomendation={recomendation} setRecomendation={setRecomendation} ref={ref}/>
    </div>
  );
}
