import express from 'express';
import { login } from '../controllers/authController.js';
const router = express.Router();

// Admin-only registration will be handled by /api/users (admin creates users)
// Public route: login
router.post('/login', login);

export default router;
