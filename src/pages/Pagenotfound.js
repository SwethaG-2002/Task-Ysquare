import React from "react";
import {Link} from "react-router-dom";
import Layout from "../Component/Layout/Layout";
import {} from "react-bootstrap";

const Pagenotfound=()=>
{
    return(
      <Layout title={'Navigate Back - Page Not Found'}>
      <div className="pnf">
            <p className="pnf-title">"404 ERROR"</p>
            <p className="pnf-heading">Oops! Page Not Found</p>
            <Link to="/">
            <button type="button" className="btn btn-warning custom-background-color" style={{ color: 'white' }}>Navigate Back</button>
              </Link>
            </div>  
            </Layout>   
    )
}
export default Pagenotfound;