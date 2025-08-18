import React from 'react'
import { HomeBgImageUrl } from '../utils/images'
import { Link } from 'react-router-dom'


const Start = () => {
  return (
    <div>
        <div style={{ backgroundImage: `url(${HomeBgImageUrl})` }} className='bg-cover bg-center h-screen w-full flex justify-between flex-col bg-red-300'>
            <div className='h-5 '>

            <img className='h-10 w-26 mt-8 ml-6'  src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
            </div>
            <div className='bg-white h-44 w-full'>
                <h3 className='text-3xl font-bold ml-14 mt-4'>Welcome to Uber </h3>
                <Link to='/login' className='flex items-center justify-center w-40 h-20 mt-5 ml-26 rounded-3xl p-4 font-bold bg-black text-white text-lg'>Get Started</Link>
            </div>
        </div>
    </div>  
  )
}

export default Start