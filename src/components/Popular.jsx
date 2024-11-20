import axios from '../utils/axios.jsx';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from './templates/Dropdown.jsx';
import Topnav from './templates/Topnav.jsx';
import Cards from './templates/Cards.jsx';

function Popular() {
         document.title = "SCSDB | Popular";
        const navigate = useNavigate();
        const [category, setcategory] = useState("movie")
        const [popular, setpopular] = useState([])
        const [page, setpage] = useState(1)
        const [hasMore, sethasMore] = useState(true)

        const GetPopular = async ()=> { 
            try{
              const {data} = await axios.get(`${category}/popular?page=${page}`)
              if(data.results.length > 0){
                setpopular((prevState)=>[...prevState, ...data.results])
                setpage(page + 1)
              } else{
                      sethasMore(false)
              }
            
            }catch (error) {
              console.log("Error:", error);
            }
          };
        
        const refershHandler = () =>{
            if(popular.length === 0){
              GetPopular()
            } else{
                setpage(1)
                setpopular([])
              GetPopular()
            }
        }
        useEffect(() => {
          refershHandler()
        },[category])
  return popular.length > 0 ? (
    <div className='w-screen h-screen' >       
        <div className='px-[5%] w-full  flex items-center'>
            <h1 className='w-[20%] text-2xl  font-semibold text-zinc-400'><i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "} Popular</h1>
           <div className='w-[100%]'> <Topnav  /></div>
                       <Dropdown title= "Category" options={["movie", "tv", "all"]} func={(e)=> setcategory(e.target.value)}/>
        </div>
                 
        <InfiniteScroll dataLength={popular.length} next={GetPopular()} hasMore={hasMore} loader={<h1 className='bg-gray'>loading....</h1>}>
                <Cards data={popular} title={category} />
        </InfiniteScroll>
       

    </div>
  ): (<Loading />);
} 

export default Popular