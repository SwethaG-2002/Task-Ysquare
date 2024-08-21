import React from "react";
import Layout from "../Component/Layout/Layout";
import { MdPhoneForwarded } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
const Contact=()=>
{
    return(
      <Layout title={'Contact Us - Luna Times'}>
        <div className="row contactus">
          <div className="col-md-6">
            <img 
            src="images/images/1.png"
            alt=""
            style={{width: "100%"}}
          />
          </div>
          <div className="col-md-6">
            <h1 className="cont"><b>Contact Us</b></h1>
            <p className="text">
            Need Help or Information About Our Product? <br></br>
            Feel Free to Call Us Anytime. <br></br>
            We're Available 24/7 to Help<br></br>
            </p>
            <p className="ts">
            <p className="mt-3">
              <MdPhoneForwarded/> : <b>0404-88448844</b>
            </p>
            <p className="mt-3">
              <MdEmail/> : <b>www.help@lunashop.com</b>
            </p>
            <p className="mt-3">
              <BiSupport/> : <b>1800-0000-0000 (Toll Free)</b>
            </p>
            </p>

          </div>
          </div>          
          </Layout>    
    )
}
export default Contact;