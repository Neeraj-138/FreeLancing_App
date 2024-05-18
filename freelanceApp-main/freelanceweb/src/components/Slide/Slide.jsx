import React from 'react';
import Slider from 'infinite-react-carousel';
import './Slide.scss';
// import CatCard from '../catCard/CatCard';
// import { cards } from '../../data';
const Slide=({children,slidesToShow,arrowsScroll})=>{
   
    return(
        <div className='slide'>
            <div className='container'>
            <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
                 {children}
                 </Slider>
            </div>
        </div>
        
    );
}
export default Slide;