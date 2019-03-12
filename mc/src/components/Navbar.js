import React from 'react'
import logo from '../images/logo.png'

const Navbar = () => {
    return (
        <div className="navbar-fixed">
            <nav className="nav-wrapper center-align teal lighten-2">
                <div className="center"><ul className="">
                <li><img src={logo} alt="not found" className="logo"></img></li>
                <li><a href="#" class="brand-logo"><h5>Movie Comparer</h5></a></li>
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar