import { createContext, useState } from "react";

const DateSelectedCalendarContext = createContext()

const DateSelectedCalendarProvider = ({children})=>{
    const [errors, setErrors] = useState([])

    const [form, setForm] = useState({
        id:"",
        name: "",
        lastname: "",
        email: "",
        city: ''
        
    })
    const [dateForBack, setDateForBack] = useState({
        checkIn: '',
        checkOut: '',
    })
    
    const[schedule, setSchedule] = useState('')

    
    const data={schedule,setSchedule, form, setForm, dateForBack,setDateForBack, errors, setErrors}

    return(
        <DateSelectedCalendarContext.Provider value={data}>{children}</DateSelectedCalendarContext.Provider>
    )
}
export { DateSelectedCalendarProvider };
export default DateSelectedCalendarContext;