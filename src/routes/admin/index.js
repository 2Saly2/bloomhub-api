import { Router } from 'express';
import { auth } from '#@/middlewares/auth.js';
import { permitRoles } from '#@/middlewares/roles.js';
import * as userService from '#@/modules/auth/services/userManagement.js';
import * as projectService from '#@/modules/project/services/index.js';

const router = Router();

// Admin dashboard page
router.get('/', auth, permitRoles('admin'), async (req, res) => {
  try {
    const [users, projects] = await Promise.all([
      userService.getAllUsers(),
      projectService.getAllProjects({ requester: req.user })
    ]);
    return res.render('dashboard', { users, projects });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    return res.status(500).send('Server error');
  }
});

// User CRUD endpoints
router.post('/users', auth, permitRoles('admin'), async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.json({ success: true, data: user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/users/:id', auth, permitRoles('admin'), async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    return res.json({ success: true, data: user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/users/:id', auth, permitRoles('admin'), async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

export default router;