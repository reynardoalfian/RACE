const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("/config/database");

const User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    }
});

// Function to create default admin if it doesn't exist
const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ where: { role: "admin" } });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash("Admin1234", 10);
            await User.create({
                email: "admin@example.com",
                password: hashedPassword,
                isApproved: true,
                role: "admin"
            });
            console.log("Default admin account created: admin@example.com");
        } else {
            console.log("ℹ️ Admin account already exists.");
        }
    } catch (error) {
        console.error("Error creating admin account:", error);
    }
};

// Sync database & create default admin
sequelize.sync()
    .then(() => {
        console.log("✅ Database & User table initialized");
        createDefaultAdmin(); //Automatically create admin
    })
    .catch((err) => console.error("Database Sync Error:", err));

module.exports = User;
