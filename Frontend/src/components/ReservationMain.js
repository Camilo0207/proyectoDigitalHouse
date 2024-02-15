import React, { useEffect,useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import ProductDetailsHotelName from "./ProductDetailsHotelName";
import ProductDetailsPolitics from "./ProductDetailsPolitics";
import ReservationForm from "./ReservationForm";
import CalendarBookingProduct from "./CalendarBookingProduct";
import SelectSchedule from "./SelectSchedule";
import styles from "../styles/ReservationMain.module.css";
import ReserveDetail from "./ReserveDetail";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import Loader from "./Loader";
import LanguageContext from "../context/LanguageContext";
import DateSelectedCalendarContext from "../context/DateSelectedCalendarContext";
import { helpValidaciones } from "../helpers/helpValidaciones";

export default function ReservationMain() {
  const [open, close] = useBodyScrollLock();
  const { infoItem } = useParams();
  // const urlInfoHotel = `http://3.144.218.41:8080/products/${infoItem}`;
  const urlInfoHotel = `http://localhost:8080/products/${infoItem}`;
  const {texts,language}=useContext(LanguageContext)
  const { db, loading } = useApi(urlInfoHotel); 

  const navigate = useNavigate();
  const [errorsReserve, setErrorsReserve] = useState([])
  const [errorUser, setErrorUser] = useState([])
  const {validateNewReserve,validateNewReserveUser}=helpValidaciones()
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    setErrorUser([])
    setErrorsReserve([])
  }, [language])
  

  const { schedule, setSchedule, form, setForm, dateForBack, setDateForBack } =
    useContext(DateSelectedCalendarContext);

    const [newReserva, setNewReserve] = useState({
      checkIn: "",
      checkOut: "",
      startTime: "",
      userEntity: {
        id: "",
      },
      product: {
        id: "",
      },
    });
    
  
    useEffect(() => {
      setNewReserve({
        checkIn: dateForBack.checkIn,
        checkOut: dateForBack.checkOut,
        startTime: schedule.startTime,
        userEntity: {
          id: form ? form.id : "",
        },
        product: {
          id: db ? db.id : "",
        },
      });
    }, [schedule, setSchedule, form, setForm, dateForBack, setDateForBack]);
  
    useEffect(() => {
      loading ? open() : close();
    }, [loading]);
  
    const sendEmail = async (idReservation) => {
      let urlSendEmail = `http://3.144.218.41:8080/email/confirmation/${idReservation}`;
      // let nuevaurl = "http://localhost:8080/bookings";
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
      };
  
      try {
        const res = await fetch(urlSendEmail, options);
        if (res.ok) {
        }
      } catch (error) {
        alert("Error al intentar enviar el email");
      }
    };
    const createData = async (data) => {
      let nuevaurl = "http://3.144.218.41:8080/bookings";
      // let nuevaurl = "http://localhost:8080/bookings";
      const dataStringify = JSON.stringify(data);
      const options = {
        method: "POST",
        body: dataStringify,
        headers: { "content-type": "application/json" },
      };
  
      try {
        const res = await fetch(nuevaurl, options);
        const idReservation= await res.json()
        if (res.ok) {
          setShowLoading(true)
          sendEmail(idReservation)
          setTimeout(() => {
            setShowLoading(false)
            navigate(`/confirmation/reservation`);
          }, 4000);
        }
      } catch (error) {
        alert("No se puede reservar para las fechas seleccionadas");
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrorsReserve = validateNewReserve(newReserva,texts);
      const newErrorsReserveUser = validateNewReserveUser(form,texts);
      setErrorsReserve(newErrorsReserve);
      setErrorUser(newErrorsReserveUser)

      if (Object.keys(newErrorsReserve).length === 0 && Object.keys(newErrorsReserveUser).length === 0) {
        createData(newReserva)
        
      } else {
        return;
      }
    };

  useEffect(() => {
    loading ? open() : close();
  }, [loading]);

  return (
    <div>
      {(loading || showLoading) && <Loader />}
      {db && (
        <>
          <ProductDetailsHotelName db={db} />
          <div className={styles.container}>

            <p className={styles.title}>{texts.completeYourData}</p>

            <div className={styles.main}>

              <div className={styles.detailes_box}>
                <ReservationForm errorUser={errorUser}/>
                <p className={styles.title}>{texts.selectADate}</p>

                <div className={`${styles.calendar_box} ${errorsReserve.checkIn || errorsReserve.checkOut ?styles.error_input:""}`}>
                  <div className={`${styles.calendarContainer} `}>
                    <CalendarBookingProduct />
                  </div>
                    {errorsReserve.checkIn && <p className={styles.error_message}>{errorsReserve.checkIn}</p>}
                    {errorsReserve.checkOut && <p className={styles.error_message}>{errorsReserve.checkOut}</p>}
                </div>
                <div classNAme={styles.selectSchedule}>
                  <p className={styles.title}>{texts.arrivalTime}</p>
                  <SelectSchedule errorsReserve={errorsReserve}/>
                </div>
              </div>

              <div className={styles.card_product}>
                  <ReserveDetail infoItem={infoItem} db={db} loading={loading} handleSubmit={handleSubmit} dateForBack={dateForBack}/>
              </div>
              
            </div>
          </div>
          <ProductDetailsPolitics db={db} />
        </>
      )}
    </div>
  );
}
