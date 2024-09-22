import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

// Register component for new user registration
const Register = () => {
  // Accessing the register function from the global context
  const { register } = useContext(AppContext);

  // Hook for navigating to different routes programmatically
  const navigate = useNavigate();

  // State to manage form data (name, email, password)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handler to update form data as the user types
  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Destructuring name, email, and password from formData for easy access
  const { name, email, password } = formData;

  // Handler for form submission
  const submitHandler = async (e) => {
    e.preventDefault();  // Preventing the default form submission behavior

    // Attempting to register with the provided credentials
    const result = await register(name, email, password);

    // If registration is successful, navigate to the login page
    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <>
      {/* Container for the registration form */}
      <div
        className="container my-5 p-4"
        style={{
          width: "600px",
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">User Register</h1>

        {/* Registration form */}
        <form onSubmit={submitHandler} className="my-3">
          
          {/* Name input field */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={onChangerHandler}
              type="text"
              className="form-control"
              id="exampleInputEmail13"
              aria-describedby="emailHelp"
            />
          </div>

          {/* Email input field */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={onChangerHandler}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          {/* Password input field */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={onChangerHandler}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          {/* Submit button */}
          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
