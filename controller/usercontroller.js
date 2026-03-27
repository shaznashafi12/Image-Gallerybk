import User from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const add = async (req, res) => {
  try {
    const { _id, ...cleanData } = req.body;

    const newUser = new User(cleanData);
    const response = await newUser.save();

    res.json(response);
    console.log(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don't send passwords
    res.status(200).json(users);
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
 
export const register=async(req,res)=>{
  try{
    const existingemail=await User.findOne({email:req.body.email});
    if(existingemail){
      return res.status(400).json('mail already exist')

    }
    const hashedpassword=await bcrypt.hash(req.body.password,10)
    console.log(hashedpassword);
    const userData={...req.body,password:hashedpassword}

    const newUser=await new User(userData)
    const saveduser=await newUser.save()
    return res.json(saveduser)
    
  }
  catch(e){
    console.error(e);
    return res.status(500).json({message:"error occured during register"})
  }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchedpassword = await bcrypt.compare(password, user.password);
    if (!matchedpassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

const token = jwt.sign(
  {
    userId: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);  
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
