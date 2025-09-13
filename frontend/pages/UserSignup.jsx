import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backgroundImage } from "../utils/images";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { useEffect } from "react";

const UserSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useContext(userDataContext);

  
  
  const submitForm = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/Signup`,
      newUser
    );
    console.log(response);
    if (response.status == 200) {
      const data = response.data;
      console.log("data", data);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/home");
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="h-screen w-screen bg-white">
      <img className="w-40 h-18" src={`${backgroundImage}`} />
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
        className="flex flex-col items-center "
      >
        <h3 className="font-bold text-2xl mt-6">Your Info please</h3>
        <input
          type="text"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          value={firstname}
          placeholder="Firstname"
          required
          className="font-mono bg-gray-300 rounded-2xl pr-6  text-center placeholder:text-gray-700 mt-2 p-2 "
        />
        <input
          type="text"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          value={lastname}
          placeholder="Lastname"
          required
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
        />
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="Email"
          required
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
        />
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
          placeholder="Password"
        />
        <button className="mt-8 bg-black h-10 w-40 rounded-4xl text-white  text-2xl pt-1 font-sans text-center font-bold ">
          Signup
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <h4 className="text-gray-700 mr-1">Already have an account ?</h4>
        <Link to="/login" className="text-blue-800">
          Login
        </Link>
      </div>
      <div className="text-center relative top-36 p-6">
        <Link
          to="/captain-signup"
          className="bg-orange-600 text-center px-16 rounded-3xl text-white font-semibold text-2xl py-4"
        >
          Signup as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
