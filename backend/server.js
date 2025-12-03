const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());

connectDB();

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

