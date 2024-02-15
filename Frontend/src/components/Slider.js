import React, { useEffect, useState } from "react";
import { Slideshow, Slide } from "./Slideshow";
import styles from "../styles/Slider.module.css";
import { useApi } from "../hooks/useApi";

const ITEMS_PER_PAGE = 4;

export default function Slider({controles,autoplay,velocidad,intervalo,id}) {
	// const {db}=useApi(`http://3.144.218.41:8080/images/imagesproduct/${id}`)
	const {db}=useApi(`http://localhost:8080/images/imagesproduct/${id}`)
	const [idElement, setIdElement] = useState(null)
	const [datosApi, setDatosApi] = useState(null)
	const [items, setItems] = useState(null)
	const [currentPage, setCurrentPage] = useState(0)
	const [counter, setCounter] = useState(1)
	
	useEffect(() => {
		if(db){
		  const imagesArray= db.map((el,index)=>({id:index +1,imageUrl:el.imageUrl}))
		setDatosApi(imagesArray)
	  }
	}, [db])
	
	useEffect(() => {
		if(datosApi){
			setItems([...datosApi].splice(0,ITEMS_PER_PAGE))
		}
	}, [datosApi])


  useEffect(() => {
    if (!idElement || idElement === datosApi.length) {
      setCounter(1);
    } else {
      setCounter(idElement + 1);
    }
  }, [idElement]);

  const nextHandler = () => {
    const totalElementos = datosApi.length;
    const nextPage = currentPage + 1;
    const firstIndex =
      idElement === totalElementos ? 0 : nextPage * ITEMS_PER_PAGE;
    if (firstIndex >= totalElementos) return;

    setItems([...datosApi].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(idElement === totalElementos ? 0 : nextPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * ITEMS_PER_PAGE;
    setItems([...datosApi].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(prevPage);
  };

  useEffect(() => {
    if (idElement && idElement % ITEMS_PER_PAGE === 0) {
      nextHandler();
    }
    if (idElement && idElement === datosApi.length) {
      nextHandler();
    }
  }, [idElement]);

  return (
    <main>
      <Slideshow
        controles={controles}
        autoplay={autoplay}
        velocidad={velocidad}
        intervalo={intervalo}
        setIdElement={setIdElement}
      >
        {datosApi &&
          datosApi.map((el, index) => (
            <Slide id={index} key={el.id}>
              <img src={el.imageUrl} alt="" />
            </Slide>
          ))}
      </Slideshow>
      {datosApi && (
        <p
          className={`${
            !autoplay ? styles.counter_fixed : styles.counter_absolute
          }`}
        >
          {counter}/{datosApi.length}
        </p>
      )}

      {!autoplay && (
        <div className={styles.images_small_box}>
          {items &&
            items.map((el) => (
              <div
                className={`${el.id === counter ? styles.img_selected : ""}`}
                key={el.id}
              >
                <img src={el.imageUrl} alt="" />
              </div>
            ))}
        </div>
      )}
    </main>
  );
}
