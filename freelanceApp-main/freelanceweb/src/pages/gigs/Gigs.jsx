import React, { useEffect, useRef, useState } from 'react';
import './Gigs.scss';
import GigCard from '../../components/gigCard/GigCard';
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
const Gigs=()=>{
    const [sort,setSort]=useState('sales');
    const [open,setOpen]= useState(false);
    const minRef=useRef(null);
    const maxRef=useRef(null);

    const {search}=useLocation()

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['gigs'],
        queryFn: () =>
          newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then(res=>{
            return res.data;
          }),
      });

    console.log(data)
    
    const reSort=(type)=>{
        setSort(type);
        setOpen(false)
    }

    useEffect(()=>{refetch()}
        ,[sort]
    )

    const apply=(event)=>{
        // event.preventDefault();
        // console.log(maxRef.current.value)
        refetch();
    }
    return(
    <div className='gigs'>
        <div className='container'>
           <span className='breadcrumbs'> FREELANCEAPP&gt; GRAPHICS & DESIGN&gt; </span>
           <h1>AI Artists</h1>
           <p>
            Explore the boundaries of art and technology with FreelanceApp AI artists
           </p> 
           <div className='menu'>
            <div className='left'>
                <span>Budged</span>
                <input type='number' ref={minRef} placeholder='min'/>
                <input type="number" ref={maxRef} placeholder='max'/>
                <button onClick={apply}>Apply</button>
            </div>
            <div className='right'>
                <span className='sortBy'>SortBy</span>
                <span className='sortType'>{sort==="sales"?"Best Selling":"Newest"}</span>
                <img src="./img/down.png" alt="" onClick={()=>setOpen(!open)}/>
                {open &&(<div className='rightMenu'>
                    {sort==="sales"?<span onClick={()=>reSort("createdAt")}>Newest</span>
                    :<span onClick={()=>reSort("sales")}>Best Selling</span>}
                </div>)}
            </div>
           </div>
           <div className='cards'>
            {isLoading ? "loading" : error ?"Something went wrong" : data.map((val)=>{
               return <GigCard _id={val._id} userId={val.userId} img={val.img} username={val.username} key={val._id} cover={val.cover} pp={val.pp} desc={val.desc} price={val.price} totalStars={val.totalStars} starNumber={val.starNumber}/>
            })}
           </div>
        </div>
    </div>
    );
}
export default Gigs;

