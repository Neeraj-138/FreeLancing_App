import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Message.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';


const Message=()=>{

    const {id}=useParams()

    const currentUser=JSON.parse(localStorage.getItem("currentUser"));

    const queryClient=useQueryClient()
    const { isLoading, error, data } = useQuery({
        queryKey: ['messages'],
        queryFn: () =>
          newRequest.get(`/messages/${id}`).then(res=>{
            return res.data;
          }),
      });

    
      const mutation=useMutation({
        mutationFn:(message)=>{
          return newRequest.post(`/messages`,message)
        },
        onSuccess:()=>{
          queryClient.invalidateQueries(["messages"])
        }
      })
    
      const handleSubmit=(e)=>{
        e.preventDefault()
        mutation.mutate({
            conversationId:id,
            desc:e.target[0].value,
        });
        e.target[0].value="";
      }
    

    return(
    <div className='message'>
        <div className='container'>
            <span className='breadcrumbs'>
                <Link to="/messages">MESSAGES</Link> JOHN DOE &gt;
            </span>
            {isLoading ? "loading" :error ?"error":<div className='messages'>
                {data.map((m)=>{return(<div className={m.userId===currentUser._id ? "owner item" : "item"} key={m._id}>
                    <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/168679800/original/51e1dc11dcae4c2c8b3f6c42e0fbf1d355558625/design-a-stunning-ui-and-build-a-fullstack-flutter-app.jpg"/>
                <p>
                    {m.desc}
                </p>
                </div>)})}
                </div>
                }
            <hr/>
            <form className='write' onSubmit={handleSubmit}>
                <textarea name="" placeholder='Write A Message' id="" cols="30" rows="10"></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
    );
}
export default Message;