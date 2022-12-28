import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateComponent() {
    const auth = localStorage.getItem('user')
    return auth ? <Outlet /> : <Navigate to="signup" />
}