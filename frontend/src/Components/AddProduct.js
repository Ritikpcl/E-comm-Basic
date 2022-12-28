import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export default function AddProduct() {

    const [item, setItem] = useState({
        name: "",
        price: 0,
        userId: "",
        category: "",
        company: ""
    })

    const [error, setError] = useState(false)
    const navigate = useNavigate()

    function dataHandle(event) {
        setItem(prevItem => ({
            ...prevItem,
            [event.target.name]: event.target.value
        }))
    }

    async function collectData() {

        /*Check all inputs are filled*/
        if (!item.name || !item.price || !item.category || !item.company) {
            setError(true)
            return false; /*it means function treminate*/
        }

        let Id = localStorage.getItem("user")
        Id = await JSON.parse(Id)._id
        item.userId = Id;
        /*one liner : item.userId = await JSON.parse(localStorage.getItem('user')._id*/
        let result = await fetch(`${process.env.REACT_APP_Domain}/addProduct`, {
            method: 'post',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()
        if (result.name) {
            swal({
                title: `${result.name} `,
                text: `Added successfully`,
                icon: "success",
            });
            navigate('/')
        } else {
            alert(result)
        }
    }

    return (
        <div className="add-Product">
            <h2>Add Product</h2>

            <input
                type="text"
                placeholder="Product name"
                name="name"
                onChange={dataHandle} />
            {error && !item.name && <span className="span-error">Please enter valid name</span>}

            <input
                type="text"
                placeholder="Product price (₹)"
                name="price"
                onChange={dataHandle} />
            {error && !item.price && <span className="span-error">Please enter valid price</span>}

            <input
                type="text"
                placeholder="Product category"
                name="category"
                onChange={dataHandle} />
            {error && !item.category && <span className="span-error">Please enter valid category</span>}

            <input
                type="text"
                placeholder="Product company"
                name="company"
                onChange={dataHandle} />
            {error && !item.company && <span className="span-error">Please enter valid company</span>}

            <button onClick={collectData}>Add</button>
        </div>
    )
}
