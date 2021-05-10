import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import './SanphamWorkplace.css'
function Admin_workplace({slide}){
    const [on,setOn] = useState(false)
    const [onUpdate,setOnUpdate] = useState(false)
    const { register, handleSubmit, setValue } = useForm();
    const [danhmuc,setDanhmuc] = useState([]);
    const [search,setSearch] = useState('')
    const checkDanhMuc = (madm)=>{
        for(let i=0;i<danhmuc.length;i++){
            if(danhmuc[i].madm === madm)
            return true;
        }
        return false;
    }
    const onSubmit = data => {
        if(onUpdate){
            axios.put(process.env.REACT_APP_API +'danhmuc',data)
            .then(response =>{
                console.log(response)
                setOn(!on)
                setOnUpdate(!onUpdate)
                axios.get(process.env.REACT_APP_API+'danhmuc')
                .then(response => setDanhmuc(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
        else{
            if(checkDanhMuc(data.madm)){
                alert('Trùng mã danh mục !!!')
                return;
            }
            axios.post(process.env.REACT_APP_API +'danhmuc',data)
            .then(response =>{
                console.log(response)
                setOn(!on)
                axios.get(process.env.REACT_APP_API+'danhmuc')
                .then(response => setDanhmuc(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
    }
    
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'danhmuc/')
        .then(response => setDanhmuc(response.data) )
        .catch(erro => console.log(erro))
    },[])
    const getDeleteDM = (madm)=>{
        let agree = window.confirm(`Bạn có muốn xóa madm = ${madm}?`);
        if (!agree)
        return
        axios.delete(process.env.REACT_APP_API+'danhmuc/'+madm)
        .then(response => {
            axios.get(process.env.REACT_APP_API+'danhmuc')
            .then(response => {setDanhmuc(response.data);alert('Xóa thành công !!!')} )
            .catch(erro =>alert('Xóa thất bại !!!'))
        } )
        .catch(erro => alert('Xóa thất bại !!!'))
    }
    const getUpdateDM =(dm)=>{
        setOnUpdate(true)
        setOn(true)
        setValue("madm",dm.madm)
        setValue("tendm",dm.tendm)
    }
    const getInsertDM = ()=>{
        setOn(true); 
        setValue("madm",'')
        setValue("tendm",'')
    }
    const handleSearch = (e)=>{
        const {value} = e.target;
        setSearch(value)
    }
    return(
        <div className={slide?"workplace":"on-off-workplace"}>
                <h3 className={!on?"form-head":"d-none"}>DANH SÁCH DANH MỤC</h3>  
                <ul className={!on?"form-func":"d-none"}>
                        <li className="setting_form"><i className="fa fa-cogs" aria-hidden="true"></i></li>
                        <li className="add_form" onClick={()=>getInsertDM()}><i className="fa fa-plus-square-o" aria-hidden="true"></i>ADD</li>
                        <li className="find_form_li"><i className="fa fa-search" aria-hidden="true"></i> <input type="text" className = "find_form" onChange={handleSearch}/> </li>
                </ul>
                <div className={!on?"workplace_display":"d-none"}>
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-success">
                            <tr>
                                <th>MÃ DANH MỤC</th>
                                <th>TÊN DANH MỤC</th>
                                <th>DELETE</th>
                                <th>UPDATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {danhmuc.map(dm =>{
                                if(dm.tendm.toLowerCase().includes(search.toLowerCase()))
                                return (
                                    <tr key={dm.madm}>
                                        <td>{dm.madm}</td>
                                        <td>{dm.tendm}</td>
                                        <td className="custom"><p className="custom-link" onClick={()=> getDeleteDM(dm.madm)}>Delete</p> </td>
                                        <td className="custom"><p className="custom-link" onClick={()=> getUpdateDM(dm)}>Update</p></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                        

                </div>
                <div>
                <div className={on?"workplace_input":"d-none"}>
                <div className="card">
                <div className="card-header text-white bg-primary d-flex justify-content-between px-4">FORM NHẬP SẢN PHẨM<span className="exit-input" onClick={()=>setOn(!on)}>X</span></div>
                <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <label>Mã danh mục</label>
                                    <input className="form-control" placeholder="Please enter here ..." ref={register} name='madm' readOnly={onUpdate?true:false}/>
                                    <label>Tên danh mục</label>
                                    <input className="form-control" placeholder="Please enter here ..." ref={register} name='tendm'/>
                                </div>        
                                <button className="btn btn-success mt-4 mr-4 btn-input"  type="submit" >Submit</button>
                                <button className="btn btn-info mt-4 mr-4 btn-input" type="reset">Reset</button>
                                <button className="btn btn-danger mt-4 btn-input" onClick={()=>setOn(!on)} type="button">Exit</button>
                            </div> 
                        </div>
                 </form>

                </div>
                </div>
                </div>
            
        </div>
        </div>
    )
}
export default Admin_workplace