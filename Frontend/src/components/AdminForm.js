import React, { useContext } from 'react'
import AdminFormCategories from './AdminFormCategories';
import AdminFormCities from './AdminFormCities';
import styles from "../styles/AdminForm.module.css";
import AdminFormAddImages from './AdminFormAddImages';
import AdminFormImagesHotelContainer from './AdminFormImagesHotelContainer';
import AdminAttributes from './AdminAttributes';
import AdminFormServicesSelected from './AdminFormServicesSelected';
import LanguageContext from '../context/LanguageContext';
import { useParams } from 'react-router-dom';

export default function AdminForm({form, onChange,setForm,onSubmit,addImages,deleteImages,imagesToProduct,setFormImg,formImg,errors,setShowServices,showServices,addServices,servicesToProduct,deleteServices}) {
  const { texts} = useContext(LanguageContext);
  const { infoItem } = useParams();

    const handleChange = (e) => {
        onChange(e);
      };
    
      const handleSubmit=(e)=>{
        onSubmit(e)
      }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.product_info}>
            <div>
                <label htmlFor="name">{texts.propertyName}</label>
                <input className={`${errors.name? styles.error_input: ""}`} type="text" value={form.name} name={"name"} id={"name"} onChange={handleChange} placeholder={texts.writeHere}/>
                {errors.name && <p className={styles.error_message}>{errors.name}</p>}
            </div>
            <div>
                <AdminFormCategories setForm={setForm} form={form} errors={errors}/>               
                {errors.category && <p className={styles.error_message}>{errors.category}</p>}
            </div>
            <div>
                <label htmlFor="address1">{texts.address}</label>
                <input className={`${errors.address1? styles.error_input: ""}`} type="text" value={form.address1} name={"address1"} id={"address1"} onChange={handleChange} placeholder={texts.writeHere}/>
                {errors.address1 && <p className={styles.error_message}>{errors.address1}</p>}
            </div>
            <div>
                <AdminFormCities setForm={setForm} form={form} errors={errors}/>
                {errors.city && <p className={styles.error_message}>{errors.city}</p>}
            </div>
        </section>
        <section className={styles.description}>
            <label htmlFor="description">{texts.description}</label>
            <textarea className={`${errors.description? styles.error_input: ""}`} name="description" id={"description"} cols="30" rows="6" onChange={handleChange} value={form.description}  placeholder={texts.writeHere}/>
            {errors.description && <p className={styles.error_message}>{errors.description}</p>}
        </section>
        <section className={styles.services}>
            <p>{texts.addAttributes}</p>
            <div className={`${errors.services? styles.error_input: ""}`}>
                <AdminAttributes setShowServices={setShowServices} showServices={showServices} addServices={addServices} servicesToProduct={servicesToProduct} deleteServices={deleteServices}/>
                {servicesToProduct.length >0&&
                    <div className={styles.services_selected_box}>
                        {servicesToProduct.map(el=>(
                            <AdminFormServicesSelected key={el.id} item={el} deleteServices={deleteServices}/>
                        ))}
                    </div>
                }
            </div>
            {errors.services && <p className={styles.error_message}>{errors.services}</p>}
        </section>
        <section className={styles.politics}>
            <p>{texts.productPolicies}</p>
            <div className={styles.politics_options}>
                <div>
                    <label htmlFor="rules">{texts.housesRules}</label>
                    <textarea className={`${errors.rules? styles.error_input: ""}`} name="rules" id={"rules"} cols="30" rows="7" onChange={handleChange} value={form.rules} placeholder={texts.writeHere}/>
                    {errors.rules && <p className={styles.error_message}>{errors.rules}</p>}

                </div>
                <div>
                    <label htmlFor="security">{texts.healthSecurity}</label>
                    <textarea className={`${errors.security? styles.error_input: ""}`} name="security" id={"security"} cols="30" rows="7" onChange={handleChange} value={form.security} placeholder={texts.writeHere}/>
                    {errors.security && <p className={styles.error_message}>{errors.security}</p>}
                </div>
                <div>
                    <label htmlFor="cancellation">{texts.cancellationPolicy}</label>
                    <textarea className={`${errors.cancellation? styles.error_input: ""}`} name="cancellation" id={"cancellation"} cols="30" rows="7" onChange={handleChange} value={form.cancellation} placeholder={texts.writeHere}/>
                    {errors.cancellation && <p className={styles.error_message}>{errors.cancellation}</p>}
                </div>
            </div>
        </section>
        <section className={styles.select_images}>
            <p>{texts.uploadImages}</p>
            <div className={`${errors.imagesQuantity? styles.error_input: ""}`}>
                <AdminFormAddImages addImages={addImages} setFormImg={setFormImg} formImg={formImg}/>
                {imagesToProduct.length > 0 &&
                    imagesToProduct.map(el=>(
                        <AdminFormImagesHotelContainer key={el.id} deleteImages={deleteImages} item={el}/> 
                    ))
                }
            </div>
            {errors.imagesQuantity && <p className={styles.error_message}>{errors.imagesQuantity}</p>}
        </section>
        <div className={styles.button_box}>
            <input type="submit" value={infoItem !== "false"?texts.edit:texts.create} />
        </div>
    </form>
  )
}
