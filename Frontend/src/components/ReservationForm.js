import React, { useState, useContext, useEffect } from "react";
import styles from "./../styles/ReservationForm.module.css";
import LanguageContext from "../context/LanguageContext";
import { useSessionStorage } from "../hooks/useSessionStorage";
import DateSelectedCalendarContext from "../context/DateSelectedCalendarContext";
import useBodyScrollLock from "../hooks/useBodyScrollLock";

export default function ReservationForm({errorUser}) {
  const { user } = useSessionStorage("userData");
  const { form, setForm, errors, setErrors } = useContext(
    DateSelectedCalendarContext
  );
  const { texts } = useContext(LanguageContext);
  const [open, close] = useBodyScrollLock();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    loading ? open() : close();
  }, [loading]);

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        city: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({
      ...form,
      city: value,
    });
    if (!value) {
      setErrors(texts.fieldRequiere);
    } else if (value) {
      setErrors("");
    }
  };

  return (
      <form  className={`${styles.reservationFormContainer} ${errorUser.city?styles.error_input:""}`}>
          <div className={styles.inputForm}>
            <label htmlFor={"name"}>{texts.name}</label>
            <input
              data-testid="nameuUserReserve"
              id={"name"}
              type="text"
              name={"name"}
              value={user ? user.name : ""}
              placeholder="Bruno"
              disabled
            />
          </div>
          <div className={styles.inputForm}>
            <label htmlFor={"lastname"}>{texts.lastname}</label>
            <input
              data-testid=""
              id={"lastname"}
              type="text"
              name={"lastname"}
              value={user ? user.lastname : ""}
              placeholder="Rodriguez"
              disabled
            />
          </div>
          <div className={styles.inputForm}>
            <label htmlFor={"email"}>{texts.email}</label>
            <input
              data-testid=""
              id={"email"}
              type="email"
              name={"email"}
              value={user ? user.email : ""}
              placeholder="brodriguez@gmail.com"
              disabled
            />
          </div>
          <div className={styles.inputForm}>
            <label htmlFor={"city"}>{texts.city}</label>
            <input
              data-testid=""
              id={"city"}
              type="text"
              name={"city"}
              value={form.city}
              placeholder="Rosario, Santa Fe"
              onChange={handleChange}
              required
              className={`${errorUser.city?styles.error_input:""}`}
            />
            {errorUser.city && <p className={styles.error_message}>{errorUser.city}</p>}
          </div>
      </form>
  );
}
