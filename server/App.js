const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(
    cors({
        origin:[
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            process.env.CLIENT_URL
        ],
        credentials:true
    })
);


app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/",(req,res)=>{

    res.json({
        success:true,
        message:"Ticket QR API Running"
    });

});

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("MongoDB Connected");

})
.catch((error)=>{

    console.log(error);

});

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on ${PORT}`
    );

});