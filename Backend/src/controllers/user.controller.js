import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
const registerUser = async(req,res) =>{
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(404).json({message: "All fields must be fill!!"})
        }

        const existing = await User.findOne({email : email.toLowerCase()})

        if(existing) {
            return res.status(400).json({message: "User already exist!!"})
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn : false
        })

        res.status(201).json(
            {message: "User registered",
            user:{
            id: user._id,
            email: user.email,
            username: user.username}
        })
    } catch (error) {
        res.status(500).json(
            {message: "Internal server error",
             error: error.message
            })
    }
}

const loginUser = async(req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user){
            return res.status(400).json({
                message: "User not found!!"
            })
        }
        //Compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid crudential"})
        }
        else{
            return res.status(201).json(
                {
                    message: "User logged!!",
                    user: {
                        id: user._id,
                        email: user.email,
                        username: user.username,
                    }
                }
            )
        }
    } 
    catch (error) {
        console.log(error);
        
        res.status(500).json({message: "Internal server error!!"})
    }    
}

const logoutUser = async(req, res) =>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({message: "User not found"});

        res.status(200).json({message: "Logout sucessfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error!!", error})
        
    }
}

export{
    registerUser,
    loginUser,
    logoutUser
}