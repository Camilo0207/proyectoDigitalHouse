import React, { useContext, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import styles from "../styles/SelectSchedule.module.css";
import DateSelectedCalendarContext from "../context/DateSelectedCalendarContext";
import check from "../assets/img/check.png"

export default function SelectSchedule({errorsReserve}) {
  const { texts } = useContext(LanguageContext);
  const { schedule, setSchedule } = useContext(DateSelectedCalendarContext);
  const [startTime, setStartTime] = useState("--")
  const [finishTime, setFinishTime] = useState("--")

  const handlechange = (e) => {
    const time= e.target.value.split(":")
    setSchedule({ startTime: e.target.value });
    if(parseInt(time[0])=== 0){
      setStartTime(23+":00")
      setFinishTime(1+":00")
    }else if(parseInt(time[0])=== 23){
      setStartTime(22+":00")
      setFinishTime(0+":00")
    }else{
      setStartTime(parseInt(time[0])-1+":00")
      setFinishTime(parseInt(time[0])+1+":00")
    }
  };

  return (
    <div className={`${styles.scheduleContainer} ${errorsReserve.startTime?styles.error_input:""}`}>
      <div className={styles.confirmScheduleContainer}>
        <img className={styles.icon} src={check} alt="check" />
        <span className={styles.confirmScheduleText}>
          {texts.chekInRook} {startTime} / {finishTime}
        </span>
      </div>
      <p className={styles.labelSelectSchedule}>
        {texts.SelectYourArrivalTime}
      </p>
      <div className={styles.selectScheduleBox}>
      <select
        onChange={handlechange}
        className={`${styles.selectSchedule} ${errorsReserve.startTime?styles.error_input:""}`}
        name="select"
      >
        <option value="01:00:00">01:00</option>
        <option value="02:00:00">02:00</option>
        <option value="03:00:00">03:00</option>
        <option value="04:00:00">04:00</option>
        <option value="05:00:00">05:00</option>
        <option value="06:00:00">06:00</option>
        <option value="07:00:00">07:00</option>
        <option value="08:00:00">08:00</option>
        <option value="09:00:00">09:00</option>
        <option value="10:00:00">10:00</option>
        <option value="11:00:00">11:00</option>
        <option value="12:00:00">12:00</option>
        <option value="13:00:00">13:00</option>
        <option value="14:00:00">14:00</option>
        <option value="15:00:00">15:00</option>
        <option value="16:00:00">16:00</option>
        <option value="17:00:00">17:00</option>
        <option value="18:00:00">18:00</option>
        <option value="19:00:00">19:00</option>
        <option value="20:00:00">20:00</option>
        <option value="21:00:00">21:00</option>
        <option value="22:00:00">22:00</option>
        <option value="23:00:00">23:00</option>
        <option value="00:00:00">00:00</option>
        <option value="Seleccionar hora" selected disabled>
          {texts.selectTime}
        </option>
      </select>
      {errorsReserve.startTime && <p className={styles.error_message}>{errorsReserve.startTime}</p>}
      </div>
    </div>
  );
}
