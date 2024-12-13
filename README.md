# 🌟 E-Commerce Application
Discover the seamless shopping experience with this E-Commerce Application!

## Overview
The E-Commerce application is a user-friendly platform designed to deliver a seamless shopping experience. Users can search, filter, and purchase products efficiently. This application leverages the MERN stack for full-stack development and includes advanced features like payment processing and user authentication.

## Tech Stack
- **Frontend**: React.js, Bootstrap for responsive and reusable UI components
- **Backend**: Node.js, Express.js for server-side logic and API management
- **Database**: MongoDB for storing user, product, and order data
- **Payment Processing**: Razorpay for secure transactions
- **State Management**: React Context API for global state sharing

---

## 🔧 Features

### User-Facing Features:
1. **Authentication & Authorization**:
   - Secure login system using JSON Web Tokens (JWT)
  
2. **Search and Filter Products**:
   - Search by name or filter by categories and price
   - Simplifies product discovery for a personalized shopping experience

3. **Add-to-Cart Functionality**:
   - Add products to the cart
   - Increase or decrease item quantity
   - Remove unwanted items and review selections

4. **Profile Page**:
   - View order history
   - Track past purchases

5. **Payment Integration with Razorpay**:
   - Provides multiple payment options
   - Ensures high security and reliability


---


## 🚀 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory**:
   ```bash
   cd ecommerce-application
   ```
3. **Install dependencies for both frontend and backend**:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. **Create a `.env` file in the backend directory** and add the following:
   ```env
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   RAZORPAY_KEY=<your-razorpay-key>
   RAZORPAY_SECRET=<your-razorpay-secret>
   ```
5. **Start the backend server**:
   ```bash
   cd backend
   npm start
   ```
6. **Start the frontend server**:
   ```bash
   cd frontend
   npm start
   ```
7. **Access the application**:
   Open your browser and visit [http://localhost:5173/](http://localhost:5173/).

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

🌟 Experience the future of online shopping with this cutting-edge E-Commerce Application! Start your journey now! 🌟



