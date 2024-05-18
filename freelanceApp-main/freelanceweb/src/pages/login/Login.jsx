import React, { useState } from 'react';
import './Login.scss';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
const Login=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(null);

    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        const res = await newRequest.post("/auth/login",{username,password});
        localStorage.setItem("currentUser",JSON.stringify(res.data));
        navigate("/")
    }catch(err){
        setError(err.response.data);
        console.log(err)
    }
    }

    return(
    <div className='login'>
        <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <br/>
            <label htmlFor=''>Username</label>
            <br/>
            <input type="text" name="name" placeholder='johndoe' onChange={e=>setUsername(e.target.value)}/>
            <br/>
            <label htmlFor=''>Password</label>
            <br/>
            <input type="password" name="password" 
                onChange={e=>setPassword(e.target.value)}
            />
            <br/>
            <button type='submit'>Login</button>
            {error && error}
        </form>
    </div>
    );
}
export default Login;