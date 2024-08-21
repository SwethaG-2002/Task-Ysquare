import React from 'react'
import { NavLink } from 'react-router-dom';
const AdminMenu = () => {
  return (
   <>
   <div className='text-center' >
     <div className="con">
    <h4>Admin Panel</h4>
  <NavLink to="/dashboard/admin/create-category" className="NavLinkst-group-item">Create Category</NavLink>
  <NavLink to="/dashboard/admin/create-product"className="NavLinkst-group-item">Create Product</NavLink>
  <NavLink to="/dashboard/admin/products"className="NavLinkst-group-item">Products</NavLink>
  <NavLink to="/dashboard/admin/orders"className="NavLinkst-group-item">Orders</NavLink>
  <NavLink to="/dashboard/admin/users"className="NavLinkst-group-item">Users</NavLink>
</div>
   </div>
   </>
  )
}
export default AdminMenu;