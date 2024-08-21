import React from "react";
import Layout from "../Component/Layout/Layout";

const Policy=()=>
{
    return(
      <Layout title={'Privacy Policy - Luna Times'}>
           <div className="row contactus">
          <div className="col-md-6">
            <img 
            src="images/images/3.png"
            alt=""
            style={{width: "100%"}}
          />
          </div>
          <div className="col-md-6">
            <h1 className="poli"><b>Privacy Policy</b></h1>

        <p className="pol">
          <p>
            <b>1. Introduction:</b> Welcome to Luna Shop. We value your privacy and are committed to protecting your personal information. 
This Privacy Policy explains how we collect, use, and share your information when you visit [website URL]. <br></br>  
            </p>
            <p>
            <b>2. Information We Collect:</b> Personal Information: Name, email, address, phone number, payment info, and other details you provide.
Non-Personal Information: Browser type, operating system, IP address, pages visited, and referral URLs.
            </p>
            <p>
            <b>3. How We Use Your Information:</b> To process orders, communicate with you, provide support, send updates and promotions, and improve our Site.
            </p>
            <p>
            <b>4. Sharing Your Information:</b> We don’t sell your info. We may share it with service providers, for legal reasons, or during business transactions.
            </p>

            <p>
            <b>5. Security:</b> We use security measures to protect your information, but no method is completely secure.
              </p>

              <p>
             <b>6. Your Choices:</b> Opt-Out: Unsubscribe from promotional emails.
Access and Update: Contact us to update your info.
Delete: Request deletion of your info.
              </p>
</p>
          </div>
          </div>          
            </Layout>      
    )
}
export default  Policy;