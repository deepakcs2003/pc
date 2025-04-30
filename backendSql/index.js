const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: '22510097',   // New user created
  password: '22510097',  // Password for the new user
  database: 'db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// AUTH ROUTES (Signup/Login for both roles)
app.post('/signup', (req, res) => {
  const { name, email, password, role } = req.body; // role = 'student' or 'teacher'

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error. Please try again later.' });
      }
      res.status(200).json({ message: 'User created successfully' });
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
    if (results.length > 0) {
      res.status(200).json({
        message: 'Login successful',
        user: results[0]
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// TEACHER - Create Test
app.post('/create-test', (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: 'Title and questions are required. Questions must be an array.' });
  }

  db.query('INSERT INTO tests (title) VALUES (?)', [title], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to create test. Please try again later.' });
    }

    const test_id = result.insertId;
    
    const questionData = questions.map(q => [
      test_id,
      q.question_text,
      q.option_a,
      q.option_b,
      q.option_c,
      q.option_d,
      q.correct_option
    ]);

    db.query('INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES ?',
      [questionData], err2 => {
        if (err2) {
          console.error(err2);
          return res.status(500).json({ message: 'Failed to add questions to the test. Please try again later.' });
        }

        res.status(200).json({
          message: 'Test created successfully with questions',
          test: {
            title: title,
            questions: questions
          }
        });
      });
  });
});

// STUDENT - Give Test
app.post('/give-test', (req, res) => {
  const { student_id, test_id, selected_option } = req.body;

  if (!student_id || !test_id || !selected_option) {
    return res.status(400).json({ message: 'Student ID, Test ID, and selected option are required' });
  }

  db.query('INSERT INTO results (student_id, test_id, selected_option) VALUES (?, ?, ?)',
    [student_id, test_id, selected_option],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to submit test. Please try again later.' });
      }
      res.status(200).json({ message: 'Test submitted successfully' });
    });
});

// STUDENT - See Score
app.get('/score/:student_id', (req, res) => {
  db.query('SELECT * FROM results WHERE student_id = ?', [req.params.student_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching scores. Please try again later.' });
    }
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: 'No scores found for this student.' });
    }
  });
});

// STUDENT - Dashboard (number of tests given)
app.get('/dashboard/:student_id', (req, res) => {
  db.query('SELECT COUNT(*) as test_count FROM results WHERE student_id = ?', [req.params.student_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching dashboard data. Please try again later.' });
    }
    res.status(200).json(results[0]);
  });
});

// TEACHER - View students who took a test
app.get('/test-students/:test_id', (req, res) => {
  db.query(`SELECT u.name FROM results r JOIN users u ON r.student_id = u.id WHERE r.test_id = ?`,
    [req.params.test_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching student data. Please try again later.' });
      }
      res.status(200).json(results);
    });
});

// TEACHER - View available tests
app.get('/available-tests', (req, res) => {
  const query = `
    SELECT 
      t.id AS test_id, 
      t.title AS test_title, 
      q.id AS question_id, 
      q.question_text, 
      q.option_a, 
      q.option_b, 
      q.option_c, 
      q.option_d, 
      q.correct_option
    FROM tests t
    LEFT JOIN questions q ON t.id = q.test_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching available tests. Please try again later.' });
    }

    // Organize the data into a more structured format
    const tests = [];
    
    results.forEach(row => {
      // Check if this test already exists in the array
      let test = tests.find(test => test.id === row.test_id);

      // If the test is not in the array, add it
      if (!test) {
        test = {
          id: row.test_id,
          title: row.test_title,
          questions: []
        };
        tests.push(test);
      }

      // Add the question to the test
      if (row.question_id) {
        test.questions.push({
          id: row.question_id,
          question_text: row.question_text,
          options: {
            A: row.option_a,
            B: row.option_b,
            C: row.option_c,
            D: row.option_d
          },
          correct_option: row.correct_option
        });
      }
    });

    // Return the structured test data with questions
    res.status(200).json(tests);
  });
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
