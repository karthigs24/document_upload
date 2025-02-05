const express = require('express');
const { register, login, verifyFirebaseToken } = require('../controllers/authController');
const { authenticateJwt } = require('../middleware/authMiddleware');
const { checkRole } = require('../utils/roleCheck');
const passport = require('passport');
const { registerSchema } = require('../validationSchemas'); // Make sure to import the validation schema

const router = express.Router();

// Public routes
router.post('/register', async (req, res) => {
    try {
        console.log('Register route hit'); // Log when register route is hit
        registerSchema.parse(req.body); // Validate the request body
        register(req, res); // Call the register function
    } catch (e) {
        console.error('Validation error:', e.errors); // Log any validation errors
        res.status(400).json({ errors: e.errors });
    }
});


router.post('/login', (req, res) => {
    console.log('Login route hit'); // Log when login route is hit
    login(req, res);
});

// Private routes - Apply verifyFirebaseToken middleware here
router.use(verifyFirebaseToken);

router.get('/admin', authenticateJwt, checkRole('admin', 'readAny'), (req, res) => {
    console.log('Admin route hit'); // Log when admin route is hit
    res.send('Admin Access');
});

router.get('/profile', authenticateJwt, checkRole('user', 'readOwn'), (req, res) => {
    console.log('Profile route hit'); // Log when profile route is hit
    res.send('User Profile');
});

module.exports = router;
