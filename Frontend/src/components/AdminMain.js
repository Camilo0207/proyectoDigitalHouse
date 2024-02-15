import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/AdminMain.module.css";
import AdminForm from "./AdminForm";
import ProductDetailsHotelName from "./ProductDetailsHotelName";
import { v4 as uuidv4 } from "uuid";
import { helpValidaciones } from "../helpers/helpValidaciones";
import LanguageContext from "../context/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import Loader from "./Loader";

const initialForm = {
  category: {
    id: "",
  },
  name: "",
  title: "title",
  description: "",
  address1: "",
  address2: "other address",
  longitude: 23.455,
  latitude: 23.455,
  score: 5.65,
  starts: Math.floor(Math.random()*5+1),
  checkIn: "13:00:00",
  checkOut: "10:00:00",
  rules: "",
  security: "",
  cancellation: "",
  city: {
    id: "",
  },
};
const imagesInitialForm = {
  name: "image",
  imageUrl: "",
  product: {
    id: "",
  },
};

export default function AdminMain() {
  const { infoItem } = useParams();
  const urlCreateProduct = "http://localhost:8080/products";
  const urlAddImages = "http://localhost:8080/images";
  const urlService=`http://localhost:8080/featuresproduct/${infoItem}`
  const urlImages=`http://localhost:8080/images/imagesproduct/${infoItem}`
  const urlProduct=`http://localhost:8080/products/${infoItem}`
  // const urlService=`http://3.144.218.41:8080/featuresproduct/${infoItem}`
  // const urlImages=`http://3.144.218.41:8080/images/imagesproduct/${infoItem}`
  // const urlProduct=`http://3.144.218.41:8080/products/${infoItem}`
  // const urlCreateProduct = "http://3.144.218.41:8080/products";
  // const urlAddImages = "http://3.144.218.41:8080/images";
  const [form, setForm] = useState(initialForm);
  const [formImg, setFormImg] = useState(imagesInitialForm);
  const [imagesToProduct, setImagesToProduct] = useState([]);
  const {validateNewProduct} = helpValidaciones();
  const [errors, setErrors] = useState({})
  const { texts, language } = useContext(LanguageContext);
  const [showServices, setShowServices] = useState(false)
  const [servicesToProduct, setServicesToProduct] = useState([])
  const token= localStorage.getItem("Token")
  const {db,loading}=useApi(urlProduct)
  const [imagesDbToDelete, setImagesDbToDelete] = useState(null)
  const { deleteData}=useApi(urlAddImages)
  const navigate = useNavigate()
  const [showLoading, setShowLoading] = useState(false)

  const deleteAllImages=()=>{
    if(imagesDbToDelete && imagesDbToDelete.length >0){
          imagesDbToDelete.map(el=>deleteData(el.id))
        }
  }



  const getInfoDb = async (url,setVariable) => {
    try {
        const res = await fetch(url);
        const data= await res.json()
        setVariable(data)
    }catch (error) {
            
    } 
  };


  useEffect(() => {
    if(infoItem !== "false" && db){
      getInfoDb(urlService,setServicesToProduct)
      getInfoDb(urlImages,setImagesToProduct)
      getInfoDb(urlImages,setImagesDbToDelete)
    

      setForm({
        ...form,
        id:infoItem,
        category: {
          id: db.category.id,
        },
        name: db.name,
        description: db.description,
        address1: db.address1,
        longitude: 23.455,
        latitude: 23.455,
        score: db.score,
        starts: db.starts,
        rules: db.rules,
        security: db.security,
        cancellation: db.cancellation,
        city: {
          id: db.city.id,
        }
      })
    }
  }, [db])

  
  useEffect(() => {
    setErrors({});
  }, [language]);

  const addImages = (item) => {
    setImagesToProduct([...imagesToProduct, { ...item, id: uuidv4() }]);
  };
  const addServices = (id) => {
    setServicesToProduct([...servicesToProduct, id]);
  };

  const deleteImages = (id) => {
    const newImages = imagesToProduct.filter((el) => el.id !== id);
    setImagesToProduct(newImages);
  };
  const deleteServices = (id) => {
    const newServices = servicesToProduct.filter((el) => el.id !== id);
    setServicesToProduct(newServices);
  };

  const addNewServices = async (id,data) => {
    const url = `http://localhost:8080/productfeature/disabled/${id}`
    // const url = `http://3.144.218.41:8080/productfeature/disabled/${id}`
    const options = {
      // mode: "no-cors",
      method: "POST",
     body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"},
    };
    try {
      const res = await fetch(url, options);
      if (res.ok) {
      }
    } catch (error) {
    }
  };




 

  const addPhotosToAProduct = async (data, url, id) => {
    delete data.id;
    data.product.id = id;
    const dataStringify = JSON.stringify(data);
    const options = {
      method: "POST",
      body: dataStringify,
      headers: { "content-type": "application/json" },
    };
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        setImagesToProduct([]);
      }
    } catch (error) {
    }
  };

  const createData = async (data, url) => {
    const arrayProductIds= servicesToProduct.map(el=>el.id)
    const dataStringify = JSON.stringify(data);
    const options = {
      method: infoItem !== "false"?"PUT":"POST",
      body: dataStringify,
      headers: { "content-type": "application/json" },
    };
    try {
      const res = await fetch(url, options);
      const newData = await res.json();
      if (res.ok) {
        imagesToProduct.map((el) =>
          addPhotosToAProduct(el, urlAddImages,  infoItem !== "false"?infoItem:newData)
          );
        setTimeout(() => {
          if(infoItem!== "false"){
            addNewServices(infoItem,arrayProductIds)
          }else{
            addNewServices(newData,arrayProductIds)
          }
        }, 300);
      }
    } catch (error) {
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateNewProduct(form,texts,imagesToProduct,servicesToProduct);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      deleteAllImages()
      createData(form, urlCreateProduct);
      setShowLoading(true)
      setTimeout(() => {
        setShowLoading(false)
        if(infoItem !== "false"){
          navigate("/confirmation/edit")
        }else{
          navigate("/confirmation/create")
        }
      }, 3000);
      
    } else {
      return;
    }
  };
  return (
    <div onClick={()=>setShowServices(false)} className={styles.container}>
      {(loading || showLoading) &&  <Loader/>}
      <ProductDetailsHotelName phrase={texts.administration} />
      <div className={styles.main}>
        <h2>{texts.createProperty}</h2>
        <div className={styles.form}>
          <AdminForm
            form={form}
            onChange={handleChange}
            setForm={setForm}
            onSubmit={handleSubmit}
            addImages={addImages}
            deleteImages={deleteImages}
            imagesToProduct={imagesToProduct}
            formImg={formImg}
            setFormImg={setFormImg}
            errors={errors}
            showServices={showServices}
            setShowServices={setShowServices}
            addServices={addServices}
            servicesToProduct={servicesToProduct}
            deleteServices={deleteServices}
          />
        </div>
      </div>
    </div>
  );
}