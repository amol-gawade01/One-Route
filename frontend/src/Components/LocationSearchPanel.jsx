import React from 'react'

const LocationSearchPanel = (props) => {
  let locationArray = [
    'Mumbai Parel lalbaug , 40001',
     'Mumbai Parel lalbaug , 40001',
      'Mumbai Parel lalbaug , 40001',
       'Mumbai Parel lalbaug , 40001',
  ]
   return (
    <div>
      {locationArray.map((elem,idx) => (
         <div key={idx} onClick={() => {
          props.setshowVehicles(true)
          props.setShowBg(false)
          props.setDestination(elem)
         }} className='ml-4 flex  item-center my-4 py-2 w-[90%] justify-start active:border-b-2 active:bg-gray-200 rounded-2xl'>
        <i className="ri-map-pin-fill mr-3 text-lg"></i>
        <h3 className='font-semibold text-lg'>{elem}</h3>
        </div>
      ))}
   </div>
    
  )
}

export default LocationSearchPanel