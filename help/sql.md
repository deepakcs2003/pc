CREATE DATABASE IF NOT EXISTS db;
USE db;

-- Step 2: Create a new MySQL user (if needed)
CREATE USER IF NOT EXISTS '22510097'@'localhost' IDENTIFIED BY '22510097';

-- Step 3: Grant full access to the user for the 'db' database
GRANT ALL PRIVILEGES ON db.* TO '22510097'@'localhost';
FLUSH PRIVILEGES;

//my sql 
const db = mysql.createConnection({
  host: 'localhost',
  user: '22510097',   // New user created
  password: '22510097',  // Password for the new user
  database: 'test_app'   // Database name
});