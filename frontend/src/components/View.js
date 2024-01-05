import React, {useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const View = () => {
    const {id} = useParams();
    useEffect(()=> {
        loadData();
    })

    const [data,setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get('/mindful/admin/user/'+id);
        setData(response.data.user);
    };
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
  <div className='w-50 bg-white rounded p-3'>
    <div className='p-2'>
    <h2>User Details</h2>
    <h3>{data.name}</h3>
    <h3>{data.email}</h3>
    <h3>{data.phone}</h3>
    </div>
    <Link to="/" className='btn btn-primary me-2'>Back</Link>
    <Link to={`/edit/${data._id}`} className='btn btn-info'>Edit</Link>

    </div>      
    </div>
  )
}

export default View
