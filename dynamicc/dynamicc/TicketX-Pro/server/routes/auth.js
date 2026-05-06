const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const getUsers = () => {
    try {
        const filePath = path.join(__dirname, '../data/users.json');
        if (!fs.existsSync(filePath)) return [];
        return JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        return [];
    }
};

const saveUsers = (data) => {
    fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(data, null, 2));
};

router.post('/register', (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    
    const users = getUsers();
    if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email exists' });
    
    const newUser = { id: Date.now().toString(), name, email, password, phone, wallet: 10000 };
    users.push(newUser);
    saveUsers(users);
    
    // Omit password from response
    const { password: _, ...userNoPwd } = newUser;
    res.status(201).json({ success: true, user: userNoPwd });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    const { password: _, ...userNoPwd } = user;
    res.json({ success: true, user: userNoPwd });
});

module.exports = router;
