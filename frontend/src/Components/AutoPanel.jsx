import React from "react";
import { carImage } from "../../utils/images";
import { motoImage } from "../../utils/images";
import { autoImage } from "../../utils/images";
const AutoPanel = (props) => {
  const vehicleInfo = [
    {
      vehicleType:"Uber Go",
      vehicleImage:`${carImage}`,
      vehicleCapacity:"4",
      vehiclePrice:"499"
    },{
       vehicleType:"Uber Moto",
      vehicleImage:`${motoImage}`,
      vehicleCapacity:"1",
      vehiclePrice:"499"
    },{
       vehicleType:"Uber Auto",
      vehicleImage:`${autoImage}`,
      vehicleCapacity:"3",
      vehiclePrice:"499"
    }
  ]
  return (
    <div className="flex-col flex gap-1">
      
     {vehicleInfo.map((elem,idx) => {
       return (<div onClick={() => {
        props.setconfirmRide(true)
        props.setrideDetails(elem)
        props.setshowVehicles(false)

       }} key={idx} className="flex  items-center  w-full rounded-lg bg-white  p-2  ">
        <img src={elem.vehicleImage} className="h-18 w-20 object-cover" />
        <div className="ml-6 flex flex-col justify-between w-40">
          <h5 className="text-lg font-semibold w-30">{elem.vehicleType}</h5>
          <span className="flex flex-row ">
            <i className="ri-team-line text-xl m"></i>
            <h5 className="text-xl ">{elem.vehicleCapacity}</h5>
          </span>
        </div>
        <div className="ml-8  flex flex-row w-20">
          <i className="ri-money-rupee-circle-fill object-cover text-2xl"> </i>
          <h5 className="text-2xl ">{elem.vehiclePrice}</h5>
        </div>
      </div>)
     })}
  </div>
)
}

export default AutoPanel;
