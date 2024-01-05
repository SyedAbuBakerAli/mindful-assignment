import React, {Fragment, useEffect} from 'react'
import {Route,Routes, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function ProtectedRoute(props) {

  
  const {Component} = props;
  const navigate = useNavigate();
  
   const {isAuthenticated, loading, user} = useSelector(state => state.auth)

   
     if(!isAuthenticated){
       navigate('/login')
     };

    return(
      <div>
        <Component/>
      </div>
    )
   
   
}

export default ProtectedRoute
