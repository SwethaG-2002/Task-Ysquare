import React,{useState} from "react";
import Layout from "../../Component/Layout/Layout";
import{ToastContainer,toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import axios from "axios";
 

const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [answer,setAnswer] = useState(""); 
 

   const navigate = useNavigate();
  

         // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forget-Password", {
        email,
        newPassword, 
        answer
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
          
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={'Forgot password - Luna Times'}> 
         <div className="signup">
      <h4>Reset Password</h4>
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
 <label htmlFor="exampleInputEmail1" className="form-label">ANSWER HERE</label>
   <input 
   type="text" 
   value={answer} 
   onChange={(e)=>setAnswer(e.target.value)} 
   className="form-control" 
   id="exampleInputEmail1"  
   placeholder="Enter your favourite colour" 
   required/>
   </div>
 <div className="mb-3">
   <label htmlFor="exampleInputPassword1" className="form-label">PASSWORD</label>
   <input 
   type="password" 
   value={newPassword} 
   onChange={(e)=>setNewPassword(e.target.value)} 
   className="form-control" 
   id="exampleInputPassword1"  
   placeholder="Enter your new password" 
   required/>
 </div>
 <center><button type="submit" className="btn btn-primary">
 <ToastContainer position="top-center"
 reverseOrder={false}/>Reset
 </button></center>
 
 
</form>
    </div>
        </Layout>
  )
}

export default ForgotPassword;