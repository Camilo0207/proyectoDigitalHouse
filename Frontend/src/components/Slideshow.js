import React, { useRef, useEffect, useCallback } from "react";
// import { ReactComponent as FlechaIzquierda } from "./../img/iconmonstr-angel-left-thin.svg";
// import { ReactComponent as FlechaDerecha } from "./../img/iconmonstr-angel-right-thin.svg";
import styled from "styled-components";
import next from "../assets/img/next.png";

const Slideshow = ({
  children,
  controles = false,
  autoplay = false,
  velocidad = "500",
  intervalo = "5000",
  setIdElement
}) => {
  const slideshow = useRef(null);
  const intervaloSlideshow = useRef(null);
   

  const siguiente = useCallback(() => {
    if ( slideshow.current !== null && slideshow.current.children.length > 0) {
      const primerElemento = slideshow.current.children[0];

      setIdElement(parseInt(primerElemento.id)+1)
      slideshow.current.style.transition = `${velocidad}ms ease-out all`;

      const tamañoSlide = slideshow.current.children[0].offsetWidth;

      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      const transicion = () => {
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translateX(0)`;

        slideshow.current.appendChild(primerElemento);

        slideshow.current.removeEventListener("transitionend", transicion);
        
      };

      slideshow.current.addEventListener("transitionend", transicion);
    }
  }, [velocidad]);

  const anterior = () => {
  
    if (slideshow.current.children.length > 0) {
      const index = slideshow.current.children.length - 1;
      const ultimoElemento = slideshow.current.children[index];
      setIdElement(parseInt(ultimoElemento.id)+1 )

      slideshow.current.insertBefore(
        ultimoElemento,
        slideshow.current.firstChild
      );

      slideshow.current.style.transition = "none";
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `${velocidad}ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  useEffect(() => {
    if (autoplay) {
      intervaloSlideshow.current = setInterval(() => {
        siguiente();
      }, intervalo);

      // slideshow.current.addEventListener("mouseenter", () => {
      //   clearInterval(intervaloSlideshow.current);
      // });

      // slideshow.current.addEventListener("mouseleave", () => {
      //   intervaloSlideshow.current = setInterval(() => {
      //     siguiente();
      //   }, intervalo);
      // });
    }
  }, [autoplay]);

  return (
    <ContenedorPrincipal>
      <ContenedorSlideshow ref={slideshow}>{children}</ContenedorSlideshow>
      {controles && (
        <Controles>
          {/* <Boton onClick={anterior}>
            <img src={next} alt="dsfds" />
          </Boton> */}
          <Boton derecho onClick={siguiente}>
            <img src={next} alt="" />
          </Boton>
        </Controles>
      )}
    </ContenedorPrincipal>
  );
};

const ContenedorPrincipal = styled.div`
  position: relative;
`;

const ContenedorSlideshow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Slide = styled.div`
  min-width: 100%;
  overflow: hidden;
  transition: 0.3s ease all;
  z-index: 8;
  /* max-height: 200px; */
  position: relative;
  /* height: 100%; */
  min-height: 230px;
  max-height: 300px;

  img {
    border-radius: 5px 5px 0 0;
    width: 100%;
    vertical-align: top;
    /* min-height: 250px;
    max-height: 300px; */
    height: 100%;

  }
`;

const TextoSlide = styled.div`
  background: ${(props) =>
    props.colorFondo ? props.colorFondo : "rgba(0,0,0,.3)"};
  color: ${(props) => (props.colorTexto ? props.colorTexto : "#fff")};
  width: 100%;
  padding: 10px 60px;
  text-align: center;
  position: absolute;
  bottom: 0;

  @media screen and (max-width: 700px) {
    position: relative;
    background: #000;
  }
`;

const Controles = styled.div`
  position: absolute;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* background: #000; */
  display: flex;
  align-items: center;
`;

const Boton = styled.button`
  margin: 0 15px;
  padding: 5px;
  pointer-events: all;
  background: #1dbeb4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  outline: none;
  width: 35px;
  height: 35px;
  text-align: center;
  position: absolute;
  transition: 0.3s ease all;
  /* &:hover {
		background: rgba(0,0,0,.2);
		path {
			fill: #fff;
		}
	} */

  path {
    filter: ${(props) =>
      props.derecho
        ? "drop-shadow(-2px 0px 0px #fff)"
        : "drop-shadow(2px 0px 0px #fff)"};
  }

  ${(props) => (props.derecho ? "right: 0" : "left: 0")}
`;

export { Slideshow, Slide, TextoSlide };
