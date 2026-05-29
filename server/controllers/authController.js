import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const {email, password, role_type} = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if(role_type === "admin" && user.role !== "ADMIN") {
            return res.status(401).json({ message: "Access denied. Admins only." });
        }

        if(role_type === "employee" && user.role !== "EMPLOYEE") {
            return res.status(401).json({ message: "Access denied. Employees only." });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"});

        return res.json({user: payload,token});
    }catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Failed to login" });
    }
};

export const session = (req, res)=> {
    const session = req.session;
    return res.json({user: session});
}

export const changePassword = async (req, res) => {
    try {
        const session = req.session;
        const {oldPassword, newPassword} = req.body;
        if(!oldPassword || !newPassword) return res.status(400).json({message: "Both password are required"});

        const user = await User.findById(session.userId);
        if(!user) return res.status(404).json({message: "User not found"});

        const isValid = await bcrypt.compare(oldPassword, user.password);
        if(!isValid) return res.status(400).json({message: "Old password is incorrect"});

        const hashed = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(session.userId, {password: hashed})

        return res.json({success: true});
    }catch (error) {
        return res.status(500).json({error: "Failed to change password"});
    }

}

