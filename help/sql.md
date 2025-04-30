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


Here’s a list of the **most important SQL commands**, grouped by category, with simple explanations:

---

### 🔹 **Data Definition Language (DDL)**  
Used to define and manage **structure** of the database (tables, schemas, etc.)

| Command | Description |
|---------|-------------|
| `CREATE TABLE` | Creates a new table |
| `ALTER TABLE` | Modifies an existing table (add/remove columns) |
| `DROP TABLE` | Deletes a table |
| `TRUNCATE TABLE` | Deletes all data in a table but keeps the structure |
| `CREATE DATABASE` | Creates a new database |
| `DROP DATABASE` | Deletes a database |

---

### 🔹 **Data Manipulation Language (DML)**  
Used to manage **data** inside the tables

| Command | Description |
|---------|-------------|
| `SELECT` | Retrieves data from one or more tables |
| `INSERT INTO` | Adds new data into a table |
| `UPDATE` | Modifies existing data |
| `DELETE` | Deletes data from a table |

---

### 🔹 **Data Control Language (DCL)**  
Used for **permissions** and access control

| Command | Description |
|---------|-------------|
| `GRANT` | Gives user access privileges |
| `REVOKE` | Removes access privileges |

---

### 🔹 **Transaction Control Language (TCL)**  
Used to manage **transactions**

| Command | Description |
|---------|-------------|
| `COMMIT` | Saves all changes made during the current transaction |
| `ROLLBACK` | Undoes changes since the last `COMMIT` |
| `SAVEPOINT` | Sets a point to roll back to without undoing all changes |
| `SET TRANSACTION` | Specifies transaction characteristics |

---

### 🔹 **Other Useful SQL Commands**

| Command | Description |
|---------|-------------|
| `WHERE` | Filters rows based on condition |
| `GROUP BY` | Groups rows that have the same values |
| `HAVING` | Filters groups (used with GROUP BY) |
| `ORDER BY` | Sorts the result in ascending or descending order |
| `JOIN` | Combines rows from two or more tables |
| `UNION` | Combines the result of two queries |
| `IN`, `BETWEEN`, `LIKE`, `IS NULL` | Conditions for filtering data |
| `DISTINCT` | Removes duplicates from results |
| `AS` | Renames a column or table with an alias |

---

Would you like a printable cheat sheet of these commands?