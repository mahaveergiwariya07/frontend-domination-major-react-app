import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadtv, removetv } from '../store/actions/tvActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from "./Loading.jsx";
import HorizontalCards from "../components/templates/HorizontalCards.jsx";

function tvdetails() {
  const {pathname} = useLocation()
  const navigate = useNavigate(); 
  const {id} = useParams();
  const  {info} = useSelector((state)=> state.tv);
  const dispatch = useDispatch();
  console.log(info)
   useEffect(() => {
          dispatch(asyncloadtv(id))

          return () => {
            dispatch(removetv())
          }

   }, [id])







   return info ? (
    <div  style={
      { background:`linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`, backgroundPosition: 'top 7%', backgroundSize: 'cover', backgroundrepeat: 'no-repeat' }
   } className='relative w-screen h-[141vh]  px-[10%] overflow-hidden'>

          {/* part 1 navigation */}
             <nav className='h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-2xl'>
                      <Link onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></Link>{" "}
                      <a target='_blank' href={info.detail.homepage}><i className="ri-external-link-fill"></i></a>
                      <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
                      <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>imdb</a>

                
             </nav>

      {/* part 2 poster and details */}
      <div className='w-full flex'>
        
        <img  className='rounded-lg shadow-[9px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`} alt="" /> 
         <div className='content ml-[5%] text-white '>
            <h1 className='text-5xl font-black text-white'> {info.detail.original_name|| info.detail.title|| info.detail.name|| info.detail.original_title} <small className='text-3xl font-bold text-zinc-300'>({info.detail.first_air_date.split("-")[0]})</small></h1>
         <div className='mt-5 text-1xl flex text-zinc-100 items-center gap-x-3'>
            <span className='rounded-full  bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center font-bold text-xl'>{(info.detail.vote_average * 10).toFixed()}<sup>%</sup></span>
            <h1 className='font-semibold text-2xl w-[60px] leading-6'>User Score</h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map(g => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
         </div>
         <h1 className='text-xl font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>
         <h1 className='text-2xl mb-3 mt-5'>Overview</h1>
         <p>{info.detail.overview}</p>
         <h1 className='text-2xl mb-3 mt-5'>tv Translated</h1>
         <p className='mb-10'>{info.translations.join(" , ")}</p>
         <Link className='mt-10 p-5 bg-[#6556CD] rounded-lg' to={`${pathname}/trailer`} ><i className="ri-play-large-fill mr-3"></i>Play Trailer</Link>


         
         </div>
      </div>
      {/* part 3 available plateform */}
      <div className='w-[80%] flex flex-col gap-y-5 mt-10 ' >
            {info.watchproviders && info.watchproviders.flatrate && (<div className='flex gap-x-10 items-center text-white '> <h1>Available on Platforms</h1>{info.watchproviders.flatrate.map((w,i)=>(<img key={i} title={w.provider_name} className='w-[5vh] h-[5vh] rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />))}</div>)}
            {info.watchproviders && info.watchproviders.rent && (<div className='flex gap-x-10 items-center text-white '> <h1>Available on Rent</h1>{info.watchproviders.rent.map((w,i)=>(<img key={i} title={w.provider_name} className='w-[5vh] h-[5vh] rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />))}</div>)}
            {info.watchproviders && info.watchproviders.buy && (<div className='flex gap-x-10 items-center text-white '> <h1>Available to buy</h1>{info.watchproviders.buy.map((w,i)=>(<img key={i} title={w.provider_name} className='w-[5vh] h-[5vh] rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />))}</div>)}
      
        </div>
        <hr className='mx-60 mt-5 border-none h-[1px] bg-zinc-200 '/>
       
        {/*part 4 Seasons  */}
            <h1 className='mt-10 mb-10 text-3xl font-bold text-white'>Seasons</h1>
            <div className='w-[100%]  flex overflow-y-hidden overflow-x-auto mb-5 snap-x '>
              {info.detail.seasons.length > 0 ? (info.detail.seasons.map((s,i)=><div className='flex flex-col p-5 snap-center'>
                    <img  className='rounded-lg shadow-[9px_17px_38px_2px_rgba(0,0,0,.5)] h-[30vh] object-cover' src={`https://image.tmdb.org/t/p/original/${s.poster_path}`} alt="" /> <h1 className='text-2xl text-zinc-300 mt-3 font-semibold'> {s.name}</h1>  
              </div>)) :( <h1 className='text-3xl mt-5 text-white font-black text-center'>Nothing to show</h1>)}
            </div>
            
            

          {/*part 5 recommendation and similar stuff */}
             <h1 className='mt-10 mb-5 text-3xl font-bold text-white'>Recommendations & Similar Stuff</h1>
             <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} /><Outlet />       

            
    </div>
  ):<Loading />
}

export default tvdetails