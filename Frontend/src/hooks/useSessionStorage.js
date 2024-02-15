import { useEffect, useState } from "react"

export const useSessionStorage=(key)=>{
    const [user, setUser] = useState(null)
    const local = sessionStorage.getItem(key)

    useEffect(() => {
        if(local){
            const userInfo= JSON.parse(local)
            setUser(userInfo)
        }else{
            setUser(null)
        }
    }, [local])
    

    const setSessionStorage=(info)=>{   
        sessionStorage.setItem(key,JSON.stringify(info))
    }

    const removeSessionStorage=()=>{
        sessionStorage.removeItem(key)
    }

    return{
        setSessionStorage,
        user,
        removeSessionStorage
    }
}