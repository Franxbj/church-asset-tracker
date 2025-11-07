import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import assetsRouter from './routes/assets.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Basic rate limiting
const limiter = rateLimit({ windowMs: 60*1000, max: 120 });
app.use(limiter);

app.get('/', (req, res) => res.json({ ok: true, message: 'Church Asset Tracker API' }));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter); // admin-only user management
app.use('/api/assets', assetsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
