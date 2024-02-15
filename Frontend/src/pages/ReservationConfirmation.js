import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ReservationConfirmationMain from '../components/ReservationConfirmationMain'
import styles from "../styles/ReservationConfirmation.module.css"


export default function ReservationConfirmation() {
  return (
    <div className={styles.container}>
        <Header/>
        <ReservationConfirmationMain/>
        <Footer/>
    </div>
  )
}
