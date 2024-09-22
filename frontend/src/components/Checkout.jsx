import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios"; 
import TableProduct from "./TableProduct"; // Imported to show cart info under product detail column
import { useNavigate } from "react-router-dom"; 

const Checkout = () => {
  // Extracting necessary values from the context
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);

  // useState hooks to manage local state for quantity and price of items in the cart
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  
  const navigate = useNavigate(); // useNavigate hook for navigation

  // useEffect hook to calculate the total quantity and price of items in the cart whenever the cart changes
  useEffect(() => {
    let qty = 0;
    let price = 0;
    
    // Calculate total quantity and price
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }

    // Update state with calculated values
    setPrice(price);
    setQty(qty);
  }, [cart]); // Dependencies: cart

  // Function to handle the payment process
  const handlePayment = async () => {
    try {
      // Making an API call to initiate the payment process
      const orderRepons = await axios.post(`${url}/payment/checkout`, {
        amount: price, // Total amount
        qty: qty, // Total quantity
        cartItems: cart?.items, // Cart items
        userShipping: userAddress, // User's shipping address
        userId: user._id, // User ID
      });

      // Logging the response from the order API
    //   console.log(" order response ", orderRepons);

      // Extracting order ID and amount from the response
      const { orderId, amount: orderAmount } = orderRepons.data;

      // Razorpay payment options
      var options = {
        key: "rzp_test_75fSremM9J5oKc", // Razorpay Key ID
        amount: orderAmount * 100, // Amount in currency subunits (e.g., paise for INR)
        currency: "INR", // Currency
        name: "Pawandev", // Display name
        description: "payment done!", // Description
        order_id: orderId,  // Order ID from the API response

        // Handler function to be called on successful payment
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id, // Razorpay order ID
            paymentId: response.razorpay_payment_id, // Razorpay payment ID
            signature: response.razorpay_signature, // Razorpay signature
            amount: orderAmount, // Order amount
            orderItems: cart?.items, // Ordered items
            userId: user._id, // User ID
            userShipping: userAddress, // User's shipping address
          };

          // Making an API call to verify the payment
          const api = await axios.post(`${url}/payment/verify-payment`, paymentData );

          // Logging the response from the verification API
          // console.log("razorpay res ", api.data);

          // If payment verification is successful, clear the cart and navigate to the order confirmation page
          if (api.data.success) {
            clearCart();
            navigate("/oderconfirmation");
          }
        },
        prefill: {
          name: "pawandev", // Prefill name
          email: "pawandev4691@gmail.com", // Prefill email
          contact: "1234567890", // Prefill contact number
        },
        notes: {
          address: "IIT Kharagpur", // Additional notes or address
        },
        theme: {
          color: "#3399cc", // Theme color for Razorpay checkout
        },
      };

      // Create and open the Razorpay checkout modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      // Logging any errors that occur during the payment process
      console.log(error);
    }
  };

  return (
    <>
      <div className="container  my-3">
        <h1 className="text-center">Order Summary</h1>

        {/* Table displaying the cart items and shipping address */}
        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                {/* Component to display products in the cart */}
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                {/* Displaying the user's shipping address */}
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name : {userAddress?.fullName}</li>
                  <li>Phone : {userAddress?.phoneNumber}</li>
                  <li>Country : {userAddress?.country}</li>
                  <li>State : {userAddress?.state}</li>
                  <li>PinCode : {userAddress?.pincode}</li>
                  <li>Near By : {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Button to initiate payment */}
      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Proceed To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
