import { Router } from 'express';
import authRoutes from '#@/routes/auth/index.js';
import projectRoutes from '#@/routes/project/index.js';
import adminRoutes from '#@/routes/admin/index.js';
import * as projectService from '#@/modules/project/services/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    // fetch projects for home (public or user-scoped)
    const projects = await projectService.getAllProjects({ requester: req.user || { role: 'public' } });
    return res.render('home', { user: req.user || null, projects });
  } catch (err) {
    console.error('Failed to load home projects:', err);
    return res.render('home', { user: req.user || null, projects: [] });
  }
});

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/admin', adminRoutes);

export default router;
