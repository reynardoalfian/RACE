const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Ensure that authRoutes is a Router instance
if (typeof authRoutes === "function") {
    app.use("/api", authRoutes);
} else {
    console.error(" authRoutes is not a valid middleware function. Check your exports.");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
