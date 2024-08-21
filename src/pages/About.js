import React from "react";
import Layout from "../Component/Layout/Layout";
const About=()=>
{
    return(
      <Layout title={'About Us - Luna Times'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img 
          src="images/images/2.png"
          alt=""
          style={{width: "100%"}}
        />
        </div>
        <div className="col-md-6">
          <h1 className="abt"><b>About Us</b></h1>
          
          <p className="text1">
          <p>Welcome to LUNA SHOP, where time meets style and sophistication. At LUNA SHOP, we're passionate about watches, 
          and our mission is to bring you the finest timepieces from around the world, curated with precision and care.</p><br></br>
          
          <p>Established with a vision to redefine the way you perceive watches, LUNA SHOP is more than just a marketplace;
          it's a destination for watch enthusiasts and connoisseurs alike. Whether you're seeking a classictimepiece 
          to complement your formal attire or a statement watch to elevate your everyday look, we've got you covered.</p><br></br> 

          <p>Our collection features an exquisite range of watches meticulously selected to cater to diverse tastes and preferences.
          From timeless classics to cutting-edge designs, each watch in our inventory embodies exceptional craftsmanship, quality, 
          and attention to detail.Thank you for considering LUNA SHOP for your timepiece needs. We're honored to be a part of your journey through time. </p>
          </p>
         
        </div>
        </div>          
        </Layout>      
    )
}
export default About;