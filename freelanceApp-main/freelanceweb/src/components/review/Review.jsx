import React, { useEffect, useState } from 'react'
import './Review.scss'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
// import newRequest from '../../utils/newRequest';

const Review=({review,handlelike})=>{
    
    // if(review.islike===1){
    //     setmyStyle({
    //         bgcolor:"red"
    //     })
    // }
    const [liking,setLiking]=useState(0);
    const { isLoading, error, data } = useQuery({
        queryKey: [review.userId],
        queryFn: () =>
          newRequest.get(`/users/${review.userId}`).then(res=>{
            return res.data;
          }),
      });

    //newcode
    // const queryClient=useQueryClient()
    // const { isnewLoading, newerror, newdata1 } = useQuery({
    //     queryKey: [`${review._id}`],
    //     queryFn: () =>
    //       newRequest.get(`/reviewlike/${review._id}`).then(res=>{
    //         return res.newdata1;
    //       }),
    //   });
    const getlikes=async()=>{
        const res=await newRequest.get(`/reviewlike/${review._id}`);
        // if(res.data!==undefined){
        // res=res.data;
        // }
        setLiking(res.data.length);
        // setLiking(res.data.length());
    }
    
    useEffect(()=>{
        getlikes()
    },[])
    //newcode
    return(
        <div className='review'>
        {isLoading ? "loading" :error ? "error" : <div className='user'>
            <img className="pp" src={data.img || "/img/noavatar.jpg"} alt=""/>
            <div className='info'>
                <span>{data.username}</span>
                <div className='country'>
                    <span>{data.country}</span>
                </div>
            </div>
        </div>}
        <div className='stars'>
        {Array(review.star).fill().map((item,i)=>{
           return <img src="/img/star.png" key={i} alt="img"/>
        })}
        <span>{review.star}</span>
    </div>
    <p>
    {review.desc}
    </p>
    <div className='helpful'>
        <span>Helpful?</span>
        <img className={`message ${review.islike ? 'liked' : 'not-liked'}`} src="/img/like.png" alt='likeimg' onClick={()=>handlelike(review._id)}/>
        {/* {isnewLoading ? "loading" :newerror ? "error":<span>{newdata1.length()}</span>} */}
        <span>{liking}</span>
        {/* <img src="/img/dislike.png" alt=""/> */}
        <span>Yes</span>
        {/* <span>No</span> */}
    </div>
    </div>
    )
}
export default Review;