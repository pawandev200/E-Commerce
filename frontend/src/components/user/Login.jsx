import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

// Login component for user authentication
const Login = () => {
  // Accessing the login function from the global context
  const { login } = useContext(AppContext);
  
  // Hook for navigating to different routes programmatically
  const navigate = useNavigate();

  // State to manage form data (email and password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handler to update form data as the user types
  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Destructuring email and password from formData for easy access
  const { email, password } = formData;

  // Handler for form submission
  const submitHandler = async (e) => {
    e.preventDefault();  // Preventing the default form submission behavior

    // Attempting to log in with the provided credentials
    const result = await login(email, password);

    // If login is successful, navigate to the home page
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <>
      {/* Container for the login form */}
      <div
        className="container my-5 p-4"
        style={{
          width: "600px",
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">User Login</h1>

        {/* Login form */}
        <form onSubmit={submitHandler} className="my-3">
          
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
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
