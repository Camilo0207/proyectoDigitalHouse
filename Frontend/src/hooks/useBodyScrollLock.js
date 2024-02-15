import { useEffect } from "react";
import { useState } from "react";

const useBodyScrollLock=()=>{
    const bodyStyle = document.body.style;

    const [isLocked, setIsLocked] = useState(
        bodyStyle.overflow === "hidden"
    )

    useEffect(() => {
        bodyStyle.overflow = isLocked ? "hidden" : "auto"
    }, [isLocked, bodyStyle])
    
    const open=()=>setIsLocked(true)
    const close=()=>setIsLocked(false)
    return [open,close]
}

export default useBodyScrollLock;