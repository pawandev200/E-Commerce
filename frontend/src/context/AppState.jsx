import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
    // const url = "http://localhost:3000/api"; // Base URL for API endpoints
    const url = "https://e-commerce-server-z7o2.onrender.com/api";
    
  
    // State variables to manage application data
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [user, setUser] = useState();
    const [cart, setCart] = useState([]);
    const [reload, setReload] = useState(false);
    const [userAddress, setUserAddress] = useState("");
    const [userOrder, setUserOrder] = useState([]);

  // Effect to fetch products and user data when token or reload state changes
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.products);
      setProducts(api.data.products); // Set products state
      setFilteredData(api.data.products); // Set filtered data for potential searching/filtering
      userProfile(); // Fetch user profile
    };
    fetchProduct();
    userCart(); // Fetch user cart data
    getAddress(); // Fetch user address data
    user_Order(); // Fetch user order data
  }, [token, reload]);
  

  // Effect to check for existing token in local storage on component mount
  useEffect(() => {
    let lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken); // Set token state from local storage
      setIsAuthenticated(true); // Set user as authenticated
    }
  }, []);

  // Function to register a new user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data; // Return API response data
  };

  // Function to login an existing user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setToken(api.data.token); // Set token state
    setIsAuthenticated(true); // Set user as authenticated
    localStorage.setItem("token", api.data.token); // Store token in local storage
    return api.data; // Return API response data
  };

  // Function to logout the current user
  const logout = () => {
    setIsAuthenticated(false); // Set user as not authenticated
    setToken(" "); // Clear token state
    localStorage.removeItem("token"); // Remove token from local storage
    toast.success("Logout Successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // user profile: Function to fetch the user profile data
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("user profile ",api.data);
    setUser(api.data.user);
  };



  // Add to Cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    // console.log("product id = ", productId);
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc }, // Product details to add to cart
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token, // Authorization token for user authentication
        },
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    setReload(!reload); // Triggers a re-render to update the cart view/length of items on cart icon
    toast.success(api.data.message, { // Displays a success message upon adding to cart
      position: "top-right",
      autoClose: 1500, // Closes the toast notification automatically after 1.5 seconds
      hideProgressBar: false, // Shows the progress bar in the toast notification
      closeOnClick: true, // Allows the toast to be dismissed by clicking
      pauseOnHover: true, // Pauses the timer when the mouse hovers over the toast
      draggable: true, // Allows the toast to be draggable
      progress: undefined,
      theme: "dark",
      transition: Bounce, // Bounce effect for the toast notification
    });
  };

  // Get User's Cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token, // Authorization token for user authentication
      },
      withCredentials: true, // Ensures cookies are sent with the request
    });
    setCart(api.data.cart); // Sets the cart data in the state
  };

  // Decrease Quantity of a Cart Item
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty }, // Product ID and quantity to decrease
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token, // Authorization token for user authentication
        },
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    setReload(!reload); // Triggers a re-render to update the cart view/length of items on cart icon
    toast.success(api.data.message, { // Displays a success message upon decreasing quantity
      position: "top-right",
      autoClose: 1500, // Closes the toast notification automatically after 1.5 seconds
      hideProgressBar: false, // Shows the progress bar in the toast notification
      closeOnClick: true, // Allows the toast to be dismissed by clicking
      pauseOnHover: true, // Pauses the timer when the mouse hovers over the toast
      draggable: true, // Allows the toast to be draggable
      progress: undefined,
      theme: "dark",
      transition: Bounce, // Bounce effect for the toast notification
    });
  };

  // Remove Item from Cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token, // Authorization token for user authentication
      },
      withCredentials: true, // Ensures cookies are sent with the request
    });
    setReload(!reload); // Triggers a re-render to update the cart view/length of items on cart icon
    toast.success(api.data.message, { // Displays a success message upon removing an item from cart
      position: "top-right",
      autoClose: 1500, // Closes the toast notification automatically after 1.5 seconds
      hideProgressBar: false, // Shows the progress bar in the toast notification
      closeOnClick: true, // Allows the toast to be dismissed by clicking
      pauseOnHover: true, // Pauses the timer when the mouse hovers over the toast
      draggable: true, // Allows the toast to be draggable
      progress: undefined,
      theme: "dark",
      transition: Bounce, // Bounce effect for the toast notification
    });
  };

  // Clear Cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token, // Authorization token for user authentication
      },
      withCredentials: true, // Ensures cookies are sent with the request
    });
    setReload(!reload); // Triggers a re-render to update the cart view
    toast.success(api.data.message, { // Displays a success message upon clearing the cart
      position: "top-right",
      autoClose: 1500, // Closes the toast notification automatically after 1.5 seconds
      hideProgressBar: false, // Shows the progress bar in the toast notification
      closeOnClick: true, // Allows the toast to be dismissed by clicking
      pauseOnHover: true, // Pauses the timer when the mouse hovers over the toast
      draggable: true, // Allows the toast to be draggable
      progress: undefined,
      theme: "dark",
      transition: Bounce, // Bounce effect for the toast notification
    });
  };

  // Add Shipping Address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber }, // Shipping address details
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token, // Authorization token for user authentication
        },
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    setReload(!reload); // Triggers a re-render to update the address view
    toast.success(api.data.message, { // Displays a success message upon adding the address
      position: "top-right",
      autoClose: 1500, // Closes the toast notification automatically after 1.5 seconds
      hideProgressBar: false, // Shows the progress bar in the toast notification
      closeOnClick: true, // Allows the toast to be dismissed by clicking
      pauseOnHover: true, // Pauses the timer when the mouse hovers over the toast
      draggable: true, // Allows the toast to be draggable
      progress: undefined,
      theme: "dark",
      transition: Bounce, // Bounce effect for the toast notification
    });
    return api.data; // Return the API response data
  };

  // Get User's Latest Address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token, // Authorization token for user authentication
      },
      withCredentials: true, // Ensures cookies are sent with the request
    });
    setUserAddress(api.data.userAddress); // Sets the user's address data in the state
  };

  // Get User's Order History
  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token, // Authorization token for user authentication
      },
      withCredentials: true, // Ensures cookies are sent with the request
    });
    setUserOrder(api.data); // Sets the user's order data in the state
  };

  // console.log("user order = ", userOrder); // Logs the user's order data to the console


  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
