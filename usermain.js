const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'medhini',
  database: 'pro', // Replace with your database username
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

function validateUserId(req, res, next) {
    const userId = parseInt(req.params.id);
    if (!isNaN(userId)) {
      req.userId = userId;
      next();
    } else {
      res.status(400).json({ error: 'Invalid user ID' });
    }
  }
// Create a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
  const values = [newUser.username, newUser.email];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Error creating user' });
    } else {
      newUser.id = result.insertId;
      res.status(201).json(newUser);
    }
  });
});

// Read all users
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Error fetching users' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Read a single user by ID
app.get('/api/users/:id',validateUserId, (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';

  db.query(sql, [req.userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Error fetching user' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Update a user by ID
app.put('/api/users/:id',validateUserId, (req, res) => {
  const updatedUser = req.body;
  const sql = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  const values = [updatedUser.username, updatedUser.email, req.userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Error updating user' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  });
});

// Delete a user by ID
app.delete('/api/users/:id',validateUserId, (req, res) => {
  const sql = 'DELETE FROM users WHERE id = ?';

  db.query(sql, [req.userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Error deleting user' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  });
});


// Rest of your Express.js code





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
