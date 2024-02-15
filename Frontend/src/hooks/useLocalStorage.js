import { useEffect, useState } from "react"

export const useLocalStorage=(key)=>{
    const [user, setUser] = useState(null)
    const local = localStorage.getItem(key)
    
    useEffect(() => {
        if(local){
            const userInfo= JSON.parse(local)
            setUser(userInfo)
        }else{
            setUser(null)
        }
    }, [local])
    

    const setLocalStorage=(info)=>{   
        localStorage.setItem(key,JSON.stringify(info))
    }

    const removeLocalStorage=()=>{
        localStorage.removeItem(key)
    }

    return{
        setLocalStorage,
        user,
        removeLocalStorage
    }
}