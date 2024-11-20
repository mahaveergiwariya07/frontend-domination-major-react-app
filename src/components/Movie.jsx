import axios from '../utils/axios.jsx';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from './templates/Dropdown.jsx';
import Topnav from './templates/Topnav.jsx';
import Cards from './templates/Cards.jsx';

function Movie() {

    document.title = "SCSDB | Movies";
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing")
    const [movie, setmovie] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    const GetMovie = async ()=> { 
        try{
          const {data} = await axios.get(`movie/${category}?page=${page}`)
          if(data.results.length > 0){
            setmovie((prevState)=>[...prevState, ...data.results])
            setpage(page + 1)
          } else{
                  sethasMore(false)
          }
        
        }catch (error) {
          console.log("Error:", error);
        }
      };
    
    const refershHandler = () =>{
        if(movie.length === 0){
          GetMovie()
        } else{
            setpage(1)
            setmovie([])
          GetMovie()
        }
    }
    useEffect(() => {
      refershHandler()
    },[category])


  return movie.length > 0 ? (
    <div className='w-screen h-screen' >                       
        <div className='px-[5%] w-full  flex items-center'>
            <h1 className='w-[20%] text-2xl  font-semibold text-zinc-400'><i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "} Movie <small className='text-zinc-600 text-lg'>({category})</small></h1>
           <div className='w-[100%]'> <Topnav  /></div>
                       <Dropdown title= "Category" options={["popular", "top_rated", "upcoming", "now_playing"]} func={(e)=> setcategory(e.target.value)}/>
        </div>
                 
        <InfiniteScroll dataLength={movie.length} next={GetMovie()} hasMore={hasMore} loader={<h1 className='bg-gray'>loading....</h1>}>
                <Cards data={movie} title="movie" />
        </InfiniteScroll>
       

    </div>
  ): (<Loading />);
}

export default Movie