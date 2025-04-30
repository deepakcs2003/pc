Here are **all the necessary commands and libraries** to set up a basic Node.js backend with routing, MongoDB connection, and CORS support:

---

### ✅ **1. Initialize project**
```bash
mkdir my-backend
cd my-backend
npm init -y
```

---

### ✅ **2. Install necessary libraries**
```bash
npm install express mongoose cors dotenv
```

Explanation:
- `express` – Web framework
- `mongoose` – Connects to MongoDB
- `cors` – Enables Cross-Origin Resource Sharing
- `dotenv` – Loads environment variables from `.env` file

---

### ✅ **3. (Optional) Install dev tool**
```bash
npm install --save-dev nodemon
```

---

### ✅ **4. Setup scripts in `package.json`**
Edit the `scripts` section:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

### ✅ **5. Create `index.js` (main server file)**

```js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => console.log(err));
```

---

### ✅ **6. Create `.env` file**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mydb
```

> Change `MONGO_URI` if you use MongoDB Atlas or other service.

---

### ✅ **7. Run the server**
```bash
npm run dev
```

---

Would you like me to include a basic folder structure and routing example too?