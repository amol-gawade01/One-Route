import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { backgroundImage } from '../utils/images';

const CaptainSignup = () => {
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('')
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const [vehicleColor,setVehicleColor] = useState('');
  const [plate,setPlate] = useState('');
  const [capacity,setCapacity] = useState('');
  const [vehicletype,setVehicleType] = useState('');
  const [captainData,setCaptainData] = useState({});

  const submitForm = (e) => {
    e.preventDefault();

     setCaptainData({
      firstname:firstname,
      lastname:lastname,
      email:email,
      password:password,
      vehicle:{
        color:vehicleColor,
        plate:plate,
        vehicleType:vehicletype,
        capacity:capacity
      }

     })

    setEmail('');
    setFirstname('');
    setLastname('');
    setPassword('');
    setVehicleColor('');
    setPlate('');
    setCapacity('');
    setVehicleType('');



  }

  return (
    <div className="h-screen w-screen bg-white">
      <form onSubmit={(e) => {submitForm(e)}} className="flex flex-col items-center ">
        <img className="w-40 h-18" src={`${backgroundImage}`} />
        <h3 className="font-bold text-2xl mt-6">Your Info please</h3>
        <input
          type="text"
          placeholder="Firstname"
          required
          className="font-mono bg-gray-300 rounded-2xl pr-6  text-center placeholder:text-gray-700 mt-2 p-2 "
        />
        <input
          type="text"
          placeholder="Lastname"
          required
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
        />
        <input
          type="text"
          placeholder="Email"
          required
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
        />
       
        <input
          type="text"
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
          placeholder="vehicle color"
        />
        <input
          type="text"
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
          placeholder="Number plate"
        />

        <input
          type="text"
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
          placeholder="Passanger Capaciy"
        />
        <input
          type="text"
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 overflow-x-auto"
          placeholder="vehicle type (ex:car)"
        />
         <input
          type="text"
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
          placeholder="Password"
        />
        <Link className="mt-8 bg-black h-10 w-40 rounded-4xl text-white  text-2xl pt-1 font-sans text-center font-bold ">
          Signup
        </Link>
      </form>
      <div className="flex justify-center mt-4">
        <h4 className="text-gray-700 mr-1">Already have an acount ?</h4>
        <Link to="/captain-login" className="text-blue-800">
          Login
        </Link>
      </div>
    </div>
  );
}

export default CaptainSignup