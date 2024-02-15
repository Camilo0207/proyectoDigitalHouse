import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import ReserveOption from '../components/ReserveOption';
import styles from '../styles/MyReserves.module.css'
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import Loader from "../components/Loader";
import { FaRegFrown } from "react-icons/fa";

export default function MyReserves() {
    const { id } = useParams();
    const url = `http://localhost:8080/bookings/bookingsuserid/${id}`;
    // const url = `http://3.144.218.41:8080/bookings/bookingsuserid/${id}`;
    const { loading, db } = useApi(url);
    const [open, close] = useBodyScrollLock();
    const navigate = useNavigate();

    const [reserveByUser, setReserveByUser] = useState([])

    useEffect(()=>{
      try{
        setReserveByUser(db)
      }catch(e){
      }
     
    },[db])

    useEffect(() => {
      loading ? open() : close();
    }, [loading]);

    const onClick = () => {
      navigate('/')
    }

  return (
    <>
    {loading && <Loader />}
    <div className={styles.container}>
        <Header/>
        <div className={styles.containerMyReserves}>
          
          {reserveByUser &&(reserveByUser.length > 0) ?
           reserveByUser.map((el)=>(
          <ReserveOption key={el.id} item={el}/>
        )) : 
        <div className={styles.containerWithoutReserve}>
          <div className={styles.iconWithoutReserve}><FaRegFrown/></div>
          <h4>Aún no has efectuado ninguna reserva</h4> 
          <button onClick={onClick} className={styles.bntComeHome}>Volver a home</button>
        </div>
        }
        </div>
        <Footer/>
    </div>
    </>
    
  )
}
