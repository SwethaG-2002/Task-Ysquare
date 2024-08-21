import React,{useState} from "react";
import Layout from "../../Component/Layout/Layout";
import{ToastContainer,toast} from 'react-toastify'
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../context/auth.js";
 

const Login =()=>
{
     
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

const [auth,setAuth] = useAuth(); 

   const navigate = useNavigate();
   const location = useLocation();

         // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password, 
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
         setAuth({
           ...auth,
           user: res.data.user,
           token: res.data.token,
         });
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

 return(
    <Layout title={"Login - Luna Times"}>
    <div className="login">
      <h3>Log in to your account</h3>
      <form onSubmit={handleSubmit}>
 <div className="mb-3">
 <label htmlFor="exampleInputEmail1" className="form-label">EMAIL</label>
   <input 
   type="email" 
   value={email} 
   onChange={(e)=>setEmail(e.target.value)} 
   className="form-control" 
   id="exampleInputEmail1"  
   placeholder="Enter your email" 
   required/>
   </div>
 <div className="mb-3">
   <label htmlFor="exampleInputPassword1" className="form-label">PASSWORD</label>
   <input 
   type="password" 
   value={password} 
   onChange={(e)=>setPassword(e.target.value)} 
   className="form-control" 
   id="exampleInputPassword1"  
   placeholder="Enter your password" 
   required/>
 </div>
 <div className="center-container">
  <button type="submit" className="btn btn-primary-custom">
    <ToastContainer position="top-center" reverseOrder={false}/>Login
  </button>
</div>
<div className="center-container">
  <button type="button" className="btn btn-warning-custom" onClick={() => {navigate('/forgot-password')}}>
    <ToastContainer position="top-center" reverseOrder={false}/>Forgot Password
  </button>
</div>

 
 
 
 
</form>
    </div>
       </Layout>  
 )
}
export default Login;