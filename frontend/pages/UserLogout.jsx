import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
 
    
     
         axios.get(`${import.meta.env.VITE_BASE_URL}/users/Logout`,{
          headers:{
              "auth-token":token
          }
      }).then((response) => {
          if(response.status === 200){
              localStorage.removeItem('token')
              navigate('/login')
          }
      })
      
   
  return (
    <div>

    </div>
  )
}

export default UserLogout