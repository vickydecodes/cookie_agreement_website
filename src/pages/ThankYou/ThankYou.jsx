import React from "react";
import Lottie  from 'lottie-react';
import './ThankYou.css'
import thank_you from '../../assets/animations/thank_you.json'
// import { Helmet } from "react-helmet-async";

export default function ThankYou() {
  return (
    <div className="notfound_page" >
          <h2>Thank you for signing the agreement. We’re excited to begin working with you. Your agreement has been successfully recorded, and we’re ready to move forward with the next steps in our collaboration.</h2> <br />
          <h3>We'll get back to you soon </h3>
          <Lottie
            animationData={thank_you}
            loop={true}
    className="notfound_animation"
    />
    
    <div className="d-flex">
    <a href='https://cookieatweb.onrender.com' className="btns">Visit Us</a>
    
    </div>
    
        </div>
  )
}
