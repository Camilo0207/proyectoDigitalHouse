import React from 'react'
import {
    FacebookShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton,
    WhatsappIcon,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    EmailIcon,
    
  } from 'react-share';
import styles from "../styles/ProductDetailsShare.module.css"

export default function ProductDetailsShare({id}) {
    // const shareUrl = `http://3.144.218.41:8080/${id}`;
    const shareUrl = `http://localhost:8080/${id}`;
  return (
    <div className={styles.container}>
        <h2>Compartir</h2>
        <div className={styles.icons_box}>
            <div>
                <FacebookShareButton
                url={shareUrl}
                quote={'Facebook'}
                hashtag={'#portfolio...'}
                >
                    <FacebookIcon className={styles.icon} />
                <h3>Facebook</h3>
                </FacebookShareButton>
            </div>
            <div>
                <WhatsappShareButton
                url={shareUrl}
                quote={'whatsApp'}
                hashtag={'#portfolio...'}
                >
                    <WhatsappIcon className={styles.icon} />
                    <h3>WhatsApp</h3>
                </WhatsappShareButton>
            </div>
            <div>
                <LinkedinShareButton
                url={shareUrl}
                quote={'linkedIn'}
                hashtag={'#portfolio...'}
                >
                    <LinkedinIcon className={styles.icon} />
                    <h3>LinkedIn</h3>
                </LinkedinShareButton>
            </div>
            <div>
                <TwitterShareButton
                url={shareUrl}
                quote={'linkedIn'}
                hashtag={'#portfolio...'}
                >
                    <TwitterIcon className={styles.icon} />
                    <h3>Twitter</h3>
                </TwitterShareButton>
            </div>
            <div>
                <EmailShareButton
                url={shareUrl}
                quote={'Email'}
                hashtag={'#portfolio...'}
                >
                    <EmailIcon className={styles.icon} />
                    <h3>Email</h3>
                </EmailShareButton>
            </div>
        </div>
    </div>
  )
}
