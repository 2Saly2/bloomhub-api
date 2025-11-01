import Project from '../model/index.js';

/**
 * Create project
 */
export const createProject = async (data) => {
  const project = new Project(data);
  await project.save();
  return project;
};

/**
 * Get all projects (admin sees all, user sees own, public sees all)
 */
export const getAllProjects = async ({ requester }) => {
  // If admin, see all projects
  if (requester.role === 'admin') {
    return Project.find().populate('owner', 'username');
  }
  
  // If logged in user, see own projects
  if (requester.id) {
    return Project.find({ owner: requester.id }).populate('owner', 'username');
  }
  
  // If public/not logged in, see all projects but no sensitive info
  return Project.find()
    .populate('owner', 'username')
    .select('-private -internal'); // Exclude any private fields
};

/**
 * Get project by ID
 */
export const getProjectById = async (id, requester) => {
  const project = await Project.findById(id);
  if (!project) throw new Error('Not Found');
  if (requester.role !== 'admin' && project.owner.toString() !== requester.id)
    throw new Error('Forbidden');
  return project;
};

/**
 * Update project
 */
export const updateProject = async (id, data, requester) => {
  const project = await Project.findById(id);
  if (!project) throw new Error('Not Found');
  if (requester.role !== 'admin' && project.owner.toString() !== requester.id)
    throw new Error('Forbidden');

  Object.assign(project, data);
  await project.save();
  return project;
};

/**
 * Delete project
 */
export const deleteProject = async (id, requester) => {
  const project = await Project.findById(id);
  if (!project) throw new Error('Not Found');
  if (requester.role !== 'admin' && project.owner.toString() !== requester.id)
    throw new Error('Forbidden');

  // Use model-level deletion to avoid relying on deprecated/removed document methods
  await Project.findByIdAndDelete(id);
  return { message: 'Project deleted successfully' };
};
