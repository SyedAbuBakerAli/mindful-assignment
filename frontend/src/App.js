import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import './App.css';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Home from './components/Home';
import Create from './components/Create';
import View from './components/View';
import { useEffect } from 'react';
import store from './store'
import ProtectedRoute from './components/route/ProtectedRoute';
import { useSelector } from 'react-redux';
import Update from './components/Update';
import { loadUser } from './actions/userAction';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  },[])

  const {isAuthenticated} = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">

        <Header />

        <div className='container container-fluid'>
          <Routes>
          <Route path='/login' Component={Login} />
         <Route path='/' element= {isAuthenticated ? <Home/>: <Navigate to="/login"/>}/>
          <Route path='/register' Component={Register} />
          <Route path='/create' Component={Create}/>
          <Route path='/view/:id' Component={View}/>
          <Route path='/edit/:id' Component={Update}/>
          {/* <Route path='/' element={
            <ProtectedRoute Component={Home}/>
          } /> */}
          </Routes>
        </div>
     
        <Footer />
      </div>
    </Router>
  );
}

export default App;
