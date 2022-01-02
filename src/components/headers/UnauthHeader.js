import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function UnauthHeader () {
    return <header>
        <Link to='/' className="headerText">
            <h1>Stranger's Things</h1>
        </Link>
        
        <nav>
            <NavLink 
                to="/posts" 
                className={(navData) => navData.isActive ? "active" : ""}
            >Posts
            </NavLink>

            <NavLink 
                to="/login" 
                className={(navData) => navData.isActive ? "active" : ""}
            >Login/Register
            </NavLink>
        </nav>
    </header>
}

export default UnauthHeader