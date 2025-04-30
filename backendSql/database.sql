CREATE DATABASE IF NOT EXISTS db;
USE db;

-- Step 2: Create a new MySQL user (if needed)
CREATE USER IF NOT EXISTS '22510097'@'localhost' IDENTIFIED BY '22510097';

-- Step 3: Grant full access to the user for the 'db' database
GRANT ALL PRIVILEGES ON db.* TO '22510097'@'localhost';
FLUSH PRIVILEGES;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher') NOT NULL,  -- role can be 'student' or 'teacher'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_id INT NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option CHAR(1) NOT NULL,
    FOREIGN KEY (test_id) REFERENCES tests(id)
);

-- Student responses
CREATE TABLE student_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    test_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option CHAR(1) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (test_id) REFERENCES tests(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Final score

CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  test_id INT NOT NULL,
  question_id INT NOT NULL,
  selected_option VARCHAR(10) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (test_id) REFERENCES tests(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);
