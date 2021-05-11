import React,{useState,useEffect} from 'react'
import logo from './logo.png'
import './Navbar.css'
import axiosClient from '../API/AxiosClient'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
function Navbar(){
    const [danhmuc,setDanhMuc] = useState(null);
    useEffect(()=>{
      axios.get(process.env.REACT_APP_API+'danhmuc/')
      .then(response => setDanhMuc(response.data))
      .catch(error => console.log(error))
    },[])
    const [search,setSearch] = useState('')
    const [isSearch,setIsSearch] = useState(false)
    const [products,setProducts] = useState([])
    useEffect(async()=>{
        try {
          const data = await axiosClient.get('sanpham',null);
          setProducts(data);
        } catch (error) {
          console.log(error)
        }
    },[]) 
    const handleSearch = (e)=>{
      const {value} = e.target
      setSearch(value)
    }
    return(
      
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <a className="navbar-brand d-block d-sm-none" to="/#">
            <img src={logo} className='logo'/>
         </a>
         <Link to='/'>
          <a className="navbar-brand d-none d-sm-block" to="/#">
          <img src="https://i.pinimg.com/originals/b1/2e/e7/b12ee7389041544b207b9488c55301ef.png" style={{width:100}}/> FASTFOOD 
          </a>
         </Link>
        
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon" />
               </button>
               <div className="collapse navbar-collapse" id="navbarText">
                 <ul className="navbar-nav mr-auto">
                   <li className="nav-item">
                     <a className='nav-link'>TRANG CHỦ</a>
                   </li>
                   <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">DANH MỤC</a>
                            <div className="dropdown-menu">
                                 {danhmuc?.map(dm=>{
                                   return (
                                    <Link to = {"/danhmuc/"+dm.madm}><p className="dropdown-item">{dm.tendm}</p></Link>
                                   )
                                 })}
                            </div>
                   </li>
                   <li className="nav-item">
                     <a className='nav-link'>THÔNG TIN</a>
                   </li>
                   <li className="nav-item">
                     <a className='nav-link'>LIÊN HỆ</a>
                   </li>
                 </ul>
                 
               </div>
               
               <form className='search input-group ' onFocus={()=>setIsSearch(true)} onBlur={()=>setIsSearch(false)}>
            <input className='form-control' placeholder='Nhập để tìm kiếm . . .' onChange={handleSearch} />
            <div className="input-group-append">
                <button className='btn btn-warning'>Tìm kiếm</button>
            </div>
            {isSearch?
              <div className="searchBox">
              <div className="table-responsive">
              <table className="table table-borderless table-hover table-light" >
                <tbody>
                  {products.map(sp=>{
                    if(sp.tensp.toLowerCase().includes(search.toLowerCase()))
                    return (
                      <tr key={sp.masp} onMouseDown={()=> window.location.href="/product/"+sp.masp}  >
                          <td>{sp.masp}</td>
                          <td>{sp.tensp}</td>
                          <td>{sp.soluong}</td>
                          <td>{sp.dongia}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>
              
            </div>:''
            }
        </form>
             </nav>
    )
}
export default Navbar;