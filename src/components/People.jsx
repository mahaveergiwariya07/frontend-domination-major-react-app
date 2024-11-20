import axios from '../utils/axios.jsx';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from './templates/Dropdown.jsx';
import Topnav from './templates/Topnav.jsx';
import Cards from './templates/Cards.jsx';

function People() {
    document.title = "SCSDB | person Shows";
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular") 
    const [person, setperson] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    const GetPerson = async ()=> { 
        try{
          const {data} = await axios.get(`person/${category}?page=${page}`)
          if(data.results.length > 0){
            setperson((prevState)=>[...prevState, ...data.results])
            setpage(page + 1)
          } else{
                  sethasMore(false)
          }
        
        }catch (error) {
          console.log("Error:", error);
        }
      };
    
    const refershHandler = () =>{
        if(person.length === 0){
          GetPerson()
        } else{
            setpage(1)
            setperson([])
          GetPerson()
        }
    }
    useEffect(() => {
      refershHandler()
    },[category])
  return person.length > 0 ? (
    <div className='w-screen h-screen' >                       
        <div className='px-[5%] w-full  flex items-center'>
            <h1 className='w-[20%] text-2xl  font-semibold text-zinc-400'><i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "} People</h1>
           <div className='w-[100%]'> <Topnav  /></div>
                      
        </div>
                 
        <InfiniteScroll dataLength={person.length} next={GetPerson()} hasMore={hasMore} loader={<h1 className='bg-gray'>loading....</h1>}>
                <Cards data={person} title="person" />
        </InfiniteScroll>
       

    </div>
  ): (<Loading />);
}

export default People