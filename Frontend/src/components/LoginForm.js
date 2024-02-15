import styles from "../styles/LoginForm.module.css";
import { useContext, useState } from "react";
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import LanguageContext from "../context/LanguageContext";
export default function LoginForm({ onChange, onSubmit, form, errors }) {
  const [viewPassword, setViewPassword] = useState(false)
  const { texts,language} = useContext(LanguageContext);

  const togglePassword=()=>{
    setViewPassword(!viewPassword)
  }

  const handleChange = (e) => {
    onChange(e);
  };

  const handleSubmit = (e) => {
    onSubmit(e);
  };
  
  return (
    <form className={styles.form_login} onSubmit={handleSubmit}>

      <label htmlFor={"email"}>{texts.email}</label>
      <input data-testid='emailInput' id={"email"} className={`${errors.email? styles.error_input: ""}`} type="text" name={"email"} onChange={handleChange} value={form.email} placeholder={language==="es"?"ejemplo@gmail.com":"example@gmail.com"}/>
      {errors.email && <p className={styles.error_message}>{errors.email}</p>}

      <label htmlFor={"password"}>{texts.password}</label>
      <div className={styles.password_box}>
        <input className={`${errors.password? styles.error_input : ""}`}id={"password"}  type={viewPassword?"text":"password"} name={"password"} onChange={handleChange} value={form.password} placeholder={language==="es"?"Contraseña":"Password"}/>
        {viewPassword ?<BsEyeSlash className={styles.img} onClick={togglePassword}/>:<BsEye className={styles.img} onClick={togglePassword}/>}
      </div>
      {errors.password && <p className={styles.error_message}>{errors.password}</p>}

      <div className={styles.box_btn}>
        <input data-testid='btnSubmit' className={styles.submit_btn} type={"submit"} value={language==="es"?"Ingresar":"Sing In"} />
      </div>
    </form>
  );
}
