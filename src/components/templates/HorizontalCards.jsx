import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "/no-image.webp";

function HorizontalCards({data}) {
  return (
    <div className='w-full p-5 select-none '>
          <div className='w-[100%]  flex overflow-y-hidden mb-5 '>
              {data.length  > 0 ? data.map((d, i)=> <Link  to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[15%] bg-zinc-900 mr-5 mb-5 h-[30vh]  rounded-xl'>
                <img className='w-full object-cover h-[55%] rounded-t-xl' src={d.backdrop_path ||d.poster_path ?`https://image.tmdb.org/t/p/original/${d.backdrop_path ||d.poster_path }`:noimage} alt="" />
                   <div className='text-white p-3 h-[45%]'>
                   <h1 className='font-black text-xl font-semibold  '>{d.original_name|| d.title|| d.name|| d.original_title}</h1>
                   <p className=' '>{d.overview.slice(0,50)}...<span className='text-zinc-400'>more</span>  </p>
                   </div> 
                </Link>):<h1 className='text-3xl mt-5 text-white font-black text-center'>Nothing to show</h1>}
          </div>
    </div> 
  )
}

export default HorizontalCards 