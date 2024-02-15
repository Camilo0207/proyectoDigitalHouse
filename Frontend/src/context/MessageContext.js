import { createContext, useState } from "react";

const MessageContext = createContext()

const initialMessage = false

const MessageProvider = ({children})=>{
    const [showErrormessage, setShowErrorMessage] = useState(initialMessage)
    const [idProduct, setIdProduct] = useState(null)

    const toggleMessage=(val,id)=>{
        if(val){
            setIdProduct(id)
            setShowErrorMessage(true)
        }else{
            setShowErrorMessage(false)
        }
    }
    const data={showErrormessage,toggleMessage,idProduct}

    return(
        <MessageContext.Provider value={data}>{children}</MessageContext.Provider>
    )
}
export { MessageProvider };
export default MessageContext;