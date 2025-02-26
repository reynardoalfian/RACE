const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
require("dotenv").config();

// ✅ Middleware: Verify JWT and Admin Role
const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error });
    }
};

const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.userId);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Route: Approve User (Admins only)
router.put("/approve-user/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isApproved = true;
        await user.save();

        res.json({ message: `✅ User ${user.email} approved successfully`, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Route: Promote User to Admin (Admins only)
router.put("/make-admin/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.role = "admin";
        await user.save();

        res.json({ message: `✅ User ${user.email} is now an admin`, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Route: Get All Pending Users (Admins only)
router.get("/pending-users", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.findAll({ where: { isApproved: false } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Route: Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (!user.isApproved) return res.status(403).json({ message: "Your account is pending admin approval." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" } // Increased expiration for usability
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                isApproved: user.isApproved
            },
            message: "✅ Login successful"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Route: Register User
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("📥 Received registration request:", email); // Log received data

        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            email,
            password: hashedPassword, // ✅ Securely store hashed password
            isApproved: false
        });

        console.log(`✅ User ${user.email} registered and pending approval`); // Log stored data
        res.status(201).json({ message: "Registration successful. Waiting for admin approval." });

    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Route: Get Current User Profile (Authenticated Users)
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId, { attributes: { exclude: ["password"] } });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Route: Logout User (Client-Side Only)
router.post("/logout", (req, res) => {
    // Logout is handled on frontend by removing the token
    res.json({ message: "✅ Logged out successfully" });
});

module.exports = router;
