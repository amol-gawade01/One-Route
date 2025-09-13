 import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'


const AuthLayoutUser = ({ children }) => {
  const token = localStorage.getItem('token')
  console.log('this is token',token)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { setUser } = useContext(userDataContext)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/userInfo`, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('get there')
          setUser(response.data.data)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        localStorage.removeItem('token')
        navigate('/login')
      })
  }, [token, navigate, setUser])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <>
    {children}
    </>
  )

}

export default AuthLayoutUser