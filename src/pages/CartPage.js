import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../Component/Layout/Layout";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");  
  const navigate = useNavigate();

  const handleOrderPlacement = () => {
    setLoading(true);

    // Simulate order placement
    setTimeout(() => {
      setLoading(false);
      alert("Order placed successfully!");
      setCart([]); // Reset the cart after placing the order
      localStorage.removeItem("cart"); // Remove the cart from local storage
    }, 1000); // Simulate a 1-second delay before showing the alert
  };

  // Function to update quantity
  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((p) =>
        p._id === productId
          ? { ...p, quantity: newQuantity < 1 ? 1 : newQuantity }  
          : p
      )
    );
  };

  // Total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const myCart = cart.filter(item => item._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "HELLO GUEST"
                : `Hello!  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"150px"}
                    />
                  </div>
                  <div className="col-md-4 mt-4 product-summary">
                    <p>{p.name}</p>
                    <p className="product-description">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="product-price">
                      Price: ${p.price * p.quantity} {/* Total price for this item */}
                    </p>
                  </div>
                  <div className="col-md-4 mt-5">
                    <div className="quantity-control">
                      <button
                        className="btn btn-secondary"
                        onClick={() => updateQuantity(p._id, p.quantity - 1)}
                        disabled={p.quantity === 1}  
                      >
                        -
                      </button>
                      <span className="quantity">
                        {p.quantity}
                      </span>
                      <button
                        className="btn btn-secondary"
                        onClick={() => updateQuantity(p._id, p.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-6 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <button
                      className="make btn btn-primary"
                      onClick={handleOrderPlacement}
                      disabled={loading || !address}  
                    >
                      {loading ? "Processing ...." : "Place Order"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
