const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB Atlas with timeout and IPv4 settings
mongoose.connect('mongodb+srv://portalrumble123_db_user:753699@cluster0.hfqtkqe.mongodb.net/?appName=Cluster0', {
    family: 4,
    serverSelectionTimeoutMS: 30000
})
.then(() => {
    console.log('Database connected successfully 🚀');
})
.catch((err) => {
    console.log('Database connection failed X', err.message);
});

// User Schema & Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists ⚠' });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully ✨', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error X', error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Hello from Saraha App Server!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`);
});