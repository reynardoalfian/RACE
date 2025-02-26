const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
require("dotenv").config();

// Middleware to check admin role
const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminUser = await User.findByPk(decoded.userId);

        if (!adminUser || adminUser.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = adminUser;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error });
    }
};

// ✅ Route: Approve user (Admins only)
router.put("/approve-user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.isApproved = true;
        await user.save();

        res.json({ message: "User approved successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


// ✅ Route: Promote user to admin (Admins only)
router.put("/make-admin/:id", verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.role = "admin";
        await user.save();

        res.json({ message: "User promoted to admin", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Route: Get all pending users (Admins only)
router.get("/pending-users", verifyAdmin, async (req, res) => {
    try {
        const users = await User.findAll({ where: { isApproved: false } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).json({ message: "User not found" });
        if (!user.isApproved) return res.status(403).json({ message: "Your account is pending admin approval." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, message: "Login successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("📥 Received registration request:", email, password); // Log received data

        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            email,
            password: hashedPassword, // ✅ Ensure password is hashed
            isApproved: false
        });

        console.log("✅ User created:", user.email); // Log stored data

        res.status(201).json({ message: "Registration successful. Waiting for admin approval." });

    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
