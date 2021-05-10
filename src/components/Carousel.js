import Slider from 'react-material-ui-carousel'
import React from 'react'
import hoa1 from '../image/hoa1.jpg'
import hoa2 from '../image/hoa2.jpg'
import hoa3 from '../image/hoa3.jpg'
import './Carousel.css'
function Carousel(){
    return (
        <div className='container-fluid mt-4 my-carousel'>
            <Slider>
                <div className='slide-item'>
                    <img src="https://kfcvietnam.com.vn/uploads/banner/9c40abcee6dfa8c67062fce43fb9b948.png" style={{width:'100%'}}/>
                </div>
                <div  className='slide-item' >
                    <img src="https://kfcvietnam.com.vn/uploads/banner/d0d69f34e549f5754b49ce15536d1c25.png" style={{width:'100%'}} />
                </div>
                <div  className='slide-item'>
                    <img src="https://kfcvietnam.com.vn/uploads/banner/2ec32651d4cffd624c986cd801691dd4.png" style={{width:'100%'}}/>
                </div>
            </Slider>
        </div>
    )
}
export default Carousel