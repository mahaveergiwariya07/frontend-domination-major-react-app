import axios from '../../utils/axios.jsx';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from "../../../public/no-image.webp";
 
function Topnav() {
             const [query, setquery] = useState("")
               const [searches, setsearches] = useState([]);

             const GetSearches = async() =>{
                try{ 
                    const {data}= await axios.get(`/search/multi?query=${query}`)
                    setsearches(data.results)
                } catch(error){
                     console.log("Error:",error)
                }
              };
        
           useEffect(()=>{
                GetSearches();
           }, [query])



  return (
     <div className='pl-[20%]'>
    <div className='w-full h-[10vh] relative flex justify-start items-center'>
           <i className="text-4xl text-zinc-400  ri-search-2-line"></i>  
           <input onChange={(e)=>setquery(e.target.value)} value={query} className='w-[50%] mx-10 p-5 text-zinc-200 text-xl outline-none border-none bg-transparent' type="text" placeholder='search anything' />
            {query.length > 0 &&  <i onClick={()=> setquery("")} className="text-2xl text-zinc-400 ri-close-circle-fill"></i>}
          
           <div id="baar" className='z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto'>
                {searches.map((s,i)=> (<Link to={`/${s.media_type}/details/${s.id}`}  key={i} className='hover:text-black hover:bg-zinc-300 duration:300 font-bold  w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100 text-zinc-700'>
                     <img className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg' src={s.backdrop_path || s.backdrop_path ?`https://image.tmdb.org/t/p/original/${s.backdrop_path ||s.profile_path}`: noimage} alt="" />
                     <span>{s.original_name|| s.title|| s.name|| s.original_title}</span>
                 </Link>)
                )}
                
                
           </div>
    </div>
    </div>
  )
}

export default Topnav