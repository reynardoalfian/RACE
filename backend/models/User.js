const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false
});

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

sequelize.sync()
    .then(() => console.log("Database & tables created!"))
    .catch((err) => console.error("Error syncing database:", err));

module.exports = User;
