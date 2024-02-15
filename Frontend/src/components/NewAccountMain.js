import React, { useContext, useEffect, useState } from "react";
import NewAccountForm from "./NewAccountForm";
import styles from "../styles/NewAccountMain.module.css";
import { Link, useNavigate } from "react-router-dom";
import { helpValidaciones } from "../helpers/helpValidaciones";
import { useApi } from "../hooks/useApi";
import Loader from "./Loader";
import { useSessionStorage } from "../hooks/useSessionStorage";
import LanguageContext from "../context/LanguageContext";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoMdAlert } from 'react-icons/io';

const initialForm = {
  name: "",
  lastname:"",
  email: "",
  password: "",
  confirmPassword: "",
  rol: {
    id: 5,
  },
  city: {
    id: 1,
  },
};

export default function NewAccountMain() {
  const url = "http://localhost:8080/users";
  // const url = "http://3.144.218.41:8080/users";
  const { loading, db} = useApi(url);
  const [form, setForm] = useState(initialForm);
  const { validateNewUser } = helpValidaciones();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setSessionStorage } = useSessionStorage("userName");
  const { texts, language } = useContext(LanguageContext);
  const [successfulAccount, setSuccessfulAccount] = useState(false);
  const [errorFetch, setErrorFetch] = useState(false)
  

  const createData = async (data) => {
    
    console.log(data);
    delete data.confirmPassword;
    const dataStringify =JSON.stringify(data)
    const options={
      method : "POST",
      body: dataStringify,
      headers: { "content-type": "application/json"}
    }

    try {
      const res = await fetch(url,options)
      // const newData= await res.json()
      if (res.ok) {
        setSuccessfulAccount(true);
        setForm(initialForm);
        setTimeout(() => {
          setSuccessfulAccount(false);
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setErrorFetch(true)
      // setError(error.message);
    }
  };

  useEffect(() => {
    setErrors({});
  }, [language]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorFetch(false)
    const newErrors = validateNewUser(form, db, texts);
    console.log(newErrors);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      createData(form)
      
    } else {
      return;
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.newAccount_box}>
        {successfulAccount && (
          <div className={styles.message_box}>
            <AiFillCheckCircle className={styles.icon_message} />
            <p>Cuenta creada con exito <br></br><span>Te enviamos un correo de bienvenida.</span></p>
          </div>
        )}
        {errorFetch &&
          <div className={styles.warning_box}>
            <IoMdAlert className={styles.icon}/>
            <p>Lamentablemente no ha podido Registrarse. Por favor intente, más tarde</p>
          </div>
        }
        <h3>{texts.headerNewAccountBtn}</h3>
        <NewAccountForm
          onChange={handleChange}
          form={form}
          onSubmit={handleSubmit}
          errors={errors}
        />
        <p>
          {texts.alreadyAccount}{" "}
          <Link to={"/login"}>
            <span>{texts.login}</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
