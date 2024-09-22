import React, { useContext } from "react"; 
import { useState } from "react"; 
import AppContext from "../context/AppContext"; 
import { useNavigate } from "react-router-dom"; 

// The Address component allows the user to input and submit their shipping address
const Address = () => {
  // Extracting the shippingAddress functions and userAddress state from AppContext using the useContext hook
  const { shippingAddress, userAddress } = useContext(AppContext);

  // useNavigate is a hook that allows navigation between different routes in the application
  const navigate = useNavigate();  // used when need to navigate to this page to another pages

  // created a local state formdata using useState hook to manage the form fields (fullName, address, city, state, country, pincode, and phoneNumber)
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  // Event handler to update the formdata state when the user types something in input fields
  const onChangerHandler = (e) => { // this will execute after each input is filled 
    const { name, value } = e.target;
    // Spread operator (...) to retain the current form data while updating the specific field that changed
    setFormData({ ...formData, [name]: value });
  };
  // Destructuring the formData state to use these variables directly
  const { fullName, address, city, state, country, pincode, phoneNumber } = formData;


// Event handler for the form submission: creating address basend on user's input and navigating to checkout pages
  const submitHandler = async (e) => { // this will execute after from submission, submit button clicked then executed
    e.preventDefault(); 
    // Calls the shippingAddress function from the context with the form data
    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );
    // If the address submission is successful, navigate to the checkout page
    if (result.success) {
      navigate("/checkout");
    }
    // Resets the form fields to empty after submission, for next use 
    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });

    // Logs the form data (for debugging purposes)
    // console.log(formData);
  };


  return (
    <>
      <div
        className="container my-3 p-4"
        style={{
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        {/* Title of the form */}
        <h1 className="text-center">Shipping Address</h1>
        
        {/* Form for inputting shipping address */}
        <form onSubmit={submitHandler} className="my-3">
          <div className="row">
            <div className="mb-3 col-md-4 ">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail13"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-4 ">
              <label htmlFor="exampleInputEmail1" className="form-label">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail13"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Pincode
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangerHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangerHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address/Nearby
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          {/* Submit button for the form */}
          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary" 
            style={{fontWeight:'bold'}}>
              Submit
            </button>
          </div>
        </form>

{/*  if address is saved in db for the currently logged in user then only show this button */}
        {/* If user has a saved address, display a button to use it */}
        {userAddress && (
          <div className="d-grid col-6 mx-auto my-3">
            <button className="btn btn-warning"
            onClick={()=>navigate('/checkout')}  // if user click this button then navigated to checkout page
            style={{fontWeight:'bold'}}
            >Use Old Address</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Address;
