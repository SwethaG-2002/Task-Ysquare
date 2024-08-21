import React, { useState, useEffect } from "react";
import UserMenu from "../../Component/Layout/UserMenu";
import Layout from "../../Component/Layout/Layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate=useNavigate(); 

  //get user data
  useEffect(() => {
    const { email, name, number,address } = auth?.user;
    setName(name);
    setEmail(email);
    setNumber(number);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        number,
        address,
        password,
       
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
       
        toast.success("Profile Updated Successfully");
         navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Luna Times-Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "10px" }}>
            <form onSubmit={handleSubmit}>
             <h4 className="title">USER PROFILE</h4>
               
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

                <button type="submit" className="btn btn-warning">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;