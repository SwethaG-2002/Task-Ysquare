import React from "react";
import { NavLink,Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import {Badge} from "antd";

const Header=()=> {
const [auth, setAuth] = useAuth();
const [cart] = useCart();
const categories = useCategory();

const handleLogout = () => {
  setAuth({
    ...auth, user:null,token:''
  })
localStorage.removeItem("auth");
toast.success("Logout Successfully");
};
{
    return(
        <>

         <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <img
        src="/images/images/favicon.png"
        className="logo-img"
        width={"3%"}
      /><Link className="navbar-brand" >
      Luna Shop
    </Link>
    <button className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto mb-3 mb-lg-0">
        
        <li className="nav-item">
          <NavLink to="/" className="nav-link" aria-current="page" href="#">
         Home
          </NavLink >
        </li>



        <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>



         {
          !auth.user ? (
          <>
          <li className="nav-item">
          <NavLink to="/signup" className="nav-link" href="#">
          Sign up
          </NavLink >
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" href="#">
            Login
          </NavLink >
          </li>
          </>
        ) : ( 
       <>
       <li className="nav-item dropdown">
  <NavLink
    className="nav-link dropdown-toggle"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
   {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li>
      <NavLink 
      to= {`/dashboard/${
        auth?.user?.role === 1 ? "admin" : "user"
      }`} 
      className="dropdown-item">
        Dashboard
      </NavLink>
    </li>
    <li>
    <NavLink onClick={handleLogout}to="/login" className="dropdown-item">
            Logout
          </NavLink >
          </li>
  </ul>
</li>
          </>
        )}
          <li className="nav-item">
          <Badge count={cart?.length} showZero>
          <NavLink to="/cart" className="nav-link" href="#">
            Cart 
          </NavLink >
    </Badge>
          
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>
    );
};
};
export default Header;


 