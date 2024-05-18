import React from 'react';
import {Link} from 'react-router-dom';
import './MyGigs.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const MyGigs=()=>{
    const currentUser=JSON.parse(localStorage.getItem("currentUser"));

    const queryClient=useQueryClient()
    const { isLoading, error, data } = useQuery({
        queryKey: ['myGigs'],
        queryFn: () =>
          newRequest.get(`/gigs?userId=${currentUser._id}`).then(res=>{
            // console.log(currentUser.Id)
            return res.data;
          }),
      });


    const mutation=useMutation({
      mutationFn:(id)=>{
        return newRequest.delete(`/gigs/${id}`)
      },
      onSuccess:()=>{
        queryClient.invalidateQueries(["myGigs"])
      }
    })

    const handleDelete=(id)=>{
        mutation.mutate(id);
    }

    return(
    <div className='myGigs'>
       {isLoading ? "loading" :error ?"error":<div className='container'>
        <div className='title'>
            <h1>Gigs</h1>
            <Link to='/add'>
                <button>Add New Gig</button>
            </Link>
        </div>
        <table>
        <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
        </tr>
        {data.map((gig)=>{
            return(
                <tr key={gig._id}>
                 <td>
                   <img className='img' src={gig.cover}/>
                 </td>
                 <td>{gig.title}</td>
                 <td>{gig.price}</td>
                 <td>{gig.sales}</td>
                 <td>
                  <img className='delete' src="/img/delete.png" alt="" onClick={()=>handleDelete(gig._id)}/>
                 </td>
                </tr>
            )
        })}
        
        </table>
       </div>}
    </div>
    );
}
export default MyGigs;