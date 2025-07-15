import React from 'react'

const Card = ({items}) => {
  console.log("items received in the card")
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
     
      {items?.map((item,index)=>(
       <div key={index} className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition duration-300">
        
       <img src={item.image} alt={item.title} className='w-full h-25 object-cover'/>
       <div className='flex flex-col gap-2 p-4'>
       <h1 className='text-lg font-semibold line-clamp-2'>{item.title}</h1>
       <p className='text-sm text-gray-600 line-clamp-3'>{item.description}</p>
      {item.url ? (
  <button
    onClick={() => window.open(item.url)}
    className="bg-blue-600 mt-2 px-4 py-1 text-white rounded-md hover:bg-blue-700 transition"
  >
    Read More
  </button>
) : (
  <span className="text-sm text-gray-500">No URL Available</span>
)}
       </div> 
    </div>
      ))}
    </div>
  )
}

export default Card
