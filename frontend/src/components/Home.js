import React, { Fragment, useState, useEffect } from 'react'
import { usersList,clearErrors } from '../actions/userListAction';
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Home = () => {

    const [data,setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get('/mindful/admin/users');
        setData(response.data.user);
    };

    useEffect(()=> {
        loadData();
    },[]);
        
     

    const handleDelete = async (id) => {
        const response = await axios.delete('/mindful/admin/user/'+id)
        .then(response => {
            window.location.reload();
        }).catch(err => console.log(err))

    }
    

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-tems-center'>
      <div className='w-50 bg-white rounded p-3'>
        <h2>User List</h2>
        <div className='d-flex justify-content-end'>
            <Link to="/create" className='btn btn-success'>Create User</Link>
        </div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user,index) => {
                    return (<tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                        <Link to={`/view/${user._id}`} className='btn btn-sm btn-info'>View</Link>
                            <Link to={`/edit/${user._id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                            <button onClick={() => handleDelete(user._id)} className='btn btn-sm btn-danger'>Delete</button>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
