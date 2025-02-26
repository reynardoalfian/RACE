const { Sequelize } = require("sequelize");

// Initialize SQLite database
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false // Disable logs for cleaner console output
});

// Test database connection
sequelize.authenticate()
    .then(() => console.log("SQLite Database Connected"))
    .catch((err) => console.error("Database Connection Error:", err));

module.exports = sequelize;
