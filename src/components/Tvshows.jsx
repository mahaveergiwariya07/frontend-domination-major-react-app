import axios from '../utils/axios.jsx';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from './templates/Dropdown.jsx';
import Topnav from './templates/Topnav.jsx';
import Cards from './templates/Cards.jsx';

function Tvshows() {
    document.title = "SCSDB | Tv Shows";
    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today")
    const [tv, settv] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    const GetTv = async ()=> { 
        try{
          const {data} = await axios.get(`tv/${category}?page=${page}`)
          if(data.results.length > 0){
            settv((prevState)=>[...prevState, ...data.results])
            setpage(page + 1)
          } else{
                  sethasMore(false)
          }
        
        }catch (error) {
          console.log("Error:", error);
        }
      };
    
    const refershHandler = () =>{
        if(tv.length === 0){
          GetTv()
        } else{
            setpage(1)
            settv([])
          GetTv()
        }
    }
    useEffect(() => {
      refershHandler()
    },[category])

  return tv.length > 0 ? (
    <div className='w-screen h-screen' >                       
        <div className='px-[5%] w-full  flex items-center'>
            <h1 className='w-[20%] text-2xl  font-semibold text-zinc-400'><i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "} Tv Shows (<small className='text-zinc-600 text-lg'>{category}</small>)</h1>
           <div className='w-[100%]'> <Topnav  /></div>
                       <Dropdown title= "Category" options={["on_the_air", "popular", "top_rated", "airing_today"]} func={(e)=> setcategory(e.target.value)}/>
        </div>
                 
        <InfiniteScroll dataLength={tv.length} next={GetTv()} hasMore={hasMore} loader={<h1 className='bg-gray'>loading....</h1>}>
                <Cards data={tv} title="tv" />
        </InfiniteScroll>
       

    </div>
  ): (<Loading />);
}

export default Tvshows