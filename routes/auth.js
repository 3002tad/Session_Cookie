const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ error: "Invalid username or password" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ error: "Invalid username or password" });

  // Lưu userId vào session
  req.session.userId = user._id;

  // Set signed cookie
  res.cookie("sid", user._id.toString(), {
    httpOnly: true,
    signed: true,
    maxAge: 1000 * 60 * 60, // 1h
  });

  res.json({ message: "Login successful" });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Could not log out" });

    // xoá cookie connect.sid (session cookie mặc định)
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: false, // phải trùng với config trong server.js
      path: "/",     // mặc định là /
    });

    // Xoá luôn cookie tuỳ chỉnh 'sid' (đang là signed cookie lưu userId)
    // Cần khớp các tuỳ chọn khi set cookie để xoá đúng
    res.clearCookie("sid", {
      httpOnly: true,
      signed: true,
      secure: false,
      path: "/",
    });

    res.json({ message: "Logout successful" });
  });
});

// Middleware to check auth
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Protected route
router.get("/profile", requireAuth, async (req, res) => {
  const user = await User.findById(req.session.userId).select("-password");
  res.json(user);
});

module.exports = router;