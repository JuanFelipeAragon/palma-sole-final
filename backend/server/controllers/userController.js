import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const registerUser = async (req, res) => {
    try {
        const { first_name,last_name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ first_name,last_name, email, password: hashedPassword });

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Registration failed" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = { _id: user._id, email: user.email }; // Customize payload as needed
        const token = jwt.sign(payload, process.env.JWT_SECRET || "defaultSecret", { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed" });
    }
};


// Get a single User by ID
const getUser = async (req, res) => {
    try {
        const id = req.params.userID;
        const UserFound = await User.findById(id);
        res.json(UserFound);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const sendEmail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "juanfelipearagon06@gmail.com",
                pass: "sjlm nvmg sheo kccx"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: "juanfelipearagon06@gmail.com",
            to: "juanfelipearagon06@gmail.com",
            subject: "Hello from PalmaSole!",
            text: "This is an email generated from the backend!"
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
};


const uploadFile = (req, res) => {
    console.log(req.file.filename);
    console.log(req.body);

    res.json("uploadFile");
}



export { registerUser, loginUser, getUser, sendEmail,uploadFile};
