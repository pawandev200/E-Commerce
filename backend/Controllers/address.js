import { Address } from "../Models/Address.js";

// Add a new address for the authenticated user: 
// The function takes the user's address details from the request body and associates them
//  with the user in the database.

export const addAddress = async (req, res) => {
  let { fullName, address, city, state, country, pincode, phoneNumber } = req.body;
  let userId = req.user;  // Get the authenticated user's ID
  // Create and save the new address in the database
  let userAddress = await Address.create({
    userId,
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  });
  res.json({ message: "Address added", userAddress,success:true });
};

// Retrieve the most recent address for the authenticated user
export const getAddress = async (req,res)=>{
    // Find all addresses for the user, sorted by creation date (most recent first)
    let address = await Address.find({userId:req.user}).sort({createdAt:-1})
    res.json({message:'address', userAddress:address[0]})
}
