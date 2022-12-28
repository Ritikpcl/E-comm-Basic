import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UilSort, UilConfused } from '@iconscout/react-unicons'
import Swal from 'sweetalert2'
import Lottie from 'react-lottie';
import animationData from '../Cm5tUigy3z.json';

export default function ProductList() {

    const [products, setProducts] = React.useState([])
    const [sort, setSort] = React.useState(true);

    /*np-product-found lottie animation properties*/
    const options = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


    useEffect(() => {
        getProducts()
    }, [sort]) //when sort button clicked getProducts function should execute that's why sort is written in it

    async function getProducts() {
        let item = await fetch("http://localhost:5000/productList")
        item = await item.json()
        item.sort((a, b) => {
            if (sort) {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        })

        setProducts(item)
    }

    // async function deleteProduct(id){
    //     let result = await fetch(`http://localhost:5000/productList/${id}`,{
    //         method : 'Delete'
    //     })

    //     result = await result.json()
    //     if(result){
    //         getProducts()
    //     }
    //     // console.log(id)
    // }

    async function deleteProduct(item) {
        Swal.fire({
            title: `Delete ${item.name}`,
            text: "Are you sure?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1db070',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let result = await fetch(`http://localhost:5000/productList/${item._id}`, {
                    method: 'Delete'
                })

                result = await result.json()
                if (result) {
                    getProducts()
                }

                Swal.fire(
                    '',
                    `${item.name} is deleted`,
                    'success'
                )
            }
        })
    }

    async function searchHandle(event) {
        let key = event.target.value
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json()

            if (result) {
                setProducts(result)
            }
        } else {
            getProducts()
        }
    }

    return (
        <>
            <div className='product-list-heading'><h1>Product List</h1></div>
            <div className="search-box">
                <input type="text" placeholder="Search Product" onChange={searchHandle} />
                <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            </div>

            <div className='product-list'>
                <div className='product-list-row'>
                    <ul>
                        <li>S. No.</li>
                        <li>Name</li>
                        <li className='price-div'>Price
                            <button className="sort-button" onClick={() => setSort(!sort)}><UilSort className="sort-icon" />
                            </button></li>
                        <li>Category</li>
                        <li>Company</li>
                        <li>Delete</li>
                        <li>Update</li>
                    </ul>
                </div>

                {
                    products.length > 0 ?
                        (
                            products.map((item, index) =>
                                <div key={item._id} className='items'>
                                    <ul>
                                        <li>{index + 1}</li>
                                        <li>{item.name}</li>
                                        <li>{item.price}</li>
                                        <li>{item.category}</li>
                                        <li>{item.company}</li>
                                    </ul>
                                    <button onClick={() => deleteProduct(item)} className='delete-button'>Delete</button>
                                    <Link to={`/updateProduct/${item._id}`}><button className='update-button'>Update</button></Link>
                                </div>
                            )
                        ) :
                        <>
                            <div className='product-list-heading'>No product found</div>
                            <Lottie
                                options={options}
                                speed={2}
                                height={400}
                                width={400}
                            />
                        </>
                }

            </div>
        </>
    )
}