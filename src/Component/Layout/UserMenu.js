import React from 'react'
import { NavLink } from 'react-router-dom';
const UserMenu = () => {
  return (
    <>
   <div className='text-center' >
     <div className="con">
    <h4>Dashboard</h4>
  <NavLink to="/dashboard/user/profile" className="NavLinkst-group-item">Profile</NavLink>
  <NavLink to="/dashboard/user/orders"className="NavLinkst-group-item">Orders</NavLink>
</div>
   </div>
   </>
  )
}
export default UserMenu;