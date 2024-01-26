const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000; // You can change this port

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace 'your_database_url' with your MongoDB connection string)
mongoose.connect('mongodb://127.0.0.1:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    const newUser = new User({ firstName, lastName, phoneNumber, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
