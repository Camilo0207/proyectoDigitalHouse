import React from 'react'
import { AiFillCloseSquare } from 'react-icons/ai';
import styles from "../styles/AdminFormServicesSelected.module.css"

export default function AdminFormServicesSelected({item,deleteServices}) {
    const{imageUrl,name,id}=item
  return (
    <div className={styles.container}>
        <div className={styles.inputs_box}>
            <input type="text" value={name} disabled/>
            <div>
                <i className={`${imageUrl} ${styles.icon_services}`}></i>
            </div>
        </div>
        <AiFillCloseSquare className={styles.icon} onClick={()=>deleteServices(id)}/>
    </div>
  )
}
