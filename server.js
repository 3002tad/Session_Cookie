const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser("supersecret")); // parse signed cookies

// Session setup
app.use(
  session({
    secret: "supersecret", // cố định, không dùng biến môi trường
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/authdb",}),
    cookie: {
      httpOnly: true,
      secure: false, // để true nếu chạy HTTPS
      maxAge: 1000 * 60 * 60, // 1h
    },
  })
);

// Routes
app.use("/auth", authRoutes);

// Connect DB and start server
mongoose
  .connect("mongodb://127.0.0.1:27017/authdb")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () =>
      console.log("Server running on http://localhost:3000")
    );
  })
  .catch((err) => console.error(err));