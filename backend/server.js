import express from 'express';
import  dotenv  from 'dotenv';
import bodyParser from 'express';
import connectToMongoDB from './db/connectToMongoDB.js';
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import paymentRouter from './Routes/payment.js'
import cors from 'cors';
const PORT = process.env.PORT || 3000 ;
dotenv.config();   // To initialize the dotenv function 

const app = express();

app.use(bodyParser.json())

app.use(cors({
  origin:true,
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))

// home testing route
app.get('/',(req,res)=>res.json({messge:'This is home route'}))

// user Router
app.use('/api/user',userRouter)

// // product Router
app.use('/api/product',productRouter)

// // cart Router
app.use('/api/cart',cartRouter)

// address Router
app.use('/api/address',addressRouter)

// payment Router
app.use('/api/payment',paymentRouter)

app.listen(PORT, () => {
    connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});