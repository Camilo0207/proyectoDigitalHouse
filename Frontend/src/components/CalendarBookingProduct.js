import React, { useContext, useEffect, useState } from 'react'
import { useResizeScroll } from '../hooks/useResizeScroll';
import { useParams } from "react-router-dom";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import en from "date-fns/locale/en-US";
import "react-datepicker/dist/react-datepicker.css";
import stylesCalendarBookingProduct from "../styles/CalendarBookingProduct.module.css"
import LanguageContext from '../context/LanguageContext';
import DateSelectedCalendarContext  from '../context/DateSelectedCalendarContext';
import { useApi } from '../hooks/useApi';

export default function CalendarBookingProduct() {
  const { infoItem } = useParams();
  const [dataBookings, setDataBooking] = useState([]);
  const {language } = useContext(LanguageContext);
  const url = `http://localhost:8080/bookings/bookingsByProductId/${infoItem}`
  // const url = `http://3.144.218.41:8080/bookings/bookingsByProductId/${infoItem}`
  const { db } = useApi(url)

  const { width } = useResizeScroll()
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const { setDateForBack } = useContext(DateSelectedCalendarContext)
  
  let StartDateString = startDate? startDate.toLocaleDateString('fr-CA'):'';
  let EndDateString = endDate? endDate.toLocaleDateString('fr-CA'):'';
  
  useEffect(() => {
    setDataBooking(db)
  }, [db]);

  useEffect(()=>{
    if(getReservedDatesDisabled(infoItem, StartDateString, EndDateString )){
      setDateForBack({
        checkIn: StartDateString,
        checkOut: EndDateString,
      })
    }
  },[startDate, endDate])
 
  const getReservedDates = () => {
    if(dataBookings){
      const bookings = dataBookings
      .map((date) => ({
        start: new Date(date.checkIn),
        end: new Date(date.checkOut),
      }));
    return bookings;
    }
  };

  const getReservedDatesDisabled = async (idProduct, startDate, endDate) => {
    // let urlDateDisabled = `http://3.144.218.41:8080//bookings/${idProduct}/${startDate}/${endDate}`;
    let urlDateDisabled = `http://localhost:8080/bookings/${idProduct}/${startDate}/${endDate}`;
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
    };

    try {
      const res = await fetch(urlDateDisabled, options);
      if (res.OK) {
        return res
      }
      return res
    } catch (error) {
      throw new Error('No se ejecuto aun este endpoint')
    }
  };

  registerLocale("es", language === "es" ? es : en);
  setDefaultLocale("es")

  return (
    <>
     <DatePicker
        selected={startDate}
        monthsShown={width > 860 ? 2 : 1}
        className={stylesCalendarBookingProduct.border}
        excludeDateIntervals={getReservedDates()}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        onChange={(update) => {
          setDateRange(update);
        }}
        calendarClassName={stylesCalendarBookingProduct.calendar}
        inline />
  </>

  )
}