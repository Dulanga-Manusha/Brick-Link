import userModel from "../models/userModel.js"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from "dotenv/config";


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await userModel.findOne({ email});
        
        //if user not found
        if(!user){
            return res.json({success: false, message: "User not found"});
        }
        //if password is incorrect
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: "Incorrect password"});
        }
        //if user found and password is correct
        const token = createToken(user._id,user.role);
        res.json({success: true, token});

    }catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const createToken = (id, role) => {
    return jwt.sign({ id, role }, "secret_key");  // Include role in token
}

// register user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;  // Added role here
    try {
        // checking if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: "User already exists" })
        }
        // validating email & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password should be at least 8 characters" })
        }

        // user password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            role: role  // Assign the role here
        });
        // save to database
        const user = await newUser.save();
        const token = createToken(user._id, user.role);  // Include role in token
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser}