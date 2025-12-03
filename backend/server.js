const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Wellora API is running',
        timestamp: new Date().toISOString()
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
