const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error("Database connection failed:", err);
  else console.log("Connected to MySQL Database!");
});

app.post("/api/signup",(req,res) =>{
  const { username, email, userpassword, role } = req.body;
  db.query("INSERT INTO user (username, email, userpassword, role) VALUES(?,?,?,?) ",
  [username, email, userpassword, role], (err, result) =>{
    if(err) {
      console.log("error", err);
      return res.status(500).json({ message: "Error occured during signup user"});
    }
    res.json({
      message: "User created Successfully"
    });  
  });
});

app.post("/api/login", (req, res) => {
  const { email, userpassword } = req.body;

  if (!email || !userpassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query("SELECT * FROM user WHERE email = ? AND userpassword = ?", [email, userpassword], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  });
});


app.get("/api/students", (req, res) => {
  db.query("SELECT * FROM student", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});


app.get("/api/instructors", (req, res) => {
  db.query("SELECT * FROM instructor", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

app.post("/api/instructors", (req, res) => {
  const { ID,name, dept_name, salary } = req.body;
  db.query("INSERT INTO instructor (ID,name, dept_name, salary) VALUES (?,?, ?, ?)", 
  [ID,name, dept_name, salary], (err, result) => {
    if (err) return res.status(500).json({ message: "Error adding Instructor" });
    res.json({ message: "Instructor added successfully", instructorID: result.insertId });
  });
});

// Delete an instructor
app.delete("/api/instructors/:id", (req, res) => {
  db.query("DELETE FROM instructor WHERE ID = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting instructor" });
    res.json({ message: "Instructor deleted successfully" });
  });
});

app.get("/api/courses", (req, res) => {
  db.query("SELECT * FROM course", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

app.post("/api/students", (req, res) => {
  const { name, dept_name, tot_cred } = req.body;
  db.query("INSERT INTO student (name, dept_name, tot_cred) VALUES (?, ?, ?)", 
  [name, dept_name, tot_cred], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json(
        { 
          message: "Error adding student" 
        });
    }
      
    res.json({ message: "Student added successfully", studentID: result.insertId });
  });
});

app.post("/api/courses", (req, res) => {
  const {course_id,title, dept_name, credits } = req.body;
  db.query(
    "INSERT INTO course (course_id,title, dept_name, credits) VALUES (?, ?, ?, ?)",
    [course_id,title, dept_name, credits],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error adding course" });
      res.json({ message: "Course added successfully", courseID: result.insertId });
    }
  );
});

app.post("/api/departments", (req, res) => {
  const { dept_name,building,budget } = req.body;
  db.query(
    "INSERT INTO department(dept_name,building,budget ) VALUES ( ?, ?, ?)",
    [dept_name,building,budget],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error adding department" });
      res.json({ message: "department added successfully", departmentID: result.insertId });
    }
  );
});

// Delete a department
app.delete("/api/departments/:dept_name", (req, res) => {
  db.query("DELETE FROM department WHERE dept_name = ?", [req.params.dept_name], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting department" });
    res.json({ message: "Department deleted successfully" });
  });
});

// Delete a course
app.delete("/api/courses/:course_id", (req, res) => {
  const course_id = req.params.course_id;
  db.query("DELETE FROM course WHERE course_id = ?", [course_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting course" });
    res.json({ message: "Course deleted successfully" });
  });
});



app.put("/api/students/:id", (req, res) => {
  const { name, dept_name, tot_cred } = req.body;
  db.query("UPDATE student SET name = ?, dept_name = ?, tot_cred = ? WHERE ID = ?", 
  [name, dept_name, tot_cred, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error updating student" });
    res.json({ message: "Student updated successfully" });
  });
});

app.delete("/api/students/:id", (req, res) => {
  db.query("DELETE FROM student WHERE ID = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting student" });
    res.json({ message: "Student deleted successfully" });
  });
});

app.get("/api/sections", (req, res) => {
  db.query("SELECT * FROM section", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

app.get("/api/timeslots", (req, res) => {
  db.query("SELECT * FROM time_slot", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

app.get("/api/departments", (req, res) => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

app.get("/api/courses", (req, res) => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});