import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

export default function Signup() {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleData(event) {
        setData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const navigate = useNavigate()
    useEffect(() => {
        const auth = localStorage.getItem("user")
        auth && navigate('/')
    }, [])

    async function collectData(event) {

        let result = await fetch("http://localhost:5000/signup", {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()
        if (result.email) {
            swal({
                title: `Welcome, ${result.name}!`,
                text: "Successfully Signed Up!",
                icon: "success",
                button: "Thank You",
            });
            localStorage.setItem("user", JSON.stringify(result))
            navigate('/')
        } else {
            swal({
                title: "Error",
                text: `${result.result}`,
                icon: "error",
            });
        }
    }

    return (
        <div className="signup_login">
            <h2>SignUp</h2>

            <input
                type="text"
                placeholder="Enter Name"
                onChange={handleData}
                name="name"
            />

            <input
                type="email"
                placeholder="type_email@gmail.com"
                onChange={handleData}
                name="email"
            />

            <input
                type="password"
                placeholder="Enter Password"
                onChange={handleData}
                name="password"
            />

            <button onClick={collectData}>SignUp</button>
        </div>
    )
}