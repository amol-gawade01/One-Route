import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { backgroundImage } from '../utils/images';

const CaptainLogin = () => {
  const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [userData,setuserData] = useState({})
    const submitForm = (e) => {
      e.preventDefault();
      setuserData({
        email:email,
        password:password
      })
  
      setEmail('')
      setPassword({})
      
    }
  
    return (
      <div className="h-screen w-screen bg-white">
        <img className="w-40 h-18" src={`${backgroundImage}`} />
        <form onSubmit={(e) => {
          submitForm(e) }} className="flex flex-col items-center ">
          <h3 className="font-bold text-2xl mt-6">What's your email ?</h3>
          <input
            type="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
              console.log(e.target.value)
            }}
            placeholder="email@example.com"
            required
            className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2  "
          />
          
          <input
            type="text"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
              console.log(e.target.value)
            }}
            className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
            placeholder="Password"
          />
          <Link className="mt-8 bg-black h-10 w-40 rounded-4xl text-white  text-2xl pt-1 font-sans text-center font-bold ">
            Login
          </Link>
        </form>
        <div className="flex justify-center mt-4">
          <h4 className="text-gray-700 mr-1">New to Uber?</h4>
          <Link to="/captain-signup" className="text-blue-800">
            Sign Up
          </Link>
        </div>
        <div className="text-center relative top-70 p-6">
  
        <Link to='/login' className="bg-green-600 text-center px-16 rounded-3xl text-white font-semibold text-2xl py-4" >Login as User</Link>
        </div>
      </div>
    );
}

export default CaptainLogin