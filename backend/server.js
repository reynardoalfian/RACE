const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// Routes
app.use("/api", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
