import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import principalLogo from "../assets/img/logo1.png"
import menu from "../assets/img/menu.png"
import styles from "../styles/Header.module.css"
import DropdownMenu from './DropdownMenu'
import useBodyScrollLock from "../hooks/useBodyScrollLock"
import { useResizeScroll } from '../hooks/useResizeScroll'
import LanguageContext from '../context/LanguageContext'
import { useSessionStorage } from '../hooks/useSessionStorage'
import MessageContext from '../context/MessageContext'
import english from "../assets/img/estados-unidos.png"
import spanish from "../assets/img/espana.png"
import Swal from 'sweetalert2'

export default function Header({setRecomendation}) {
    const [openMenu, setOpenMenu] = useState(false)
    const [open, close] = useBodyScrollLock()
    const location = useLocation()
    const { user, removeSessionStorage } = useSessionStorage("userData")
    const navigate = useNavigate()
    const { width } = useResizeScroll()
    const { texts, handleLanguage, language } = useContext(LanguageContext);
    const { toggleMessage } = useContext(MessageContext);

    useEffect(() => {
        if (width > 481) {
            close()
            setOpenMenu(false)
        }
    }, [width])

    const handleClick = (e) => {
        const type = e.target.dataset.type;
        switch (type) {
            case "open":
                open()
                setOpenMenu(true)
                break;
            case "close":
                close()
                setOpenMenu(false)
                setTimeout(() => {
                    if (e.target.id === "createAccount") navigate("/newAccount")
                    if (e.target.id === "login") {
                        toggleMessage(false)
                        navigate("/login")
                    }
                }, 200);
                break;
            case "administration":
                close()
                setOpenMenu(false)
                setTimeout(() => {
                    navigate(`/administration/false`)   
                }, 200);
                break;

            default:
                break;
        }
    }
   
    const handleLogout = (e) => {
        Swal.fire({
            title: texts.logOutQuestion,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: language === "es" ? "Si­" : "Yes",
            cancelButtonText: "No",
        })
            .then(resultado => {
                if (resultado.value) {
                    handleClick(e)
                    removeSessionStorage()
                    localStorage.removeItem("Token")
                    navigate("/")
                    window.location.reload()
                } else {
                    return
                }
            });
    }

    const handleResetRecomendation=()=>{
        if(location.pathname === "/"){
            setRecomendation(true)
        }else{
            return
        }
    }

    return (
        <div className={styles.principal_container}>
            <div className={styles.language_box}>
                <Link to={"/favorites"}><p>{texts.favorites}</p></Link>
                <img className={styles.flag} src={language === "es" ? spanish : english} alt="flag" />
                <select name="language" onChange={handleLanguage} value={language}>
                    <option id="es"  value="es">Español</option>
                    <option id="en"  value="en">English</option>
                </select>
            </div>
            <div className={styles.container}>

                <Link to={"/"} onClick={handleResetRecomendation}>
                    <div className={styles.principal_logo}>
                        <img src={principalLogo} alt="Logo principal" />
                        <p>{texts.headerLogo}</p>
                    </div>
                </Link>


                <div className={styles.principal_menu}>
                    <img src={menu} alt="Imagen menu" data-type="open" onClick={handleClick} />

                    {((location.pathname !== "/newAccount") && !user) &&
                        <Link to={"/newAccount"}>
                            <button>{texts.headerNewAccountBtn}</button>
                        </Link>
                    }

                    {((location.pathname !== "/login") && !user) &&
                        <Link onClick={() => toggleMessage(false)} to={"/login"}>
                            <button>{texts.headerLoginBtn}</button>
                        </Link>
                    }

                    {(width > 480 && user) &&
                        <>
                            {user.rol.id === 5 &&
                                <div className={styles.administrationAndMyReserves}>
                                    <Link to={`/bookingsuserid/${user.id}`}>{texts.myReserves}</Link>
                                </div>
                            }
                            {user.rol.id === 4 &&
                                <div className={styles.administrationAndMyReserves}>
                                    {location.pathname === "/administration/false"
                                        ?<Link onClick={ (event) => event.preventDefault()} to={"/administration/false"}>{texts.administration}</Link>
                                        :<Link to={"/administration/false"}>{texts.administration}</Link>
                                    }
                                </div>
                            }
                            <div className={styles.info_user}>

                                <p onClick={handleLogout} className={styles.close}>X</p>

                                <div className={styles.initials_name}>
                                    <div className={styles.logo}>
                                        <p>{`${user.name.slice(0, 1).toUpperCase()}${(user.lastname).slice(0, 1).toUpperCase()}`}</p>
                                    </div>

                                    <div className={styles.prhase_name_box}>
                                        <p className={styles.prhase_hello}>{texts.greeting}</p>
                                        <p className={styles.user_name}>{`${user.name} ${user.lastname}`}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                </div>

                {openMenu &&
                    <div className={styles.dropDown}>
                        <DropdownMenu handleLogout={handleLogout} handleClick={handleClick} location={location} user={user} setOpen={close} />
                    </div>
                }
            </div>
        </div>
    )
}
