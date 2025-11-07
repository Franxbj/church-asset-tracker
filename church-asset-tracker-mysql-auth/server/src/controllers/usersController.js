import prisma from '../prismaClient.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const createUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { email, password: hashed, name: name || null, role: role || 'data_entry' }
    });
    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true, role: true, name: true, createdAt: true } });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list users' });
  }
};
