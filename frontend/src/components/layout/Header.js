import React, { Fragment } from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userAction'


// import { logout } from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'

import '../../App.css'
const Header = () => {

    const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logout());
      }

    return (
        <Fragment>
            <nav class="navbar row">
                <div class="col-12 col-md-3">
                    <div class="navbar-brand">
                        <img src="./images/logo.png" />
                    </div>
                </div>

                <div class="col-12 col-md-6 mt-2 mt-md-0">
                    <div class="input-group">
                        <input
                            type="text"
                            id="search_field"
                            class="form-control"
                            placeholder="Enter Product Name ..."
                        />
                        <div class="input-group-append">
                            <button id="search_btn" class="btn">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>
                    <Link className='dropdown-item text-danger' to="/" onClick={logoutHandler}>
                        Logout
                    </Link>


                </div>
            </nav>

        </Fragment>
    )
}

export default Header
