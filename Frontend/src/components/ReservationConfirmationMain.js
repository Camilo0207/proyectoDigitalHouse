import React, { useContext } from 'react'
import { HiBadgeCheck} from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import LanguageContext from '../context/LanguageContext';
import styles from "../styles/ReservationConfirmationMain.module.css"

export default function ReservationConfirmationMain() {
  const { texts} = useContext(LanguageContext);
  const { info } = useParams();


  return (
    <div className={styles.container}>
        <div className={styles.confirmation_box}>
            <HiBadgeCheck className={styles.icon}/>
            <p className={styles.title}>{info ==="edit"||info ==="create"?texts.done:texts.thanks}</p>
            {info ==="edit"&&
              <p className={styles.text}>{texts.hotelEdited}</p>
            }
            {info ==="create"&&
              <p className={styles.text}>{texts.hotelCreated}</p>
            }
            {info ==="reservation"&&
              <p className={styles.text}>{texts.reservationPhrase}<br/><span className={styles.sendingMail}>{texts.sendingReservationEmail}</span></p>
            }
            <Link to={"/"}><button>ok</button></Link>
        </div>
    </div>
  )
}
