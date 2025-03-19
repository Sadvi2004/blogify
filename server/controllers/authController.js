const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ username, password: hashedPassword });
        res.json(user);
    } catch (e) {
        res.status(400).json(e);
    }
}
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: 'Password mismatch' });

        const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Send token in response
        res.json({ id: user._id, username, token });
    } catch (e) {
        res.status(500).json({ message: 'Login Failed', e });
    }
}

exports.profile = (req, res) => {
    res.json(req.user);
}
exports.logout = (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
    res.json({ message: "Logged out successfully" });
};