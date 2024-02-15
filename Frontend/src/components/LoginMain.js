import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { helpValidaciones } from '../helpers/helpValidaciones'
import { useApi } from '../hooks/useApi'
import { useSessionStorage } from '../hooks/useSessionStorage'
import styles from "../styles/LoginMain.module.css"
import Loader from './Loader'
import LoginForm from './LoginForm'
import { IoMdAlert } from 'react-icons/io';
import { useEffect } from 'react'
import MessageContext from '../context/MessageContext'
import LanguageContext from '../context/LanguageContext'
import jwt_decode from "jwt-decode";

const initialForm={
  email:"",
  password:""
}


export default function LoginMain() {
  const url="http://localhost:8080/users"
  const urlLogin="http://localhost:8080/auth"
  // const url="http://3.144.218.41:8080/users"
  // const urlLogin="http://3.144.218.41:8080/auth"
  const [form, setForm] = useState(initialForm)
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const {validateFormLogin}=helpValidaciones()
  const {loading,db}=useApi(url)
  const {setSessionStorage}=useSessionStorage("userData")
  const { showErrormessage,idProduct} = useContext(MessageContext);  
  const { texts,language} = useContext(LanguageContext);
  const [errorFetch, setErrorFetch] = useState(false)


  const login = async (data) => {
    const dataStringify =JSON.stringify(data)
    const options={
      method : "POST",
      body: dataStringify,
      headers: { "content-type": "application/json" }
    }

    try {
      const res = await fetch(urlLogin,options)
      const newData= await res.json()
      if (res.ok) {
        let decoded=jwt_decode(newData.jwtToken)
        
        
        localStorage.setItem("Token",JSON.stringify(newData.jwtToken))
        const userLoged=await db.find(el=>el.email === decoded.sub)

        
        setSessionStorage({id:userLoged.id,name:userLoged.name,lastname:userLoged.lastname, email:decoded.sub, rol:userLoged.rol})
        if(showErrormessage){
            navigate(`/reservation/${idProduct}`)
          }else{
            navigate("/");
        }
      }
    } catch (error) {
      setErrorFetch(true);
      // setError(error.message);
    }
  };

  const handleChange=(e)=>{
      setForm({
        ...form,
        [e.target.name]:e.target.value
      })
  }
  useEffect(() => {
    setErrors({});
    
  }, [language])

  

  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setErrorFetch(false)
    const newErrors = validateFormLogin(form,texts);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      login(form)
    } else {
      return;
    }
  }

  return (
    <div className={styles.container}>
      {loading && <Loader/>}
      <div className={styles.login_box}>
        {showErrormessage&&
          <div className={styles.warning_box}>
            <IoMdAlert className={styles.icon}/>
            <p>{texts.messageErrorLogin}</p>
          </div>
        }
        {errorFetch &&
          <div className={styles.warning_box}>
            <IoMdAlert className={styles.icon}/>
            <p>Lamentablemente no ha podido iniciar sesión. Por favor, intente más tarde</p>
          </div>
        }
        
        <h1>{texts.login} </h1>
        <LoginForm onChange={handleChange} onSubmit={handleSubmit} form={form} errors={errors}/>
        <p>{texts.noAccount} <Link to={"/newAccount"}><span>{texts.signUp}</span></Link></p>
      </div>
    </div>
  )
}
