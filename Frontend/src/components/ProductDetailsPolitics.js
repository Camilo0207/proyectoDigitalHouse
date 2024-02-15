import React, { useContext } from 'react'
import ProductDetailsCaracteristics from './ProductDetailsCaracteristics'
import styles from "../styles/ProductDetailsPolitics.module.css";
import LanguageContext from '../context/LanguageContext';



export default function ProductDetailsPolitics({db}) {
  const { texts } = useContext(LanguageContext);

  return (
    <div className={styles.politics}>
        <h2>{texts.youShouldKnow}</h2>
        <div className={styles.politics_caracteristics}>
            <div>
            <ProductDetailsCaracteristics info={db.rules} title={texts.housesRules}/>
            </div>
            <div>
                <ProductDetailsCaracteristics info={db.security} title={texts.healthSecurity}/>
            </div>
            <div>
            <ProductDetailsCaracteristics info={db.cancellation} title={texts.cancellationPolicy}/>
            </div>
        </div>
    </div>
  )
}
