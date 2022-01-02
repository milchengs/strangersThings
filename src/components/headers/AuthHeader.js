import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function AuthHeader ({setToken, setIsLoggedIn}) {
    function logoutUser () {
        setToken("")
        setIsLoggedIn(false)
    }

    return <header>
        <Link to="/" className="headerText">
            <h1>Stranger's Things</h1>
        </Link>
        
        <nav>
            <NavLink 
                to="/" 
                className={(navData) => navData.isActive ? "active" : ""}
            >Home
            </NavLink>

            <NavLink 
                to="/posts" 
                className={(navData) => navData.isActive ? "active" : ""}
            >Posts
            </NavLink>

            <NavLink 
                to="/profile" 
                className={(navData) => navData.isActive ? "active" : ""}
            >Profile
            </NavLink>

            <Link 
                to='/' 
                id="logoutButton" 
                onClick={logoutUser}
            >Log Out
            </Link>
        </nav>
    </header>
}

export default AuthHeader