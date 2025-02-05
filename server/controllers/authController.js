const { createUser, findUserByUsername, findUserByGoogleId, updateUserPassword } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
}

exports.register = async (req, res) => {
    console.log('Register endpoint hit'); // Log when the register endpoint is hit
    const { username, email, password } = req.body; // Include email in the request body
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await createUser({ username, email, password: hashedPassword }); // Include email in user creation
        console.log('User created successfully:', user); // Log the created user
        res.status(201).json({ user });
    } catch (error) {
        console.error('Error creating user:', error); // Log any errors
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    console.log('Login endpoint hit'); // Log when the login endpoint is hit
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);
        if (!user) {
            console.log('User not found'); // Log if user is not found
            return res.status(401).json({ message: 'Incorrect username or password.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log('Password mismatch'); // Log if password does not match
            return res.status(401).json({ message: 'Incorrect username or password.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token); // Log the generated token

        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error); // Log any errors
        res.status(400).json({ error: error.message });
    }
};


exports.verifyFirebaseToken = async (req, res, next) => {
    console.log('Verifying Firebase token'); // Log when verifying Firebase token
    const idToken = req.headers.authorization;
    if (!idToken) {
        console.log('No token provided'); // Log if no token is provided
        return res.status(401).send('Unauthorized');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('Token verified, decodedToken:', decodedToken); // Log the decoded token
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error); // Log any errors
        res.status(401).send('Unauthorized');
    }
};
