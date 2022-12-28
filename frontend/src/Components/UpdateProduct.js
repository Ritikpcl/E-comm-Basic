import React, { useEffect } from "react";
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

export default function UpdateProduct() {

    const params = useParams()
    const navigate = useNavigate()

    const [item, setItem] = useState({
        name: "",
        price: "",
        userId: "",
        category: "",
        company: ""
    })

    useEffect(() => {
        getDetails()
    }, [])

    async function getDetails() {
        let details = await fetch(`http://localhost:5000/updateProduct/${params.id}`)
        details = await details.json()

        setItem(prevItem => ({
            ...prevItem,
            name: details.name,
            price: details.price,
            category: details.category,
            company: details.company
        }))

    }

    function dataHandle(event) {
        setItem(prevItem => ({
            ...prevItem,
            [event.target.name]: event.target.value
        }))
    }

    async function updateItem() {

        let result = await fetch(`http://localhost:5000/updateProduct/${params.id}`,
            {
                method: 'put',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'Application/json'
                }
            }
        )

        result = await result.json()
        if (result) {
            swal({
                title: `${item.name} `,
                text: `Updated successfully`,
                icon: "success",
            });
            navigate('/')

        } else {
            alert("Please enter data")
        }
    }

    return (
        <div className="update-Product">
            <h2>Update Product</h2>

            <input
                type="text"
                placeholder="Product name"
                name="name"
                defaultValue={item.name}
                onChange={dataHandle} />

            <input
                type="text"
                placeholder="Product price (₹)"
                name="price"
                defaultValue={item.price}
                onChange={dataHandle} />

            <input
                type="text"
                placeholder="Product category"
                name="category"
                defaultValue={item.category}
                onChange={dataHandle} />

            <input
                type="text"
                placeholder="Product company"
                name="company"
                defaultValue={item.company}
                onChange={dataHandle} />

            <button onClick={updateItem}>Update</button>
        </div>
    )
}
