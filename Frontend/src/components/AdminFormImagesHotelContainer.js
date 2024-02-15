import React from 'react'
import { AiFillCloseSquare } from 'react-icons/ai';
import styles from "../styles/AdminFormImagesHotelContainer.module.css"


export default function AdminFormImagesHotelContainer({deleteImages,item}) {
  return (
    <div className={styles.container}>
        <input type="text" disabled value={item.imageUrl}/>
        <AiFillCloseSquare className={styles.icon} onClick={()=>deleteImages(item.id)}/>
    </div>
  )
}
