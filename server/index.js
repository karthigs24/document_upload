const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log("No token provided");
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.sendStatus(403); // Forbidden
    }
    console.log("Token verified, user:", user);
    req.user = user;
    next();
  });
};

// User registration 
app.post('/signup', async (req, res) => {
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
  });

  try {
    const validatedData = userSchema.parse(req.body);
    console.log("Validated signup data:", validatedData);
    const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        passwordHistory: [hashedPassword]
      }
    });

    console.log("User created:", user);
    res.status(201).json({ message: 'User created successfully', username: user.name });
  } catch (err) {
    console.log("Signup error:", err);
    res.status(400).json({ error: err.errors });
  }
});

// User login
app.post('/login', async (req, res) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  });

  try {
    const validatedData = loginSchema.parse(req.body);
    console.log("Validated login data:", validatedData);
    const user = await prisma.user.findUnique({ where: { email: validatedData.email } });

    if (!user || !(await bcrypt.compare(validatedData.password, user.password))) {
      console.log("Invalid credentials for email:", validatedData.email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("User logged in, token generated:", token);
    res.json({ token, username: user.name });
  } catch (err) {
    console.log("Login error:", err);
    res.status(400).json({ error: err.errors });
  }
});

// Add Applicant
app.post('/add-applicant', authenticateToken, async (req, res) => {
  const applicantSchema = z.object({
    name: z.string()
  });

  try {
    const validatedData = applicantSchema.parse(req.body);
    console.log("Validated applicant data:", validatedData);

    const applicant = await prisma.applicant.create({
      data: {
        name: validatedData.name,
        userId: req.user.userId
      }
    });

    console.log("Applicant added:", applicant);
    res.status(201).json({ message: 'Applicant added successfully', applicant });
  } catch (err) {
    console.log("Add applicant error:", err);
    res.status(400).json({ error: err.errors });
  }
});

// Get all applicants for the authenticated user
app.get('/applicants', authenticateToken, async (req, res) => {
  try {
    console.log("Fetching applicants for user:", req.user.userId);
    const applicants = await prisma.applicant.findMany({
      where: {
        userId: req.user.userId
      }
    });
    console.log("Applicants fetched:", applicants);
    res.json(applicants);
  } catch (err) {
    console.log("Get applicants error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
