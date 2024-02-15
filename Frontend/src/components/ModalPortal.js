import { useEffect } from "react";
import ReactDOM from "react-dom";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import "../styles/Modal.css";

const ModalPortal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  const [open,close] = useBodyScrollLock()
  

  useEffect(() => {
    if(isOpen){
      open()
    }else{
      close()
    }
    
  }, [isOpen])
  

  return ReactDOM.createPortal(
    <article className={`modal ${isOpen && "is-open"} `} onClick={closeModal}>
      
      <div
        className={"modal-container" }
        onClick={handleModalContainerClick}
      >
        <button className="modal-close" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </article>,
    document.getElementById("modal")
  );
};

export default ModalPortal;
