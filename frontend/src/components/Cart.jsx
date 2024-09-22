import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // Destructuring context methods and state for cart operations
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart }= useContext(AppContext);
  
  // Local state to keep track of total quantity and price
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

// useEffect to calculate total quantity and price whenever the cart updates
  useEffect(() => {
    let qty = 0;
    let price = 0;
    // Check if cart items exist and calculate the totals
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty; // Summing up total quantity
        price += cart.items[i].price; // Summing up total price
      }
    }
    setPrice(price); // Setting the calculated total price to state
    setQty(qty); // Setting the calculated total quantity to state
  }, [cart]); // Dependency array ensures this runs when the cart changes

//Conditional rendering based on whether the cart is empty or has items
  return (
    <>
      {cart?.items?.length == 0 ? (  // if the cart become empty
        <>
        <div className="text-center my-5">

          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            onClick={()=>navigate('/')}  // created a button after clicking this button, Navigate to the home page
            >
            Continue Shopping...
          </button>
            </div>
        </>
      ) : (  // if the cart is not empty then calculating the total qty and price 
        <>
          <div className="my-5 text-center">
            <button
              className="btn btn-info mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
            {/* Displaying total quantity of items in the cart */}
              Total Qty : {qty}
            </button>
            <button
              className="btn btn-warning mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
            {/* Displaying total quantity of items in the cart */}
              Total Price : ₹{price} 
            </button>
          </div>
        </>
      )}


{/* Mapping over each product in the cart to display each product details */}
      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container p-3 bg-dark my-5 text-center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="cart_des">
              <h2>{product.title}</h2>
              <h4>₹{product.price}</h4>
              <h4>Qty : {product.qty}</h4>
            </div>
            <div className="cart_action">
              <button
                className="btn btn-warning mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => decreaseQty(product?.productId, 1)}   // Decrease quantity
              >
                Qty--
              </button>
              <button
                className="btn btn-info mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,  // Adjusted price for single unit
                    1,
                    product.imgSrc
                  )
                }
              >       
               {/* Increase quantity */}
                Qty++   
              </button>
              <button
                className="btn btn-danger mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  if (confirm("Are you sure, want to remove this item from cart")) {
                    removeFromCart(product?.productId);   // Remove item from cart
                  }
                }}
              >
                Remove{" "}
              </button>
            </div>
          </div>
        </div>
      ))}


{/* Checkout and Clear Cart buttons displayed if the cart has items */}
      {cart?.items?.length > 0 && (
        <div className="container text-center my-3">
          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate("/shipping")}   // Navigate to shipping page
          >
            Checkout
          </button>
          <button
            className="btn btn-danger mx-3"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              if (confirm("Are you sure, want to clear cart ...?")) {
                clearCart();  // Clear the entire cart
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;