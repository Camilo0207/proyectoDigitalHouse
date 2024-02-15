import React from 'react'
import "../styles/Calendar.css"
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite-rtl.css"
import { useResizeScroll } from '../hooks/useResizeScroll';

export default function Calendar({form,setForm}) {
  const {beforeToday} =DateRangePicker;
  const {width} =useResizeScroll()

    const handleChange=(value)=>{
      if(value){
        setForm({
          ...form,
          checkIn:value[0],
          checkOut:value[1]
        })
      }else{
        setForm({
          ...form,
          checkIn:"",
          checkOut:""
        })
      }
    }
    return (
    <div>
        <DateRangePicker 
          onChange={handleChange} 
          showOneCalendar={width > 890 ? false:true}
          block 
          format="yyyy-MM-dd" 
          defaultCalendarValue={[new Date(), new Date()]}
          placeholder="Check in - Check out"   
          preventOverflow={true}
          disabledDate={beforeToday()}
/>
    </div>
  )
}
