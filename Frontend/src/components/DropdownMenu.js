import React, { useContext } from 'react'
import styles from "../styles/DropdownMenu.module.css"
import facebookImg from "../assets/img/facebook-dark.png"
import linkedinImg from "../assets/img/linkedin-dark.png"
import twitterImg from "../assets/img/twitter-dark.png"
import instagramImg from "../assets/img/instagram-dark.png"
import LanguageContext from '../context/LanguageContext'
import { Link } from 'react-router-dom'

export default function DropdownMenu({ handleLogout, location, user, handleClick }) {
    const { texts } = useContext(LanguageContext);

    return (
        <>
            <div className={styles.head_menu}>
                <div className={styles.icon_close}>
                    <p onClick={handleClick} data-type="close">X</p>
                </div>

                <div className={styles.user_info}>
                    {!user
                        ? (
                            <p className={styles.message_menu}>MENU</p>
                        ) : (
                            <>
                                <div className={styles.initials_name}>
                                    <p>{`${user.name.slice(0, 1).toUpperCase()}${user.lastname.slice(0, 1).toUpperCase()}`}</p>
                                </div>
                                <p className={styles.message_menu}>{texts.greeting}</p>
                                <p className={styles.user_name}>{`${user.name} ${user.lastname}`}</p>
                            </>
                        )}
                </div>
            </div>

            <div className={styles.main_menu}>
                {!user && location.pathname !== "/login" && location.pathname !== "/newAccount" &&
                    <div className={styles.options_no_login}>
                        <p className={styles.new_account_message} data-type="close" id={"createAccount"} onClick={handleClick}>{texts.headerNewAccountBtn}</p>
                        <p data-type="close" id={"login"} onClick={handleClick}>{texts.headerLoginBtn}</p>
                    </div>
                }

                {!user && location.pathname === "/login" &&
                    <p data-type="close" id={"createAccount"} onClick={handleClick}>{texts.headerNewAccountBtn}</p>
                }

                {!user && location.pathname === "/newAccount" &&
                    <p data-type="close" id={"login"} onClick={handleClick}>{texts.headerLoginBtn}</p>

                }

                {user &&
                    <div className={`${styles.close_session} ${user.rol.id !== 1 ? styles.no_admin : ""}`}>
                        {(user.rol.id === 3 ||user.rol.id === 5) && <Link className={styles.administration} to={`/bookingsuserid/${user.id}`}>Mis reservas</Link>}
                        {user.rol.id === 4 && <p onClick={handleClick} className={styles.administration} data-type={"administration"}>{texts.administration}</p> }
                        <p>¿{texts.doYouWant} <span onClick={handleLogout} data-type="close">{texts.logOut}</span>?</p>
                    </div>
                }
            </div>

            <div className={styles.footer_menu}>
                <div>
                    <img src={facebookImg} alt="facebookImg" />
                    <img src={linkedinImg} alt="linkedinImg" />
                    <img src={twitterImg} alt="twitterImg" />
                    <img src={instagramImg} alt="instagramImg" />
                </div>
            </div>
        </>
    )
}
