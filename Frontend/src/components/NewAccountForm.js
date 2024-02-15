import React, { useContext, useState } from 'react'
import styles from "../styles/NewAccountForm.module.css"
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import LanguageContext from '../context/LanguageContext';

export default function NewAccountForm({onChange,form,onSubmit,errors}) {
  const [viewPassword, setViewPassword] = useState(false)
  const { texts} = useContext(LanguageContext);

  const togglePassword=()=>{
    setViewPassword(!viewPassword)
  }

  const handleChange=(e)=>{
    onChange(e)
  }


  const handleSubmit=(e)=>{
    onSubmit(e)
  }

  return (
    <form className={styles.form_newAccount} onSubmit={handleSubmit}>

      <div className={styles.info_user}>
        <div>
          <label htmlFor="name">{texts.name}</label>
          <input  className={`${errors.name? styles.error_input: ""}`} id={"name"} type="text" name={"name"} onChange={handleChange} value={form.name}/>
          {errors.name && <p className={styles.error_message}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="lastname">{texts.lastname}</label>
          <input  className={`${errors.lastname? styles.error_input: ""}`} id={"lastname"} type="text" name={"lastname"} onChange={handleChange} value={form.lastname}/>
          {errors.lastname && <p className={styles.error_message}>{errors.lastname}</p>}
        </div>
      </div>

      <label htmlFor="email">{texts.email}</label>
      <input  className={`${errors.email? styles.error_input: ""}`} id={"email"} type="text" name={"email"} onChange={handleChange} value={form.email}/>
      {errors.email && <p className={styles.error_message}>{errors.email}</p>}

      <label htmlFor="password">{texts.password}</label>
      <div className={styles.password_box}>
        <input  className={`${errors.password? styles.error_input: ""}`} id={"password"} type={viewPassword?"text":"password"} name={"password"} onChange={handleChange} value={form.password}/>
        {viewPassword ?<BsEyeSlash className={styles.img} onClick={togglePassword}/>:<BsEye className={styles.img} onClick={togglePassword}/>}
      </div>
      {errors.password && <p className={styles.error_message}>{errors.password}</p>}


      <label htmlFor="confirmPassword">{texts.confirmPassword}</label>
      <input  className={`${errors.confirmPassword? styles.error_input: ""}`} id={"confirmPassword"} type="password" name={"confirmPassword"} onChange={handleChange} value={form.confirmPassword}/>
      {errors.confirmPassword && <p className={styles.error_message}>{errors.confirmPassword}</p>}


      <div className={styles.box_btn}>
        <input data-testid='btnSubmit' className={styles.submit_btn} type="submit" value={texts.headerNewAccountBtn} />
      </div>
    </form>
  )
}
