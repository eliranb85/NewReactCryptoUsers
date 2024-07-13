const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // To handle CORS issues

const usersFilePath = path.join(__dirname, './users.js');

const getUsers = async () => {
    try {
        const data = await fs.readFile(usersFilePath, 'utf-8');
        const users = eval(data); // This will execute the JavaScript code and return the users array
        return users;
    } catch (error) {
        console.error('Error reading users file:', error);
        throw error;
    }
};

const saveUsers = async (users) => {
    try {
        const dataString = `module.exports = ${JSON.stringify(users, null, 2)};`;
        await fs.writeFile(usersFilePath, dataString);
    } catch (error) {
        console.error('Error writing users file:', error);
        throw error;
    }
};

app.post('/saveData', async (req, res) => {
    const dataString = `export const cryptoData = ${JSON.stringify(req.body, null, 2)};`;
    try {
        await fs.writeFile('./data.js', dataString);
        res.status(200).send('Data saved to data.js');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    }
});

app.post('/register', async (req, res) => {
    try {
        const { id, name, username, email, password } = req.body;
        const user = { id, name, username, email, password };

        // Read existing data
        let users = [];
        try {
            users = await getUsers();
        } catch (err) {
            console.log('No existing users file found, creating a new one.', err);
        }

        // Add new user
        users.push(user);

        // Save data to users.js
        await saveUsers(users);
        res.status(200).send('User registered and data saved to users.js');
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).send('Error saving user data');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Read existing users
        const users = await getUsers();

        // Find the user
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('User not found or incorrect password');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        let users = await getUsers();
        users = users.filter(user => user.id !== userId);

        await saveUsers(users);
        res.status(200).send('User deleted');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});

app.delete('/users', async (req, res) => {
    try {
        await saveUsers([]);
        res.status(200).send('All users deleted');
    } catch (error) {
        console.error('Error deleting all users:', error);
        res.status(500).send('Error deleting all users');
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
