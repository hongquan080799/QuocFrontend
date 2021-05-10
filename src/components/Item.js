import React,{useState,useEffect} from 'react'
import hoa from '../image/hoa4.jpg'
import './Item.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import axios from 'axios'
export default function Item ({product}){
  let history = useHistory();
  let myStorage = window.localStorage;
  const [user,setUser] = useState({})
  let username = myStorage.getItem('username')

  useEffect(()=>{
    if(username)
    axios.get(process.env.REACT_APP_API +'khachhang/'+username)
    .then(response => setUser(response.data))
  },[])
  const addCart = (masp)=>{
    if(username == null){
      history.push('/login');
    }
    else{
      axios.post(process.env.REACT_APP_API+`giohang/${user.makh}/${masp}?soluong=1`,{})
    .then(Response => alert('Thêm thành công !!!'))
    .catch(error => {alert('Thêm thất bại ' + error);console.log(error)})
    }
  }
    return (
          <div className='myItem' style={{width:'80%'}}>
            <div>
              <div onClick={()=> window.location.href="/product/"+product.masp}>
                <div className="image"><img className="card-img-top" style={{width:'100%',height:'200px'}} src={product.photo} alt="profile"/></div>
                <div className="mt-4">
                  <h5>{product.tensp}</h5>
                  <p>{product.mota_ngan}</p>
                  <p className="text-danger">{product.dongia} $</p>
                  
                </div>
              </div>
              <button className='btn btn-info' onClick={()=>addCart(product.masp)}>THÊM GIỎ HÀNG</button>
            </div>
            
        </div>
    )
}