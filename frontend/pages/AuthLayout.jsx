import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'

const AuthLayout = ({ children }) => {
  const { user } = useContext(userDataContext)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.email || !token) {
      navigate('/login')
    }
  }, [user, token, navigate])

  return <>{children}</>
}

export default AuthLayout
