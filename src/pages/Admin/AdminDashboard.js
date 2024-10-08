import React from 'react'
import Layout from '../../Component/Layout/Layout';
import AdminMenu from '../../Component/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
         <div className='container-fluid m-3 p-3'>
<div className='row'>
  <div className='col-md-3'><AdminMenu/></div>
  <div className='col-md-9'>
    <div className='card w-75 p-3'>
    <div className="admin-details">
 <h4>Admin Name :{auth?.user?.name}</h4>
 <h4>Admin Email :{auth?.user?.email}</h4>
 <h4>Admin Contact :{auth?.user?.number}</h4>
 </div>
      </div> 
  </div>
           </div>
         </div>
        </Layout>
  );
};

export default AdminDashboard;