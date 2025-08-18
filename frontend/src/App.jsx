import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from '../pages/UserLogin'
import UserSignup from '../pages/UserSignup'
import CaptainSignup from '../pages/CaptainSignup'
import CaptainLogin from '../pages/CaptainLogin'
import Home from '../pages/Home';
import Start from '../pages/Start'
import AuthLayoutUser from '../pages/AuthLayoutUser'
import UserLogout from '../pages/UserLogout'
import AuthLayoutCap from '../pages/AuthLayoutCap'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/home' element={<AuthLayoutCap><Home/></AuthLayoutCap>}/>
        <Route path='/login' element={<UserLogin/>}/>
         <Route path='/logout' element={<AuthLayoutUser>
          <UserLogout/>
         </AuthLayoutUser>}/>
        <Route path='/Signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/start' element={<Start/>}/>
      </Routes>
    </div>
  )
}

export default App