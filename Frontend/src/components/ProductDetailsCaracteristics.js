import React from 'react'

export default function ProductDetailsCaracteristics({info,title}) {
  const infoArray= info.split(",")
  return (
    <>
        <h3>{title}</h3>
        <ul>
            {infoArray && infoArray.map((el,index)=>(
                <li key={index}>{el}</li>
            ))}
        </ul>
    </>
  )
}
