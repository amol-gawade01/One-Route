import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../src/Components/LocationSearchPanel";
import { backgroundImage, carImage } from "../utils/images";
import AutoPanel from "../src/Components/AutoPanel";
import ConfirmRide from "../src/Components/ConfirmRide";
import LookingForDriver from "../src/Components/LookingForDriver";
import WaitingForDriver from "../src/Components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [showBg, setShowBg] = useState(false);
  const bgRef = useRef();
  const closeBg = useRef();
  const [showVehicles, setshowVehicles] = useState(false);
  const vehiclePAnelref = useRef();
  const confirmRideref = useRef();
  const [confirmRide,setconfirmRide] = useState(false)
  const [rideDetails,setrideDetails] = useState({})
  const [lookingDriver,setlookingDriver] = useState(false)
  const lookingDriverref = useRef()
  const [waitingfordriver,setwaitingfordriver] = useState(false)
  const waitingfordriverref = useRef()

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (showBg) {
      gsap.to(bgRef.current, {
        height: "70%",
      });
      gsap.to(closeBg.current, {
        opacity: 1,
      });
    } else {
      gsap.to(bgRef.current, {
        height: "0%",
      });
      gsap.to(closeBg.current, {
        opacity: 0,
      });
    }
  }, [showBg, closeBg]);

  useGSAP(() => {
    if (showVehicles) {
      gsap.to(vehiclePAnelref.current, {
        transform: "translateY(0)",
      });
      gsap.to(bgRef.current, {
        height: "0%",
      });
      gsap.to(closeBg.current, {
        opacity: 0,
      });
    }else{
      gsap.to(vehiclePAnelref.current, {
        transform: "translateY(100%)",
      });
    }
  }, [showVehicles, showBg, closeBg,setshowVehicles]);

  useGSAP(() => {
    if (confirmRide) {
      gsap.to(confirmRideref.current, {
        transform: "translateY(0)",
      });
    }else{
      gsap.to(confirmRideref.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRide]);


  useGSAP(() => {
    if (lookingDriver) {
      gsap.to(lookingDriverref.current, {
        transform: "translateY(0)",
      });
    }else{
      gsap.to(lookingDriverref.current, {
        transform: "translateY(100%)",
      });
    }
  }, [lookingDriver]);


  useGSAP(() => {
    if (waitingfordriver) {
      gsap.to(waitingfordriverref.current, {
        transform: "translateY(0)",
      });
    }else{
      gsap.to(waitingfordriverref.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingfordriver]);

  return (
    <div className="h-screen fixed">
      <img
        className="h-10 w-26 mt-8 ml-6 right-6 absolute "
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
      />
      <div className="h-screen w-screen ">
        <img
          className="h-full w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcHe25BHZYkSXUNnT8yKKTHxA2fgNl210RCu-GgyoDpe1sISnAFP00o6c19rYduzAgps&usqp=CAU"
        />
      </div>
      <div className="h-screen w-full justify-end  top-0 flex flex-col absolute">
        <div className="h-[30%]  relative bg-white rounded-t-4xl">
          <i
            onClick={() => {
              setShowBg(false);
            }}
            ref={closeBg}
            className="ri-arrow-down-wide-line z-10 absolute right-6 top-4 text-2xl opacity-0"
          ></i>
          <h4 className="text-lg ml-10 mt-4 font-sans font-bold">
            Find a trip
          </h4>
          <form
            className="ml-6 mt-4"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              value={pickup}
              onClick={() => {
                setShowBg(true);
              }}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              type="text"
              placeholder="Add a Pick-up location"
              className="bg-gray-200 py-2 px-12  rounded-lg placeholder-black placeholder:text-lg font-sans"
            />
            <input
              value={destination}
              onClick={() => {
                setShowBg(true);
              }}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              type="text"
              placeholder="Your destination"
              className="  bg-gray-200 py-2 px-12 rounded-lg placeholder-black placeholder:text-lg font-sans mt-12"
            />
          </form>
        </div>
        <div ref={bgRef} className="bg-white min-h-auto z-10">
          <LocationSearchPanel
            setShowBg={setShowBg}
            setshowVehicles={setshowVehicles}
            setDestination={setDestination}
          />
        </div>
      </div>
      <div
        ref={vehiclePAnelref}
        className="w-full max-h-[50%] overflow-scroll scroll-m-1 px-3 py-8 fixed bottom-0 bg-gray-200 z-20 rounded-2xl translate-y-full"
      >
        <svg
          onClick={() => setshowVehicles(false)}
          className="w-6 h-6 absolute top-4 right-6 z-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="rgba(0,0,0,1)"
        >
          <path d="M12 15.6315L20.9679 10.8838L20.0321 9.11619L12 13.3685L3.9679 9.11619L3.03212 10.8838L12 15.6315Z"></path>
        </svg>

        <h4 className="font-semibold text-base py-2">Choose Vehicle</h4>

        <AutoPanel setconfirmRide={setconfirmRide} setrideDetails={setrideDetails} setshowVehicles={setshowVehicles} />
      </div>
      <div
        ref={confirmRideref}
        className="w-full min-h-[70%] overflow-scroll scroll-m-1 px-3 py-8 fixed bottom-0 bg-white z-20 rounded-2xl translate-y-full"
      >
        <svg
          onClick={() => setconfirmRide(false)}
          className="w-6 h-6 absolute top-4 right-6 z-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="rgba(0,0,0,1)"
        >
          <path d="M12 15.6315L20.9679 10.8838L20.0321 9.11619L12 13.3685L3.9679 9.11619L3.03212 10.8838L12 15.6315Z"></path>
        </svg>

        <h4 className="font-semibold text-base py-2">Confirm Your Ride</h4>

        <ConfirmRide rideDetails={rideDetails} destination={destination} pickup={pickup} setlookingDriver={setlookingDriver} setconfirmRide={setconfirmRide}/> 
      </div>

      <div
        ref={lookingDriverref}
        className="w-full  overflow-scroll scroll-m-1 px-3 py-6 fixed bottom-0 bg-white z-10 rounded-2xl translate-y-full"
      >
        <svg
          onClick={() => setlookingDriver(false)}
          className="w-6 h-6 absolute top-4 right-6 z-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="rgba(0,0,0,1)"
        >
          <path d="M12 15.6315L20.9679 10.8838L20.0321 9.11619L12 13.3685L3.9679 9.11619L3.03212 10.8838L12 15.6315Z"></path>
        </svg>

      <div className="text-center w-full border-b-2 border-gray-400">
        <h4 className="font-semibold text-2xl py-2">Looking For Driver</h4>
        </div>  

      <LookingForDriver rideDetails={rideDetails} lookingDriver={lookingDriver} destination={destination} pickup={pickup} setwaitingfordriver={setwaitingfordriver} setlookingDriver={setlookingDriver}/>
      </div>
       <div
        ref={waitingfordriverref}
        className="w-full min-h-[70%] overflow-scroll scroll-m-1 px-3 py-3  fixed bottom-0 bg-white z-10 rounded-2xl translate-y-full"
      >
        <svg
          onClick={() => setwaitingfordriver(false)}
          className="w-6 h-6 absolute top-4 right-6 z-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="rgba(0,0,0,1)"
        >
          <path d="M12 15.6315L20.9679 10.8838L20.0321 9.11619L12 13.3685L3.9679 9.11619L3.03212 10.8838L12 15.6315Z"></path>
        </svg>

      <div className="text-center w-full border-b-2 border-gray-400">
        <h4 className="font-semibold text-2xl py-2">Waiting For Driver</h4>
        </div>  

      <WaitingForDriver rideDetails={rideDetails} destination={destination} pickup={pickup}/>
      </div>

    </div>
  );
};

export default Home;
