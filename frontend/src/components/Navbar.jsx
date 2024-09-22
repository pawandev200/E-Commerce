import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
    // State to manage the search input value
    const [searchTerm, setSearchTerm] = useState(" ");
    
    // Hook to navigate programmatically
    const navigate = useNavigate();
    
    // Hook to get the current route location
    const location = useLocation();
  
    // Destructure values from AppContext to use in the component
    const { setFilteredData, products, logout, isAuthenticated, cart } =
      useContext(AppContext);
  
  // console.log("user cart = ",cart)

  // Function to filter products by category
  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() === cat.toLowerCase()
      )
    );
  };

  // Function to filter products by price
  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price <= price));
  };

  // Function to handle the search form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent the default form behavior
    navigate(`/product/search/${searchTerm}`); // Navigate to the search results page
    setSearchTerm(" "); // Reset the search term
  };

  return (
    <> 
       {/* JSX Structure - Main Navbar */}
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}  //after clicking e commerece redirect to home page
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>E - Commerce</h3>
          </Link>
          {/* search bar  */}
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>{" "}
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
              
            />
          </form>
 
        {/* Authenticated User Actions */}
          <div className="right">
             {/* Show these options if the user is authenticated */}
            {isAuthenticated && (
              <>
                    {/* Link to the cart page with item count badge */}
                <Link            
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
            {/* Display the cart item count if items are present */}
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}  {/* showing the cart_length on cart icon */}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>
               {/* Link to the user profile page */}
                <Link to={"/profile"} className="btn btn-info mx-3">
                  profile
                </Link>

                {/* Logout button to sign out the user */}
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();    // Call logout function
                    navigate("/"); // Navigate to the home page
                  }}
                >
                  logout
                </button>
              </>
            )}


        {/* Show these options if the user is not authenticated */}
            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  register
                </Link>
              </>
            )}
          </div>
        </div>


   {/* Conditional Sub-Navbar: Conditionally render the sub-navbar only on the home page */}
        {location.pathname == "/" && (  // if homepage then only show the subnavbar
          <div className="sub_bar">
            <div className="items" onClick={() => setFilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterbyCategory("Mobile")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterbyCategory("Laptop")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterbyCategory("Camera")}>
              Camera's
            </div>
            <div
              className="items"
              onClick={() => filterbyCategory("headphones")}
            >
              Hedphones
            </div>
            {/* Filter by price options */}
            <div className="items" onClick={() => filterbyPrice(15999)}>
              15999
            </div>
            <div className="items" onClick={() => filterbyPrice(25999)}>
              25999
            </div>
            <div className="items" onClick={() => filterbyPrice(49999)}>
              49999
            </div>
            <div className="items" onClick={() => filterbyPrice(79999)}>
              79999
            </div>
            <div className="items" onClick={() => filterbyPrice(99999)}>
              99999
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;