import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
  
  const { user } = useSelector((state) => state.auth)
  
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" />



 
}

export default AdminRoute