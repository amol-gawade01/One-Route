import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className='h-full w-full '>
       
      <div className='w-full  flex fllex-row justify-between '>
        <img src={props.rideDetails.vehicleImage} className='object-contain w-40 h-40   mb-4 mt-4'/>
        <div className='mt-10 mr-4 text-center'>
        <h3 className='font-bold text-lg'>Captain Name</h3>
        <h4 className='font-semibold'>MH-43-30000</h4>
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
     
     
     

        
    </div>
  )
}

export default WaitingForDriver