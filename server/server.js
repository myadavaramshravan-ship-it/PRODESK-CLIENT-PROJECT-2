const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-vercel-url.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());


app.get("/", (req,res)=>{
    res.json({
        success:true,
        message:"Ticket QR Generator API Running"
    });
});


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/scans", require("./routes/scanRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));


const PORT = process.env.PORT || 5000;


app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server running on port ${PORT}`);
});