import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div className='h-full w-full items-center'>
       
      <div className='w-full  flex-col '>
        <img src={props.rideDetails.vehicleImage} className='object-cover ml-16  mb-4 mt-10'/>
        <div className=' w-full  justify-items-start'>
        <h3 className='text-2xl font-semibold border-b-2 border-gray-300 w-full mt-4'>{props.rideDetails.vehicleType}</h3>
        <h3 className='text-2xl border-b-2 border-gray-300 w-full mt-4'> <i className="ri-money-rupee-circle-fill object-cover text-3xl mr-3"> </i>{props.rideDetails.vehiclePrice}</h3>
        </div>
      </div>
       <div className=' items-center flex border-b-2 border-gray-300 w-full mt-4 '>
       <i className="ri-map-line object-cover mr-4"></i>
        <h4 className=' font-semibold text-lg ml-4'>{props.pickup}</h4>
      </div>

      <div className=' items-center flex border-b-2 border-gray-300 w-full mt-4'>
        <i className="ri-map-pin-fill overflow-x-clip text-lg mr-6"></i>
        <h4 className=' font-semibold text-lg'>{props.destination}</h4>
      </div>
     
     
      <div className='text-center w-full mt-8'>
        <button onClick={() => {props.setlookingDriver(true)
          props.setconfirmRide(false)
        }} className='w-40 h-10 bg-green-500 text-2xl text-white font-bold rounded-3xl '>Confirm</button>
      </div>

        
    </div>
  )
}

export default ConfirmRide