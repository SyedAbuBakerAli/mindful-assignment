import React, {useState,useEffect} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Update = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=> {
        loadData();
    })

    const [data,setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get('/mindful/admin/user/'+id);
        setData({...values, name: response.data.user.name, email: response.data.user.email, 
            phone: response.data.user.phone});
    };
    const [values,setValues] = useState({
        name: '',
        email: '',
        phone: ''
       })

       const sendData = async () => {
        const response = await axios.put('/mindful/admin/user/'+id,values)
        .then(response => {
          console.log(response);
          navigate('/')
        }).catch(err => console.log(err))
  
     }

   const handleUpdate = (event) => {
    event.preventDefault();
    sendData();

   }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
            <h2>Update User</h2>
            <div className='mb-2'>
                <label htmlFor=''>
           Name
                </label>
                <input type='text' placeholder='Enter Name' className='form-control' value={values.name}
                  onChange={e => setValues({...values, name: e.target.value})}/>

            </div>
            <div className='mb-2'>
                <label htmlFor=''>
           Email
                </label>
                <input type='email' placeholder='Enter Email' className='form-control' value={values.email}
                onChange={e => setValues({...values, email: e.target.value})}/>

            </div>
            <div className='mb-2'>
                <label htmlFor=''>
           Phone
                </label>
                <input type='text' placeholder='Enter Phone' className='form-control' value={values.phone}
                onChange={e => setValues({...values, phone: e.target.value})}/>

            </div>
            <button className='btn btn-success'>Submit</button>
        </form>
      
        </div>      
    </div>
  )
}

export default Update
