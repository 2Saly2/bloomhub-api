import { Router } from 'express';
import { auth } from '#@/middlewares/auth.js';
import { permitRoles } from '#@/middlewares/roles.js';
import * as projectService from '#@/modules/project/services/index.js';
import multer from 'multer';
import path from 'path';

// Configure multer to store uploads in src/public/uploads
const uploadDir = path.join(process.cwd(), 'src', 'public', 'uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${timestamp}_${safeName}`);
  }
});
const upload = multer({ storage });

const router = Router();

// Create project (user/admin)
// Create project (user/admin) with optional image upload
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const owner = req.user.id;
    if (req.file) {
      // store public-facing path
      req.body.image = '/uploads/' + req.file.filename;
    }
    const project = await projectService.createProject({ ...req.body, owner });
    return res.status(201).json({ success: true, data: project });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// Get all projects (scoped by user/admin)
router.get('/', async (req, res) => {
  try {
    // If user is not logged in, show public projects only
    const list = await projectService.getAllProjects({ 
      requester: req.user || { role: 'public' } 
    });
    
    // If it's an API request, return JSON
    if (req.xhr || req.headers.accept.includes('application/json')) {
      return res.json({ success: true, data: list });
    }
    
    // Otherwise render the projects view
    return res.render('projects', { 
      projects: list,
      user: req.user || null,
      title: 'Projects'
    });
  } catch (err) {
    if (req.xhr || req.headers.accept.includes('application/json')) {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.render('projects', { 
      error: err.message,
      projects: [],
      user: req.user || null,
      title: 'Projects'
    });
  }
});

// Get by id
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id, req.user);
    return res.json({ success: true, data: project });
  } catch (err) {
    const status = err.message === 'Not Found' ? 404 : err.message === 'Forbidden' ? 403 : 400;
    return res.status(status).json({ success: false, message: err.message });
  }
});

// Update
// Update project with optional image upload
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      req.body.image = '/uploads/' + req.file.filename;
    }
    const updated = await projectService.updateProject(req.params.id, req.body, req.user);
    return res.json({ success: true, data: updated });
  } catch (err) {
    const status = err.message === 'Forbidden' ? 403 : err.message === 'Not Found' ? 404 : 400;
    return res.status(status).json({ success: false, message: err.message });
  }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await projectService.deleteProject(req.params.id, req.user);
    return res.json({ success: true, data: result });
  } catch (err) {
    const status = err.message === 'Forbidden' ? 403 : err.message === 'Not Found' ? 404 : 400;
    return res.status(status).json({ success: false, message: err.message });
  }
});

export default router;

