const express = require('express')
const cors = require('cors')
const app = express();
const connectToMongo = require("./db/db")
// const { readdirSync } = require('fs');
const router = require('express').Router();
// const path = require('path')


require("dotenv").config();

const PORT = 5000

// middleware

app.use(cors());
app.use(express.json());

// routes

app.use('/api/transactions', require("./routes/transaction"))
app.use('/api/auth', require('./routes/user'));

// app.get("/", (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
// })


const server = () => {
    connectToMongo()
    app.listen(PORT, () => {
        console.log("listening on port :", PORT)
    });
}

server();


