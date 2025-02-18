const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
require("dotenv").config();


router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            email,
            password: hashedPassword,
            isApproved: false 
        });

        res.status(201).json({ message: "Registration successful. Waiting for admin approval." });

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

module.exports = router;

