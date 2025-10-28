import { Router } from 'express';
import { auth } from '#@/middlewares/auth.js';
import { 
  createProject, getAllProjects, getProjectById, updateProject, deleteProject 
} from '#@/modules/project/index.js';

const router = Router();

// Create project
router.post('/', auth, async (req, res) => {
  try {
    const project = await createProject({ ...req.body, owner: req.user.userId });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await getAllProjects(req.user);
    res.json(projects);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single project
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await getProjectById(req.params.id, req.user);
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await updateProject(req.params.id, req.body, req.user);
    res.json(project);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await deleteProject(req.params.id, req.user);
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

export default router;
