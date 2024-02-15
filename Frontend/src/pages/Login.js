import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LoginMain from '../components/LoginMain'
import styles from "../styles/Login.module.css"


export default function Login() {
  return (
    <div className={styles.container}>
        <Header/>
        <LoginMain/>
        <Footer/>
    </div>
  )
}
