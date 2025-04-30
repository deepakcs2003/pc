const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result && result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role],
        (err, insertResult) => {
          if (err) {
            return res.status(500).json({ message: "Database error", error: err });
          }
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    } catch (error) {
      return res.status(500).json({ message: "Error hashing password", error });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (!result || result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token,
        role: user.role,
        name: user.name,
        email: user.email,
        message: "Login successful",
      });
    } catch (error) {
      return res.status(500).json({ message: "Error verifying password", error });
    }
  });
};
