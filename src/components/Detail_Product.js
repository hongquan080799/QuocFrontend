
import hoa from '../image/hoa4.jpg'
import quan from '../image/quan.jpg'
import './Detail_Product.css'
import ReactStars from "react-rating-stars-component";
import RateChart from './RateChart'
import React,{useState,useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
  } from "react-router-dom";
import axios from 'axios'
function Detail_Product(){
    let history = useHistory();
    let {masp} = useParams();
    const [danhgia,setDanhgia] = useState(false)
    const [rate,setRate] = useState()
    const [dgUser,setDgUser] = useState(0);
    const [sl,setSl] = useState(1);
    const [sanpham,setSanpham] =useState();
    const [user,setUser] = useState({})
    const [cart,setCart] = useState([])
    const username = window.localStorage.getItem('username')
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'sanpham/'+masp)
        .then(response => setSanpham(response.data) )
        .catch(erro => console.log(erro))

        if(username!=null){
            axios.get(process.env.REACT_APP_API +'khachhang/'+username)
            .then(response => {
                setUser(response.data )
                axios.get(process.env.REACT_APP_API+`giohang/${response.data.makh}`)
                .then(res => setCart(res.data))
                .catch(er=> console.log(er))

                axios.get(process.env.REACT_APP_API +'ctdh/'+response.data.makh+'/'+masp)
                .then(res => setDanhgia(res.data))
                .catch(err => console.log(err))

                

                axios.get(process.env.REACT_APP_API +'danhgia/'+ response.data.makh +'/'+masp)
                .then(res => setDgUser(res.data))
                .catch(err => console.log(err))
            })
            .catch(error => console.log(error))
        }
        axios.get(process.env.REACT_APP_API +'danhgia/'+masp)
                .then(res => setRate(res.data))
                .catch(err => console.log(err))

    },[])
    const getMaxSL = (masp)=>{
        let sl = 0;
        cart.forEach(c=>{
            if(c.sanpham?.masp === masp){
                sl = c.soluong;
            }
        })
        return sl;
    }
    const ratingChanged = (newRating) => {
        const data ={
            id:{
                masp:masp,
                makh:user?.makh
            },
            khachhang:{
                makh:user?.makh
            },
            sanpham:{
                masp:masp
            },
            danhgia:newRating
        }
        axios.post(process.env.REACT_APP_API+`danhgia/`,data)
        .then(res => {
            axios.get(process.env.REACT_APP_API +'danhgia/'+masp)
            .then(res => setRate(res.data))
            .catch(err => console.log(err))
        })
        .catch(err =>console.log(err))

  };
    let myStorage = window.localStorage;
    const addCart = (masp)=>{
        console.log(masp + sl)
        if(username == null){
        history.push('/login');
        }
        else{
        axios.post(process.env.REACT_APP_API+`giohang/${user.makh}/${masp}?soluong=${sl}`,{})
        .then(Response => alert('Thêm thành công !!!'))
        .catch(error => {alert('Thêm thất bại ' + error);console.log(error)})
        }
    }
    return (
        
        <div className="row detail_product">
            <div className="col-7">
                <img src={sanpham?.photo} alt="hoa picture" style={{width:"90%"}}/>
                {danhgia?
                    <div style={{marginTop:'40px'}}>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={20}
                            value={dgUser}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                        
                    </div>    :''
                  }
            </div>
            <div className="col-5">
                <h3>{sanpham?.tensp}</h3>
                <h4 className="text-danger">{sanpham?.dongia} đ</h4>
                
                <div className="row">
                    <div className="col-6">
                        <p>Mô tả ngắn</p>
                    </div>
                    <div className="col-6 text-right">
                        <p>{sanpham?.mota_ngan}</p>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <p>Hàng trong kho</p>
                    </div>
                    <div className="col-6 text-right">
                        <p>Còn : {sanpham?.soluong}</p>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <p>Mô chi tiết</p>
                    </div>
                    <div className="col-12 text-left">
                        <p>{sanpham?.mota_chitiet}</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-7">
                        <input type="number" className="form-control" min="0" defaultValue="1" max={sanpham?.soluong - getMaxSL(sanpham?.masp)} disabled={sanpham?.soluong == 0 || (sanpham?.soluong - getMaxSL(sanpham?.masp))<=0} />
                    </div>
                    <div className="col-5   ">
                        <button className="btn btn-warning" onClick={()=>addCart(sanpham.masp)}><i className="fa fa-shopping-cart" aria-hidden="true"></i> Add to card</button>
                    </div>
                </div>
                
            </div>
            <div className='col-12'>
                    <RateChart 
                            key={masp}
                            five = {rate?.five}
                            one = {rate?.one}
                            two = {rate?.two}
                            three = {rate?.three}
                            four = {rate?.four}
                            
                            soluong = {rate?.soluong}
                        />
            </div>
            <div className="row">
            <div className="col-12 mb-4 mt-4">
                <h5>   Bình luận khách hàng</h5>
                <div class="fb-comments" data-href={"https://localhost:8080/"+masp} data-width="" data-numposts="5"></div>
            </div>
            {/* <div className="col-2 mt-4">
                <img src={quan} alt="picture" style={{width:"90%"}} className="rounded-circle"/>
            </div>
            <div className="col-10 mt-4">
                <textarea className="form-control" rows="4" placeholder="Để lại bình luận của bạn !!!"></textarea>
            </div> */}
        </div>
         </div>
    )
}

export default Detail_Product;