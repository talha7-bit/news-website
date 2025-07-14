import React, { useEffect, useState } from 'react'
import Card from './Card';

const Home = () => {
    const[data,setdata]=useState([]);
    const[search,setsearch]=useState("");
    const[error,seterror]=useState("");
    const API_KEY="a32d4f57cef043d6ac4405c0af44119c";

    const fetchdata=async(query="footbal")=>{
        try{
        const response=await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)  
        const result=await response.json();
        console.log(result.articles);
        setdata(result.articles);

        }catch(error){
        console.log("an error occured while fetching data");
        seterror("an error occured while fetching data");
        }
    }
    useEffect(()=>{
        fetchdata();
    },[])
    const handlesearch=(e)=>{
      e.preventDefault();
      fetchdata(search);
    }
    const handlecategory=(cate)=>{
      fetchdata(cate);
      setsearch('');
    }
    const category=[
      "technology",
      "sports",
      "health",
      "business",
      "science",
      "entertainment",
      "politics"
    ]
  return (
    <div>
    <form onSubmit={handlesearch}>
      <input type='text' placeholder='search any news' value={search} onChange={(e)=>setsearch(e.target.value)}
      className='px-4 py-1 border rounded mx-3'
      />
      <button className='px-4 py-1 bg-blue-500 text-white rounded mx-1' type='submit'>Search</button>
    </form>
    <div className='flex flex-wrap justify-center mt-3 gap-2'>
     {category.map(cat=>(
      <button  
      key={cat}
      onClick={()=>handlecategory(cat)}
     className='bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition text-sm'
      >{cat.charAt(0).toUpperCase()+cat.slice(1)}</button>
     ))}
    </div>
      <Card items={data}/>
    </div>
  )
}

export default Home
