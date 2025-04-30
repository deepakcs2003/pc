Make changes in  yaml
1.data_file
2.listen_addreess
3.rpc_address
4.cluster_name
5.In Cassandra .bat file change the port address (JAMX) something .
6.If Cluster not works delete data file and again run cluster (this might solve issues)
7.Run 3 Nodes
8.Cluster Will Be Stated


JAVA_HOME


command of classsandra

Here’s an enhanced version of the **Cassandra commands list**, providing more detailed explanations and examples to make it even clearer:

---

## 🚀 **Enhanced Cassandra Commands with Explanations**

### 1. **`cqlsh`**
   - **Why**: Launches the Cassandra Query Language Shell (CQLSH), which allows you to interact with your Cassandra database directly from the command line.
   - **Usage**: Simply type `cqlsh` to open the command line interface to execute CQL queries.

### 2. **`CREATE KEYSPACE keyspace_name WITH replication = {'class' : 'SimpleStrategy', 'replication_factor' : 3};`**
   - **Why**: Creates a new keyspace in Cassandra. A keyspace in Cassandra is like a database in traditional RDBMS, and it defines how data will be replicated across nodes.
   - **Example**:
     ```cql
     CREATE KEYSPACE my_keyspace WITH replication = {'class' : 'SimpleStrategy', 'replication_factor' : 3};
     ```
   - **Explanation**: 
     - `SimpleStrategy`: A replication strategy (best for a single data center).
     - `replication_factor: 3`: This means there will be 3 replicas of your data across different nodes.

### 3. **`USE keyspace_name;`**
   - **Why**: Switches the active context to a specific keyspace, allowing you to run queries against it.
   - **Example**:
     ```cql
     USE my_keyspace;
     ```

### 4. **`CREATE TABLE table_name (column1 type, column2 type, ...);`**
   - **Why**: Creates a new table to store data in your keyspace. The table's schema is defined by columns and their data types.
   - **Example**:
     ```cql
     CREATE TABLE users (
         user_id UUID PRIMARY KEY,
         username TEXT,
         email TEXT
     );
     ```
   - **Explanation**: This creates a `users` table with `user_id` as the primary key. Primary keys in Cassandra ensure that each row is unique.

### 5. **`INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);`**
   - **Why**: Inserts data into a specific table. This command requires that you define values for all non-nullable columns.
   - **Example**:
     ```cql
     INSERT INTO users (user_id, username, email)
     VALUES (uuid(), 'john_doe', 'john.doe@example.com');
     ```
   - **Explanation**: The `uuid()` function generates a unique identifier for the `user_id`.

### 6. **`SELECT * FROM table_name;`**
   - **Why**: Retrieves all the rows from the specified table.
   - **Example**:
     ```cql
     SELECT * FROM users;
     ```
   - **Explanation**: This will display all rows and columns from the `users` table.

### 7. **`DESCRIBE TABLE table_name;`**
   - **Why**: Shows the schema of a table, including column names and data types.
   - **Example**:
     ```cql
     DESCRIBE TABLE users;
     ```
   - **Explanation**: This will output the structure of the `users` table, displaying the columns and their respective data types.

### 8. **`UPDATE table_name SET column_name = new_value WHERE primary_key_column = key_value;`**
   - **Why**: Updates existing data in the table. This operation requires specifying the primary key (or part of it) to locate the row.
   - **Example**:
     ```cql
     UPDATE users
     SET email = 'john.doe@newdomain.com'
     WHERE user_id = 5b9c5b64-e2b5-4bfc-bf5d-9e58d4f77c94;
     ```
   - **Explanation**: This updates the `email` column for a user with a specific `user_id`.

### 9. **`DELETE FROM table_name WHERE primary_key_column = key_value;`**
   - **Why**: Deletes data from the table based on the primary key. In Cassandra, you must use the primary key to specify which row to delete.
   - **Example**:
     ```cql
     DELETE FROM users WHERE user_id = 5b9c5b64-e2b5-4bfc-bf5d-9e58d4f77c94;
     ```
   - **Explanation**: This will delete the row in the `users` table that matches the given `user_id`.

### 10. **`DROP TABLE table_name;`**
   - **Why**: Removes a table from the keyspace entirely. Use this command cautiously as it will permanently delete the table and all data inside it.
   - **Example**:
     ```cql
     DROP TABLE users;
     ```
   - **Explanation**: This deletes the `users` table from the keyspace, removing all the data.

### 11. **`DROP KEYSPACE keyspace_name;`**
   - **Why**: Deletes the entire keyspace and all tables and data inside it. This is useful for cleanup or removing unused keyspaces.
   - **Example**:
     ```cql
     DROP KEYSPACE my_keyspace;
     ```
   - **Explanation**: This command will delete the `my_keyspace` keyspace and all the tables and data it contains.

### 12. **`SHOW TABLES;`**
   - **Why**: Lists all the tables within the current keyspace.
   - **Example**:
     ```cql
     SHOW TABLES;
     ```
   - **Explanation**: Displays a list of all tables in the currently selected keyspace.

### 13. **`EXIT;`**
   - **Why**: Exits the `cqlsh` session and returns you to the command line or terminal.
   - **Example**:
     ```cql
     EXIT;
     ```

---

### **Example Workflow:**
1. **Create a Keyspace:**
   ```cql
   CREATE KEYSPACE example_keyspace WITH replication = {'class' : 'SimpleStrategy', 'replication_factor' : 3};
   ```

2. **Switch to the Keyspace:**
   ```cql
   USE example_keyspace;
   ```

3. **Create a Table:**
   ```cql
   CREATE TABLE users (
       user_id UUID PRIMARY KEY,
       username TEXT,
       email TEXT
   );
   ```

4. **Insert Data:**
   ```cql
   INSERT INTO users (user_id, username, email) VALUES (uuid(), 'alice', 'alice@example.com');
   ```

5. **Query Data:**
   ```cql
   SELECT * FROM users;
   ```

6. **Update Data:**
   ```cql
   UPDATE users SET email = 'alice@newdomain.com' WHERE user_id = <uuid_of_alice>;
   ```

7. **Delete Data:**
   ```cql
   DELETE FROM users WHERE user_id = <uuid_of_alice>;
   ```

8. **Drop the Table:**
   ```cql
   DROP TABLE users;
   ```

9. **Drop the Keyspace:**
   ```cql
   DROP KEYSPACE example_keyspace;
   ```

---

These **Cassandra commands** provide a comprehensive yet simplified overview for common operations like managing keyspaces, tables, inserting/updating data, and cleaning up. If you need more advanced queries or further details, feel free to ask!   