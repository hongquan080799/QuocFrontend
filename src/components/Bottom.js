import React from 'react'
import './Bottom.css'
import hoa from '../image/hoa4.jpg'
export default function Bottom(){
    return (
        <div className='bottom'>
            <div className='container '>
                <div className='row text-center '>
                    <div className='col-sm-12 col-md-6 col-lg-3 text-left'>
                        <h4>LIÊN HỆ</h4>
                        <p className="contact-1"><i className="fa fa-envelope mr-2" aria-hidden="true"></i> quocdong086373@gmail.com</p>
                        <p className="contact-1"><i className="fa fa-phone-square mr-2" aria-hidden="true"></i>03367834341</p>
                        <p className="contact-1"><i className="fa fa-map-marker mr-2" aria-hidden="true"></i>97 Man Thiện Q.9 TPHCM</p>

                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3 text-left'>
                        <h4>TRỢ GIÚP NHANH</h4>
                        <p className='section'>Hướng dẫn thanh toán</p>
                        <p className='section'>Liên hệ</p>
                        <div className='contact'>
                            <i className="fa fa-facebook-square" aria-hidden="true"></i>
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                            <i className="fa fa-address-book" aria-hidden="true"></i>
                        </div>
                        
                    </div> 
                    <div className='col-sm-12 col-md-6 col-lg-3 text-left'>
                        <h4>CHÍNH SÁCH BÁN HÀNG</h4>
                        <p className='section'>Chính sách và quy định chung</p>
                        <p className='section'>Chính sách trả hàng</p>
                        <p className='section'>Chính sách bảo mật thông tin</p>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <img src="https://kfcvietnam.com.vn/uploads/combo/7d36d8d380315c169ba830b0b5b4c26d.jpg" alt='pictur' className="rounded" style={{width:'100%'}}></img>
                    </div>
                </div>
            </div>
            <footer className='text-center mt-4'>
                <span className="copyright"> &copy; lêu lêu</span>
                <div>CÔNG TY TNHH THỰC PHẨM 
                </div>
            </footer>
        </div>
    )
}