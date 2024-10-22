import express from 'express'

import {addToCart} from "../Controllers/cart.js";
import {clearCart} from "../Controllers/cart.js";
import {removeProductFromCart} from "../Controllers/cart.js";
import {userCart} from "../Controllers/cart.js";
import {decreaseProudctQty} from "../Controllers/cart.js";
// import {
//   addToCart,
//   clearCart,
//   removeProductFromCart,
//   userCart,
//   decreaseProudctQty,
// } from "../Controllers/cart.js";

import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();

// add To cart
router.post('/add',Authenticated,addToCart)

// get User Cart
router.get("/user", Authenticated, userCart);

// remove product from cart
router.delete("/remove/:productId", Authenticated, removeProductFromCart);

// clear cart
router.delete("/clear", Authenticated, clearCart);

// decrease items qty
router.post("/--qty", Authenticated, decreaseProudctQty);


export default router;