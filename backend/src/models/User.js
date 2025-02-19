const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");

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
        defaultValue: false // User needs admin approval
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user" // Default role
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10); // Hash password before saving
        }
    }
});

// Sync database & create tables if they don’t exist
sequelize.sync()
    .then(() => console.log("✅ Database &) tables created"))
