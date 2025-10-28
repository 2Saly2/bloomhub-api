import { Project } from '#@/modules/project/model/index.js';

export async function createProject({ name, description, owner }) {
  const project = await Project.create({ name, description, owner });
  return project;
}

export async function getAllProjects(user) {
  if (user.role === 'admin') {
    return await Project.find().populate('owner', 'name email role');
  }
  return await Project.find({ owner: user.userId }).populate('owner', 'name email role');
}

export async function getProjectById(id, user) {
  const project = await Project.findById(id).populate('owner', 'name email role');
  if (!project) throw new Error('Project not found');
  if (user.role !== 'admin' && project.owner._id.toString() !== user.userId) {
    throw new Error('Forbidden: Not your project');
  }
  return project;
}

export async function updateProject(id, data, user) {
  const project = await Project.findById(id);
  if (!project) throw new Error('Project not found');
  if (user.role !== 'admin' && project.owner._id.toString() !== user.userId) {
    throw new Error('Forbidden: Not your project');
  }

  Object.assign(project, data);
  await project.save();
  return project;
}

export async function deleteProject(id, user) {
  const project = await Project.findById(id);
  if (!project) throw new Error('Project not found');
  if (user.role !== 'admin' && project.owner._id.toString() !== user.userId) {
    throw new Error('Forbidden: Not your project');
  }

  await project.remove();
  return { message: 'Project deleted' };
}
