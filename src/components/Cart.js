import React,{useState,useEffect} from 'react'
import Detail_Portfolio from './Detail_Portfolio'
import hoa from '../image/hoa4.jpg'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import './Cart.css'
import emailjs from 'emailjs-com';
export default function Cart(){
    let myStorage = window.localStorage;
    const [user,setUser] = useState({});
    const [total,setTotal] =useState(0)
    const history = useHistory();
      const [cart,setCart] = useState([])
      const [sanpham,setSanpham] = useState([])
      let username = myStorage.getItem('username')
      useEffect(()=>{
          if(username == null)
            history.push('/login')
        
          else {
            axios.get(process.env.REACT_APP_API +'khachhang/'+username)
            .then(response => {
                setUser(response.data)
                axios.get(process.env.REACT_APP_API+`giohang/${response.data.makh}`)
                .then(response => setCart(response.data))
                .catch(erro =>console.log(erro))
                
            })
            .catch(error => console.log(error))


            
            
          }

        
      },[])
      const deleteCart= (masp)=>{
        
        setSanpham(sanpham.filter(sp =>{
            if(sp.masp !== masp)
                return sp
        }))

        axios.delete(process.env.REACT_APP_API+`giohang/${user.makh}/${masp}`)
        .then(response => 
            axios.get(process.env.REACT_APP_API+`giohang/${user.makh}`)
            .then(response => setCart(response.data))
            .catch(erro =>console.log(erro))    
        )
        .catch(erro =>console.log(erro))
      }
      const changeNum =(e,sp)=>{
        let masp = sp.masp
        let num = e.target.value;

        const newSP = sanpham.map(s =>{
            if(s.masp === masp){
                return {
                    ...s,
                    soluong:num
                }
            }
            else 
                return s
        })
        setSanpham(newSP)

        axios.get(process.env.REACT_APP_API+`giohang/${user.makh}/${masp}?soluong=${num}`)
        .then(res =>{
            axios.get(process.env.REACT_APP_API+`giohang/${user.makh}`)
                .then(response => setCart(response.data))
                .catch(erro =>console.log(erro))
        })
        .catch(err => console.log(err))

      }
      const checkSP = (e,sp,soluong)=>{
        sp.soluong = soluong
          if(e.target.checked){
                setSanpham([...sanpham,sp])
          }
          else{
                setSanpham(sanpham.filter(s => s.masp !== sp.masp))
          }
          //console.log(sanpham)
      }
      useEffect(()=>{
          console.log(sanpham)
          let tam =0;
        sanpham.forEach(sp => {
            tam += Number(sp?.dongia) * Number(sp?.soluong)
            
        })
        setTotal(tam);
      },[sanpham])

      const tongsp = ()=>{
          let tong = 0;
         sanpham.forEach(sp=>{
             tong += Number(sp?.soluong);
         })
         return tong
      }
     const sendEmail = (myMessage)=>{
            var templateParams = {
                to_name:user.ho + ' '  + user.ten,
                from_name: 'Công ty FastFOOD',
                message:'Bạn đã đặt đơn thành công',
                notes: 'Check this out!',
                email: user.email
            };
             
            emailjs.send('service_c4h4x3s', 'template_au2r4sv', templateParams,'user_eXT3mcACRHWvnrHkCZPaZ')
                .then(function(response) {
                   console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                   console.log('FAILED...', error);
                });
        }
      const order = ()=>{
        if(window.confirm('Bạn có muốn đặt hàng không ?')){
            axios.post(process.env.REACT_APP_API+`donhang/${user.makh}`,sanpham)
        .then(res => {
            alert('Đặt hàng thành công'); 
            const myMessage = myEmail
            sendEmail(myMessage);
            setSanpham([]);
            axios.get(process.env.REACT_APP_API+`giohang/${user.makh}`)
            .then(response => setCart(response.data))
            .catch(erro =>console.log(erro))    })
        .catch(err => alert('Đặt hàng thất bại'))
        }
      }
      const isInList= (masp)=>{
            return sanpham.some(sp => sp.masp === masp)
      }
      const myEmail = 
      `<div>
                  <h4 className="text-secondary">Thông tin khách hàng</h4>
                    <hr/>
                        <table className="table table-borderless table-cart">
                            <tr>
                                <td>HỌ TÊN</td>
                                <td>${user.ho + ' ' + user.ten}</td>
                            </tr>
                            <tr>
                                <td>SỐ ĐIỆN THOẠI</td>
                                <td>${user.sdt}</td>
                            </tr>
                            <tr>
                                <td>EMAIL</td>
                                <td>${user.email}</td>
                            </tr>
                            <tr>
                                <td>ĐỊA CHỈ</td>
                                <td>${user.diachi}</td>
                            </tr>
                        </table>
                    <hr/>
                  <h4>Danh sách đơn hàng đang chờ xác nhận</h4>
                  <table>
                  ${cart.map(c=>{
                        if(isInList(c.sanpham.masp))
                        return`
                            <tr key={c.sanpham.masp}>
                                <td><img src=${c.sanpham.photo} alt="picture" style="width:100px;padding:5px 30px" /></td>
                                <td style="padding:5px 30px">${c.sanpham.tensp}</td>
                                <td style="padding:5px 30px">Số lượng : ${c.sanpham.soluong}</td>
                                <td style="padding:5px 30px">${c.sanpham.dongia * c.soluong} đ</td>
                            </tr>`
                        }
                    )}
                  </table>
                  <hr/>
              </div>`
    return (
        <div>
            <div className='banner'>
                <h3>GIỎ HÀNG</h3>
            </div>
            <div className='container'>
                <div className='row' style={{marginBottom:100,backgroundColor:'#c1bd78',marginTop:30,borderRadius:10,height:'70vh',overflow:'scroll'}}>
                    
                    <div className='col-7'>  
                        <h4 className="cart-header">DANH SÁCH GIỎ HÀNG</h4>            
                        <table className="table table-border table-cart">
                            {cart.map(c=>(
                                <tr key={c.sanpham.masp}>
                                    <td onClick={()=> deleteCart(c.sanpham.masp)} className="deleteCart">&#10005;</td>
                                    <td><img src={c.sanpham.photo} alt="picture" style={{width:"70px",marginRight:"30px"}} /> {c.sanpham.tensp}</td>
                                    <td style={{width:"15%"}}><input type="number" className="form-control" min="1" max={c.sanpham?.soluong} defaultValue={c.soluong} onClick={(e)=>changeNum(e,c.sanpham)} /></td>
                                    <td><p className="text-danger">{c.sanpham.dongia * c.soluong} đ</p></td>
                                    <td><input type="checkbox" className="form-check-input" onClick={(e)=>checkSP(e,c.sanpham,c.soluong)}/></td>
                                </tr>
                            ))}
                        </table>
                        
                        
                        {sanpham.length>0?<button onClick={order} className="btn btn-danger btn-lg mt-4" >ĐẶT HÀNG</button>:''}
                          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">TIẾN HÀNH ĐẶT HÀNG</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                      <p className="text-secondary">Thông tin khách hàng</p>
                                      <hr/>
                                        <table className="table table-borderless table-cart">
                                            <tr>
                                                <td>HỌ TÊN</td>
                                                <td>{user.ho + ' ' + user.ten}</td>
                                            </tr>
                                            <tr>
                                                <td>SỐ ĐIỆN THOẠI</td>
                                                <td>{user.sdt}</td>
                                            </tr>
                                            <tr>
                                                <td>EMAIL</td>
                                                <td>{user.email}</td>
                                            </tr>
                                            <tr>
                                                <td>ĐỊA CHỈ</td>
                                                <td>{user.diachi}</td>
                                            </tr>
                                        </table>
                                    <hr/>
                                    <p className="text-secondary">Danh sách sản phẩm</p>
                                    <hr/>
                                    <table className="table table-borderless table-cart">
                                        {cart.map(c=>{
                                            if(isInList(c.sanpham.masp))
                                            return(
                                                <tr key={c.sanpham.masp}>
                                                    <td><img src={c.sanpham.photo} alt="picture" style={{width:"70px",marginRight:"30px"}} /> {c.sanpham.tensp}</td>
                                                    <td style={{width:"15%"}}>Số lượng : {c.sanpham.soluong}</td>
                                                    <td className="text-danger">{c.sanpham.dongia * c.soluong} đ</td>
                                                </tr>)
                                            }
                                        )}
                                        <hr/>
                                        <tr>
                                            <td colSpan="2" style={{fontSize:"23px"}}>Tổng tiền</td>
                                            <td style={{fontSize:"23px"}}>{total} đ</td>
                                        </tr>
                                    </table>

                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                                    <button type="button" className="btn btn-primary" onClick={order} data-dismiss="modal">Xác nhận</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                    </div>
                    <div className='col-4' style={{marginLeft:30,borderLeft:'2px solid tomato'}}>  
                    <div className="cart-header">
                    
                        <div className="cart-total mt-4">
                            <p>Tổng sản phẩm :</p>
                            <p>{tongsp()}</p>
                        </div>
                        <div className="cart-total text-success">
                            <h4>Tạm tính :</h4>
                            <h4>{total} đ</h4>
                        </div>
                      </div>         
                    </div>
                </div>
            </div>
        </div>
    )
}

