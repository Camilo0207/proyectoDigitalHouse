import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import styles from "../styles/Home.module.css"

export default function Home() {
  const [recomendation, setRecomendation] = useState(false)
  
  return (
    <div className={styles.container}>
      <Header setRecomendation={setRecomendation} />
      <Main recomendation={recomendation} setRecomendation={setRecomendation}/>
      <Footer />
    </div>
  );
}
