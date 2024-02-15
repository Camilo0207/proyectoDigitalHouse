import React, { useContext, useEffect, useState } from 'react'
import LanguageContext from '../context/LanguageContext';
import { useApi } from '../hooks/useApi'
import styles from "../styles/ProductDetailsPhotos.module.css";


export default function ProductDetailsPhotos({id,openModalPortal}) {
    const [otherImages, setOtherImages] = useState(null)
    // const {db}=useApi(`http://3.144.218.41:8080/images/imagesproduct/${id}`)
    const {db}=useApi(`http://localhost:8080/images/imagesproduct/${id}`)
    const { texts } = useContext(LanguageContext);
    useEffect(() => {
      if(db){
        const images=[]
        if(db.length > 1){
          for (let i = 1; i <= 4; i++) {
              images.push(db[i])
          }
          setOtherImages(images)
        }
      }
    }, [db])
    

  return (
    <>
    {db && db.length > 0 &&
        <>
            <div className={styles.principal_hotel_image}>
                <img src={db[0].imageUrl} alt="" />
            </div>
            <div className={styles.others_hotel_images}>
                {otherImages && otherImages.length > 1 && 
                otherImages.map((el) => (
                    <div key={el.id}>
                        <img src={el.imageUrl} alt="" />
                    </div>
                ))}
                <p onClick={openModalPortal}>{texts.seeMore}</p>
            </div> 
        </>
    }
    </>
  )
}
