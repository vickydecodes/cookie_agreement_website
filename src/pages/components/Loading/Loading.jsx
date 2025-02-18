import React from 'react';
import cookie_loader from '../../../assets/animations/cookie_loader.json'
import './Loading.css';
import Lottie  from 'lottie-react';

export default function Loading() {
  return (
    <div className='loading-container'>
       <div className="loading-component">
       <Lottie
        animationData={cookie_loader}
        loop={true}
        style={{width: 500, height: 500}}
        />
       </div>
    </div>
  )
}
