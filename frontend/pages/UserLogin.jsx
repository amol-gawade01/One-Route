import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backgroundImage } from "../utils/images";
import { userDataContext } from "../context/UserContext";
import { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  
  const submitForm = async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      newUser
    );
    console.log(response);
    if (response.status == 200) {
      const data = response.data;
      console.log("data", data.token);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/home");
    }

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
        <h3 className="font-bold text-2xl mt-6">What's your email ?</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email@example.com"
          required
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2  "
        />

        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="font-mono bg-gray-300 rounded-2xl pr-6 text-center placeholder:text-gray-700 mt-2 p-2 "
          placeholder="Password"
        />
        <button className="mt-8 bg-black h-10 w-40 rounded-4xl text-white  text-2xl pt-1 font-sans text-center font-bold ">
          Login
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <h4 className="text-gray-700 mr-1">New to Uber?</h4>
        <Link to="/Signup" className="text-blue-800">
          Sign Up
        </Link>
      </div>
      <div className="text-center relative top-60 p-6">
        <Link
          to="/captain-login"
          className="bg-green-600 text-center px-16 rounded-3xl text-white font-semibold text-2xl py-4"
        >
          Login as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
