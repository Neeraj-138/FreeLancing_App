import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import img1 from './da0373y-5e90f4d3-e020-4e2c-ad35-7bead062a572.jpg'
import img1 from "./Picsart_23-05-26_12-45-38-639.png"
import newRequest from '../../utils/newRequest';
const Navbar=()=>{
    const [active,setactive]=useState(false);
    const [open,setOpen]=useState(false);
    const {pathname}=useLocation();


    const isActive=()=>{
        window.scrollY>0? setactive(true):setactive(false)
    }
    useEffect(()=>{
        window.addEventListener('scroll',isActive);
        return()=>{
            window.removeEventListener('scroll',isActive);
        }
    },[])

    const currentUser=JSON.parse(localStorage.getItem("currentUser"));

    const navigate=useNavigate();

    const handleLogout=async ()=>{
        try{
            await newRequest.post("/auth/logout")
            localStorage.setItem("currentUser",null);
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className={active || pathname!=="/" ?'navbar active':'navbar'}>
            <div className='container'>
                <div className='logo'>
                <Link to='/' className='link'>
                <span className='text'>freelanceApp</span>
                </Link>
                    <span className='dot'>.</span>
                </div>
                <div className='links'>
                    <span>Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    
                    {!currentUser?.isSeller &&<span>Become s Seller</span>}                    
                    {currentUser ? (
                        <div className='user' onClick={()=>setOpen(!open)}>
                        <img src={currentUser.img || "/img/noavatar.jpg"} alt="img"/>
                        <span>{currentUser?.username}</span>
                        {open &&<div className='options'>
                        {currentUser?.isSeller &&(
                            <>
                                <Link className='link' to='/mygigs'>Gigs</Link >
                                <Link className='link' to='/add'>Add New Gig</Link >
                             </>  
                            )
                        }
                        <Link className='link' to='/orders'>Orders</Link >
                        <Link className='link' to='/messages'>messages</Link >
                        <Link className='link' onClick={handleLogout}>Logout</Link >
                        </div>
                        }
                        </div>
                    ):(
                        <>
                        <Link to="/login" className='link'>Sign in</Link>
                        <Link className="link" to="/register">
                        <button>Join</button>
                        </Link>
                        </>
                    )}
                </div>

            </div>
            {(active ||pathname!=="/") && (
                <>
                <hr/>
                <div className='menu'>
                    <Link className='link' to='/'>Graphics & Design</Link>
                    <Link className='link' to='/'>Video & Animation</Link>
                    <Link className='link' to='/'>Writing & Transformation</Link>
                    <Link className='link' to='/'>AI Services</Link>
                    <Link className='link'>Digital Marketing</Link>
                    <Link className='link'>Music & Audio</Link>
                    <Link className='link'>Programming & Tech</Link>
                    <Link className='link'>Business</Link>
                    <Link className='link'>Lifestyle</Link>
                </div>
                <hr/>
                </>
            )
            }

        </div>
    );
}
export default Navbar;