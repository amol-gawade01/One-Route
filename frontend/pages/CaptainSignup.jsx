import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backgroundImage } from "../utils/images";
import axios from "axios";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useEffect } from "react";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);
  const submitForm = async (e) => {
    e.preventDefault();

    const newCaptain = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: Number(capacity),
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      newCaptain
    );
    console.log(response);
    if (response.status == 200) {
      const data = response.data;

      setCaptain(response.data);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setFirstname("");
    setLastname("");
    setPassword("");
    setColor("");
    setPlate("");
    setCapacity("");
    setVehicleType("");
  };

  return (
    <div className="h-screen w-screen bg-white">
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
        className="flex flex-col items-center "
      >
        <img className="w-40 h-18 " src={`${backgroundImage}`} />
        <h3 className="font-bold text-2xl mb-4 ">Your Info please</h3>
        <div className="grid grid-cols-2 gap-1">
          <input
            type="text"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            value={firstname}
            placeholder="Firstname"
            required
            className="font-mono w-38 bg-gray-300 rounded-2xl pr-4 text-center placeholder:text-gray-700 mt-2 p-2 "
          />
          <input
            type="text"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            value={lastname}
            placeholder="Lastname"
            required
            className="font-mono w-38 bg-gray-300 rounded-2xl pr-4 text-center placeholder:text-gray-700 mt-2 p-2 "
          />
        </div>
        <h3 className="mr-48 mt-4 font-semibold">Vehicle Info</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            onChange={(e) => {
              setColor(e.target.value);
            }}
            value={color}
            placeholder="color"
            required
            className="font-mono w-38 bg-gray-300 rounded-2xl pr-4 text-center placeholder:text-gray-700 mt-2 p-2 "
          />

          <input
            type="text"
            onChange={(e) => {
              setPlate(e.target.value);
            }}
            value={plate}
            placeholder="plate no"
            required
            className="font-mono w-38 bg-gray-300 rounded-2xl pr-4 text-center placeholder:text-gray-700 mt-2 p-2 "
          />

          <input
            type="text"
            onChange={(e) => {
              setCapacity(e.target.value);
            }}
            value={capacity}
            placeholder="capacity"
            required
            className="font-mono w-38 bg-gray-300 rounded-2xl pr-4 text-center placeholder:text-gray-700 mt-2 p-2"
          />

          <select
            required
            className="bg-gray-300 w-38 rounded-2xl border-1 border-gray-800  pr-4 text-center placeholder:text-gray-700 mt-2 p-2"
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value);
            }}
          >
            <option value="" disabled className="text-gray-700">
              Vehicle Type
            </option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
          </select>
        </div>

        <h3 className="mr-40 mt-4 font-semibold">Email & Password</h3>
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Email"
            required
            className="font-mono w-50 bg-gray-300 rounded-2xl pr-4 text-center placeholder:text-gray-700 mt-2 p-2"
          />
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="font-mono w-50 bg-gray-300 rounded-2xl pr-4 text-center placeholder:text-gray-700 mt-2 p-2 "
            placeholder="Password"
          />
        </div>

        <button className="mt-4 bg-black h-10 w-40 rounded-4xl text-white  text-2xl pt-1 font-sans text-center font-bold ">
          Signup
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <h4 className="text-gray-700 mr-1">Already have an acount ?</h4>
        <Link to="/captain-login" className="text-blue-800">
          Login
        </Link>
      </div>
      <div className="text-center relative top-8 p-6">
        <Link
          to="/Signup"
          className="bg-orange-600 text-center px-16 rounded-3xl text-white font-semibold text-2xl py-4"
        >
          Signup as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
