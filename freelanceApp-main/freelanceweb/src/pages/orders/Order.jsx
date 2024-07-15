import React from 'react';
// import {Link} from 'react-router-dom';
import './Order.scss';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const Order=()=>{
    const currentUser=JSON.parse(localStorage.getItem("currentUser"))

    const navigate=useNavigate()
    const { isLoading, error, data } = useQuery({
        queryKey: ['orders'],
        queryFn: () =>
          newRequest.get(`/orders`).then(res=>{
            return res.data;
          }),
      });
      console.log("Orders from server",data)

    const handleContact=async(order)=>{
        const sellerId=order.sellerId;
        const buyerId=order.buyerId;
        const id=sellerId+buyerId;
        try{
            const res=await newRequest.get(`/conversations/single/${id}`);
            navigate(`/message/${res.data.id}`)
        }catch(err){
            if(err.response.status===404){
                const res=await newRequest.post(`/conversations/`,{to:currentUser.seller ? buyerId : sellerId});
                navigate(`/message/${res.data.id}`)
            }
        }
    }
    
    return(
    <div className='orders'>
       {isLoading ? "loading" :error ?"error" :<div className='container'>
        <div className='title'>
            <h1>Orders</h1>
        </div>
        <table>
        <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
            <th>Contact</th>   
        </tr>
        {
            data.map(order=>{
        return (<tr key={order._id}>
        <td>
            <img className='img' src={order.img}/>
        </td>
        <td>{order.title}</td>
        <td>
        {order.price}
        </td>
        <td>
        {(order.isCompleted==true)? "Completed":"Pending"}
        </td>
        
        <td>
            <img className='delete' src="/img/message.png" alt="" onClick={()=>handleContact(order)}/>
        </td>
        </tr>)
            })
        }
        
        </table>
       </div>}
    </div>
    );
}
export default Order;