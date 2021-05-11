import React from 'react'
import quan from '../image/quan.jpg'
import './About.css'
export default function About(){
    return (

        <div className='myAbout'>
            <div class="row text-center contact" id="contact">
            <div class="col-12">
                <h3 class="head-list">
                    Liên hệ
                </h3>
            </div>
            <div class="col-sm-6 col-md-4 contact-icon">
                <i class="fa fa-facebook-square fa-lg" aria-hidden="true"></i>
            </div>
            <div class="col-sm-6 col-md-4 contact-icon">
                <i class="fa fa-google-plus fa-lg" aria-hidden="true"></i>
            </div>
            <div class="col-sm-6 col-md-4 contact-icon">
                <i class="fa fa-twitter fa-lg" aria-hidden="true"></i>
            </div>
            <div className="col-6">
                <img src="https://kfcvietnam.com.vn/uploads/banner/55e251880deec0ecc66ec6ad17e10832.png" />
            </div>
            <div className="col-6">
                <img src="https://kfcvietnam.com.vn/uploads/banner/55e251880deec0ecc66ec6ad17e10832.png" />
            </div>
        </div>
        </div>
    )
}