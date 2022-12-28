import React from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../logo.jpg'
import Swal from 'sweetalert2'


export default function Nav() {

    const navigate = useNavigate()
    const auth = localStorage.getItem("user")

    function logout() {
        Swal.fire({
            title: 'Logout',
            text: "Are you sure?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1db070',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Logged Out',
                    '',
                    'success'
                )
                localStorage.clear();
                navigate('/login')
            }
        })
    }

    return (
        <div className="nav-div">
            <ul>

                <img className="logo" src={Logo} alt="Logo" />
                {
                    auth ?
                        <>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/addProduct">Add</NavLink></li>
                            <li className="log-out"><NavLink onClick={logout} to="/login">Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></NavLink></li>

                        </>
                        : <>
                            <li><NavLink to="/signup">SignUp</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                        </>
                }
            </ul>
        </div>
    )
}