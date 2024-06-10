import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
        <div className="footer-content-left">
         <img src={assets.logo} alt="" />
         <p>"Join our community for the latest updates and exclusive offers! Follow us on social media and never miss out on a delicious deal."</p>
         <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
         </div>   
        </div>
        <div className="footer-content-center">
<h2>COMPANY</h2>
<ul>
    <li>Home</li>
    <li>About Us</li>
    <li>Delivery</li>
    <li>Privacy Policy</li>
</ul>
        </div>
        <div className="footer-content-right
        ">
             <h2>Get in Touch</h2>
             <ul>
                <li>+91 639-364-6220</li>
                <li>Contact@Biteblitz.com</li>
             </ul>
        </div>

       </div>
       <hr />
       <p className='footer-copyright'>
        Copyright 2024 &copy; BiteBlitz.com - All Right Reserved
       </p>
    </div>
  )
}

export default Footer