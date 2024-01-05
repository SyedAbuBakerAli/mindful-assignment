import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Create = () => {

   const [values,setValues] = useState({
    name: '',
    email: '',
    phone:''
   })

   const navigate = useNavigate();

   const sendData = async () => {
      const response = await axios.post('/mindful/admin/user/new',values)
      .then(response => {
        console.log(response);
        navigate('/')
      }).catch(err => console.log(err))

   }
const handleSubmit = (e) => {
    e.preventDefault();
    sendData();
}


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <div className='mb-2'>
                <label htmlFor=''>
           Name
                </label>
                <input type='text' placeholder='Enter Name' className='form-control'
                  onChange={e => setValues({...values, name: e.target.value})}/>

            </div>
            <div className='mb-2'>
                <label htmlFor=''>
           Email
                </label>
                <input type='email' placeholder='Enter Email' className='form-control'
                onChange={e => setValues({...values, email: e.target.value})}/>

            </div>
            <div className='mb-2'>
                <label htmlFor=''>
           Phone
                </label>
                <input type='text' placeholder='Enter Phone' className='form-control'
                onChange={e => setValues({...values, phone: e.target.value})}/>

            </div>
            <button className='btn btn-success'>Submit</button>
        </form>
        
        </div>      
    </div>
  )
}

export default Create
