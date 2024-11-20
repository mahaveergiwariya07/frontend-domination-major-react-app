import React from 'react'
import notfound from "../../public/404.gif";
import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-cente bg-[#151832]' >
      <Link to={`/`}><img className='h-[60%] m-40 object-cover border-none rounded-lg border-0' src={notfound} alt="" /></Link>  
    </div> 
  )
}

export default Notfound