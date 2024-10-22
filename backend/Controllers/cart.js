import { Cart } from "../Models/Cart.js";

// add To Cart

// The main objective is to either create a new cart for the user if they
//  don't already have one, or update the existing cart with new items or adjust
//   quantities if the item is already in the cart.
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;

  const userId = req.user;  //from the authenctication/token

  let cart = await Cart.findOne({ userId }); //retrieving the cart associated with this user's ID,
// if user doesn't have an existing cart,creates a new one.
  if (!cart) cart = new Cart({ userId, items: [] }); 

  // if user have existing cart then update(inc qty & price or add new product) the cart
  const itemIndex = cart.items.findIndex(   //to check item already in the cart or not, returns idx of items or -1
    (item) => item.productId.toString() === productId
  );
// if Item Exists: Update Quantity and Price else push the item to cart 
  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty; 
  } else {
    cart.items.push({ productId, title, price, qty, imgSrc });
  }
// The cart is then saved back to the database, and a confirmation response is sent to the client.
  await cart.save();
  res.json({ message: "Items Added To Cart", cart });
};

// get User Cart
export const userCart = async (req,res) =>{
   const userId = req.user;
   
   let cart = await Cart.findOne({userId});
   if(!cart) return res.json({messge:'Cart not found'})

    res.json({message:"user cart",cart})
}

// remove product from cart
export const removeProductFromCart = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ messge: "Cart not found" });

// If the cart exists, remove the product with this product id 
//filter method is used to create a new array of items that excludes the product with the matching productId
  cart.items = cart.items.filter((item)=>item.productId.toString() !== productId)

  await cart.save();

  res.json({ message: "product remove from cart"});
};


// clear cart
export const clearCart = async (req, res) => {

  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart){
    cart = new Cart({items:[]})
  } else{
    cart.items = [];
  }
  
  await cart.save();

  res.json({ message: " cart cleared"});
};


// decrease qty from Cart
export const decreaseProudctQty = async (req, res) => {
  const { productId, qty} = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });
 
  if (!cart) {
    cart = new Cart({ userId, items: [] });  // Create new cart if not exist with empty items
    // return res.json({messge:'Cart not find'})
  }

  // Find index of product in cart
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

if (itemIndex > -1) { // If item found in cart
    const item = cart.items[itemIndex]

    // Decrease Quantity or Remove Item:
    if(item.qty > qty){ // If sufficient quantity exists: dec qty and price of the items
        const pricePerUnit = item.price/item.qty
        item.qty -= qty
        item.price -= pricePerUnit*qty
    }else{   // Remove item if quantity to decrease is greater or equal than current quantity
        cart.items.splice(itemIndex,1)   // removed from the cart using splice
    }

} else {  // Return message if product not found
    return res.json({messge:'invalid product Id'})
  } 

  await cart.save();
  res.json({ message: "Items qty decreased", cart });
};