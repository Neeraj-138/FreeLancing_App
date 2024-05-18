import React from 'react';
import {Link} from 'react-router-dom';
import './Messages.scss';
import {useQuery} from "@tanstack/react-query"
import newRequest from "../../utils/newRequest.js"
import moment from "moment";
import { useMutation,useQueryClient } from '@tanstack/react-query';

const Messages=()=>{
    const currentUser=JSON.parse(localStorage.getItem("currentUser"))

    const queryClient=useQueryClient()
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['conversations'],
        queryFn: () =>
          newRequest.get(`/conversations`).then(res=>{
            return res.data;
          }),
      });

    
    const mutation=useMutation({
      mutationFn:(id)=>{
        return newRequest.put(`/conversations/${id}`)
      },
      onSuccess:()=>{
        queryClient.invalidateQueries(["conversations"])
      }
    })
  

    //new lines
    console.log(data);
    if(data!==undefined){
    const newusername=data.map((c)=>{return currentUser.isSeller ? c.buyerId :c.sellerId});
    console.log(newusername);
    }
    //new lines
    const handleRead=(id)=>{
        mutation.mutate(id);
    }
    
    return(
    <div className='messages'>
       {isLoading ? "loading" : error ? "error" : <div className='container'>
        <div className='title'>
            <h1>Orders</h1>
        </div>
        <table>
        <tr>
            <th>{currentUser.isSeller?"Buyer":"Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
        </tr>
        {data.map(c=>{
            return (<tr className={
            ((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer )) && "active"} key={c.id}>
        <td>
        {/* {currentUser.isSeller ? c.buyerId :c.sellerId} */}
                {/* new code */}

        {c.username} 
        {/* new code */}
        </td>
        
        <td><Link to={`/message/${c.id}`} className="link" >{c?.lastMessage?.substring(0,100)}...</Link></td>
        <td>{moment(c.updatedAt).fromNow()}</td>
        <td>{
            ((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) && (<button onClick={()=>handleRead(c.id)}>Mark as Read</button>)
        }
            
        </td>
        </tr>)
        })}
        
        
        </table>
       </div>}
    </div>
    );
}
export default Messages;