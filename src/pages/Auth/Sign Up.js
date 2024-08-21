import React,{useState} from "react";
import Layout from "../../Component/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import{ToastContainer,toast} from 'react-toastify';
const  Signup=()=>
{
      const [name,setName] = useState("");
      const [email,setEmail] = useState("");
      const [number,setNumber] = useState("");
      const [password,setPassword] = useState("");
      const [address,setAddress] = useState("");
      const [answer,setAnswer] = useState("");
      const navigate=useNavigate();

      // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        number,
        password,
        address,
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
 
 return(
  <Layout title={"Sign Up - Luna Times"}>
     <div className="signup">
       <h3>Sign Up here</h3>
       <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputName1" className="form-label">NAME</label>
    <input 
    type="text" 
    value={name} 
    onChange={(e)=>setName(e.target.value)} 
    className="form-control" 
    id="exampleInputName" 
    placeholder="Enter your name" 
    required/>
  </div>
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
    <label htmlFor="exampleInputNumber1" className="form-label">MOBILE</label>
    <input 
    type="text" 
    value={number} 
    onChange={(e)=>setNumber(e.target.value)} 
    className="form-control" 
    id="exampleInputNumber" 
    placeholder="Enter your mobile number" 
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

  <div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label">ADDRESS</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">FOR SECURITY</label>
    <input 
    type="text" 
    value={answer} 
    onChange={(e)=>setAnswer(e.target.value)} 
    className="form-control" 
    id="exampleInputPassword1"  
    placeholder="Enter your favourite colour?" 
    required/>
  </div>
  <center><button type="submit" className="btn btn-warning">
  <ToastContainer position="top-center"
  reverseOrder={false}/>Submit
  </button></center>
</form>
     </div>
        </Layout>    
 )
}
export default Signup;