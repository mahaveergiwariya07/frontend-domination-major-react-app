import React from 'react'
import { Link } from 'react-router-dom'

function Header({data}) {
    console.log(data)
  return (
    <div style={
       { background:`linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path ||data.profile_path})`, backgroundPosition: 'top 7%', backgroundSize: 'cover', backgroundrepeat: 'no-repeat' }
    } className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%]'>
        <h1 className=' w-[50%] font-black text-4xl text-white'>{data.original_name|| data.title|| data.name|| data.original_title}</h1>
        <p className=' w-[50%] text-white text-[20px] mt-3 mb-3'>{data.overview.slice(0,200)}...<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400'>more</Link>  </p>
        <p className='text-white mb-3'>
            <i className="text-yellow-500 ri-megaphone-fill mr-[5px]"></i>{data.release_date || "Not Present"}
            <i className="text-yellow-500 ml-[15px] ri-disc-fill mr-[5px]"></i>{data.media_type.toUpperCase()}
        </p>
        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='p-4 bg-[#6556CD] rounded text-white'>Watch Trailer</Link>
    </div>
  )
}

export default Header  