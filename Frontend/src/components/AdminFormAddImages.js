import React, { useContext, useEffect, useState } from 'react'
import { MdAddBox } from 'react-icons/md';
import LanguageContext from '../context/LanguageContext';
import { helpValidaciones } from '../helpers/helpValidaciones';
import styles from "../styles/AdminFormAddImages.module.css"


const imagesInitialForm={
    name:"image",
    imageUrl:"",
    product:{
      id:""
    }
  }

export default function AdminFormAddImages({addImages,setFormImg,formImg}) {
    const {validateImagesToAdd}=helpValidaciones()
    const [errors, setErrors] = useState({})
    const { texts, language } = useContext(LanguageContext);

    useEffect(() => {
      setErrors({})
    }, [language])
    


    const handleChange=(e)=>{
      setFormImg({
            ...formImg,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=()=>{
      const newErrors = validateImagesToAdd(formImg,texts);
      setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      addImages(formImg)
      setFormImg(imagesInitialForm)  
    } else {
      return;
    }
    }

  return (
    <div className={styles.container}>
        <div className={styles.input_button_box}>
          <input className={`${errors.imageUrl? styles.error_input: ""}`} type="text" name={"imageUrl"} value={formImg.imageUrl}onChange={handleChange} placeholder={"https://"}/>
          <MdAddBox className={styles.icon} onClick={handleSubmit}/>
        </div>
        <div className={styles.error_box}>
          {errors.imageUrl && <p className={styles.error_message}>{errors.imageUrl}</p>}
        </div>
    </div>
    
  )
}
