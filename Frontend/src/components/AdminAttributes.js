import React, { useContext, useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";
import LanguageContext from "../context/LanguageContext";
import { useApi } from "../hooks/useApi";
import styles from "../styles/AdminAttributes.module.css"

export default function AdminAttributes({setShowServices,showServices,addServices,servicesToProduct}) {
  const url = "http://localhost:8080/features";
  // const url = "http://3.144.218.41:8080/features";
  const { db } = useApi(url);
  const [search, setSearch] = useState("");
  const [iconImg, setIconImg] = useState("")
  const [serviceId, setServiceId] = useState(null)
  const [errors, setErrors] = useState("")
  const { texts,language} = useContext(LanguageContext);

  useEffect(() => {
    setErrors("")
  }, [language])
  


const handleChange = (e) => {
    setSearch(e.target.value);
    setIconImg("")
  };
  const selectIcon=(item)=>{
      setSearch(item.name);
      setIconImg(item.imageUrl)
      setServiceId(item)
      setShowServices(false)
  }
  const showOptionsServices=(e)=>{
    e.stopPropagation();
    setShowServices(true)
  }

  const handleSubmit=()=>{
    if(serviceId && iconImg){
      const serviceFound= servicesToProduct.find(el=>el.id === serviceId.id)
      if(!serviceFound){
        addServices(serviceId)
        setServiceId(null)
        setIconImg("")
        setIconImg("")
        setSearch("");
        setErrors("")
      }else{
        setErrors(texts.alreadyChoose);
      }
    }else{
      setErrors(
        texts.fieldRequiered
      );
    }

  }


  const iconsFind = !search
    ? db
    : db.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={styles.container}>
      <div className={styles.inputs_box}>
        <div className={styles.name_icon}>
          <label htmlFor="nameIcon" >{texts.name}</label>
          <input className={`${errors? styles.error_input: ""}`} type="text" id={"nameIcon"} onChange={handleChange} onClick={showOptionsServices} value={search} placeholder={texts.writeHere}/>
          {showServices&&
            <div className={styles.select_services}>
              {db && iconsFind.length > 0 ? (
                iconsFind.map((el) => <p key={el.id} onClick={()=>selectIcon(el)}>{el.name}</p>
                )) : (
                <p>{`${texts.isNotFound} ('${search}')`}</p>
              )}
            </div>}
            {errors && <p className={styles.error_message}>{errors}</p>}
        </div>
        <div className={styles.icon_img}>
        <label htmlFor="">{texts.icon}</label>
          <div className={`${errors? styles.error_input: ""}`}>
            {iconImg?
                <i className={`${iconImg} ${styles.icon_services}`}></i>
                :
                <p>Img</p>
            }
          </div>
          {errors && <p className={styles.error_message}>{errors}</p>}
        </div>
      </div>
      <div className={styles.button_box}>
            <MdAddBox onClick={handleSubmit} className={styles.icon}/>
      </div>
    </div>
  );
}
