import { Router } from 'express';
import authRoutes from '#@/routes/auth.js';
import projectRoutes from '#@/routes/project.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to BloomHub API 🌸' });
});

export default router;
