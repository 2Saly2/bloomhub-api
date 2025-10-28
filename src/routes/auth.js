import { Router } from 'express';
import { register, login } from '#@/modules/auth/index.js';

const router = Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const data = await login(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
