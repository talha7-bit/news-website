import React, { useEffect, useState } from 'react'
import Card from './Card';
import { LoaderIcon } from 'lucide-react';

const Home = () => {
    const[data,setdata]=useState([]);
    const[search,setsearch]=useState("");
    const[loading,setloading]=useState("");
    const[load,setload]=useState(false);
    const[error,seterror]=useState("");
    const API_KEY="8844e36ff231195c46574fc1ffd59c89";

    const fetchdata=async(query="footbal")=>{
    
        try{
        const response=await fetch(`https://gnews.io/api/v4/search?q=${query}&apikey=8844e36ff231195c46574fc1ffd59c89`)  
        const result=await response.json();
      
        
        console.log(result.articles);
        setdata(result.articles);

        }catch(error){
        console.log("an error occured while fetching data");
        seterror("an error occured while fetching data");
        }finally{
          seterror("")
        }
    }
    useEffect(()=>{
         setloading("loading...")
    
        fetchdata().finally(()=>{
        setloading("")
        })
    },[])
    const handlesearch=(e)=>{
       e.preventDefault();
        
      if(search.trim()==""){
        setload(true);
        seterror("please search anything showing default results")
    
    setTimeout(() => {
       fetchdata()
      setload(false)
      
    
    }, 2000); 
      
    }else{
      setload(true)
     
     fetchdata(search).finally(()=>{
      setload(false);
     })
    
      }
     
    }

   
    const handlecategory=(cate)=>{
      setload(true);
      
      setsearch('')
      fetchdata(cate).finally(()=>{
        setload(false)
      })
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
      className='px-2 py-1 border rounded mx-1 sm:mx-3'
      />
      <button className='px-2 py-1 bg-blue-500 text-white rounded mx-1' type='submit'>{load ? (<LoaderIcon className='w-4 h-4 animate-spin'/>):("Search")}</button>
    </form>
    <div className='flex flex-wrap justify-center mt-3 gap-2'>
     {category.map(cat=>(
      <button  
      key={cat}
      onClick={()=>handlecategory(cat)}
     className='bg-gray-800 text-white px-3 py-1 cursor-pointer rounded hover:bg-gray-700 transition text-sm'
      >{cat.charAt(0).toUpperCase()+cat.slice(1)}</button>
     ))}
    
    </div>
    {error && <h1 className='mt-1 text-red-800 flex items-center justify-center'>{error}</h1>}
       
  
   
{loading && <h3 className='flex items-center justify-center mt-60'>{loading}</h3>}
     
   <Card items={data}/>
    </div>
  )
}

export default Home
