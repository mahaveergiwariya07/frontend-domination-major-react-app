import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from "./Loading.jsx";
import HorizontalCards from "../components/templates/HorizontalCards.jsx";
import Dropdown from "../components/templates/Dropdown.jsx";

function PersonDetaills() {
  const {pathname} = useLocation()
  const navigate = useNavigate();
  const {id} = useParams();
  const  {info} = useSelector((state)=> state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie")
  
   useEffect(() => {
          dispatch(asyncloadperson(id))

          return () => {
            dispatch(removeperson())
          }

   }, [id])

  return info ? ( 
    <div className='px-[10%] w-screen bg-[#1F1E24] h-[70vw]'>
        {/* part 1 navigation */}
        <nav className='h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-2xl'>
                      <Link onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></Link>{" "}
                     

                
             </nav>

     
        <div className='w-full flex '>
             {/*part 2 left Poster and Details */}
             <div className='w-[30%]'>
                  <img  className='rounded-lg shadow-[9px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`} alt="" />   
                  <hr className='mt-10 mb-5 border-bone h-[2px] bg-zinc-500 w-[15vh] m-16' />
                  {/* social media link */}
                  <div className='text-3xl text-white flex gap-x-12 mx-10'>
                      <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
                      <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}><i className="ri-facebook-circle-fill"></i></a>
                      <a target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`}><i className="ri-instagram-line"></i></a>
                      <a target='_blank' href={`https://x.com/${info.externalid.instagram_id}`}><i className="ri-twitter-x-line"></i></a>
                  </div>
                  {/* Personal Information */}
                  <h1 className='text-2xl text-zinc-400 font-semibold my-5'>Personal Info </h1>
                  <h1 className='text-lg text-zinc-400 font-semibold my-5'>Known for </h1>
                  <h1 className='text-lg text-zinc-400'>{info.detail.known_for_department} </h1>
                  <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Gender </h1>
                  <h1 className='text-lg text-zinc-400'>{info.detail.gender === 2 ? "Male" : "Female"} </h1>
                  <h1 className='text-lg text-zinc-400 font-semibold mt-5'>Birthday </h1>
                  <h1 className='text-lg text-zinc-400'>{info.detail.birthday } </h1>
                  <h1 className='text-lg text-zinc-400 font-semibold mt-5'>Deathday </h1>
                  <h1 className='text-lg text-zinc-400'>{info.detail.deathday ? info.detail.deathday:"Still Alive"} </h1>
                  <h1 className='text-lg text-zinc-400 font-semibold mt-5'>Place of Birth </h1>
                  <h1 className='text-lg text-zinc-400'>{info.detail.place_of_birth} </h1>
                  <h1 className='text-lg text-zinc-400 font-semibold mt-5'>Also Known As </h1>
                  <h1 className='text-lg text-zinc-400'>{info.detail.also_known_as.join(" ,")} </h1>



             </div>

             {/* part 3 right Details and information */}
             <div className='w-[70%]'>
             <h1 className='text-7xl text-zinc-400 font-black my-5'>{info.detail.name} </h1>
                  <h1 className='text-xl text-zinc-400 font-semibold my-5'>Biography </h1>
                  <p className='text-zinc-400'>{info.detail.biography}</p>
                  <h1 className='text-xl text-zinc-400 font-semibold mt-5'>Known for</h1>
                  <HorizontalCards data={info.combinedCredits.cast} />
              <div className='w-full flex justify-between'>
                    <h1 className='text-xl text-zinc-400 font-semibold mt-5'>Acting</h1>
                    <Dropdown title="Catgory" options={["tv", "movie"]} func={(e)=>setcategory(e.target.value)}  />   

              </div> 
              <div className='list-disc text-zinc-400  w-full h-[33vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.2)] mt-5 border-2 border-zinc-700 p-5'>
                  {info[category + "Credits"].cast.map((c,i)=> (<li className='hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer'>
                    <Link key={i} to={`/${category}/details/${c.id}`} className=''>
                    <span>{c.original_name|| c.title|| c.name|| c.original_title} </span>
                    <span className='block ml-5 mt-3'>{c.character &&`character name: ${c.character}`}</span>
                    </Link>
                    
                  </li>) )}
                  
              </div>
            </div>

        </div>

    </div>
  ): <Loading />
}

export default PersonDetaills 