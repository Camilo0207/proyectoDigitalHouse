import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import NewAccountMain from '../components/NewAccountMain'
import styles from "../styles/NewAccount.module.css"


export default function NewAccount() {
  return (
    <div className={styles.container}>
        <Header/>
        <NewAccountMain/>
        <Footer/>
    </div>
  )
}
