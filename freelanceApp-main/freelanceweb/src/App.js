import React from 'react';
// import Navbar from './components/navbar/Navbar';
import { createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Gigs from './pages/gigs/Gigs.jsx';
import Gig from './pages/gig/Gig.jsx';
import MyGigs from './pages/myGigs/MyGigs.jsx';
import Add from './pages/add/Add.jsx';
import Message from './pages/message/Message.jsx';
import Messages from "./pages/messages'/Messages.jsx";
import Order from './pages/orders/Order.jsx'
import './App.scss';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Pay from './pages/pay/Pay.jsx';
import Success from './pages/success/Success.jsx';

function App() {

  const queryClient = new QueryClient()

  const Layout=()=>{
    return(<div className='app'>
    <QueryClientProvider client={queryClient}>
      <Navbar/>
      <Outlet/>
      <Footer/>
      </QueryClientProvider>
      </div>
    );
  }
  const router=createBrowserRouter([{
    path:'/',
    element:<Layout/>,
    children:[{
      path:'/',
      element:<Home/>
    },
    {
      path:'/gigs',
      element:<Gigs/>
    },
    {
      path:'/gig/:id',
      element:<Gig/>
    },
    {
      path:'/orders',
      element:<Order/>
    },
    {
      path:'/mygigs',
      element:<MyGigs/>
    },
    {
      path:'/add',
      element:<Add/>
    },
    {
      path:'/messages',
      element:<Messages/>
    },
    {
      path:'/message/:id',
      element:<Message/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/pay/:id',
      element:<Pay/>
    },
    {
      path:'/success',
      element:<Success/>
    }
  ]
  }]);
  return (
   <div>
    <RouterProvider router={router}/>
   </div>
  );
}

export default App;
