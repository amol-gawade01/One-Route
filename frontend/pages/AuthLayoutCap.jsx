import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const AuthLayoutCap = ({children}) => {
 const token = localStorage.getItem('token')
 const [isLoading,setIslLoading] = useState(true)
 const { captain ,setCaptain} = useContext(CaptainDataContext)
   const navigate = useNavigate()
  
   useEffect(() => {
     if ( !token) {
       navigate('/captain-login')
       return
     }


axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
    headers:{
        
        "auth-token":token
    }
})
.then((response) => {
    const data = response.data;
    if(response.status == 200){
        console.log(response.status)
        setCaptain(data.user)
        setIslLoading(false)
        
return (
    <>
    {children}
    </>
)
    }
})
.catch((err) => {
    console.log(err)
    localStorage.removeItem("token");
    navigate('/captain-login')
})


   }, [ token])



if(isLoading){
    return (
        <>
        Loading...
        </>
    )
}




}
 

export default AuthLayoutCap