import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { createUser, listUsers } from '../controllers/usersController.js';

const router = express.Router();

// Admin-only: create and list users
router.post('/', requireAuth, requireRole('admin'), createUser);
router.get('/', requireAuth, requireRole('admin'), listUsers);

export default router;
