import { Router } from 'express';
import { ProjectController } from '../controllers/projectController';

const router = Router();

// Get all projects
router.get('/', ProjectController.getAllProjects);

// Get project categories
router.get('/categories', ProjectController.getCategories);

// Get project by slug
router.get('/slug/:slug', ProjectController.getProjectBySlug);

// Get project by ID
router.get('/:id', ProjectController.getProjectById);

// Create new project
router.post('/', ProjectController.createProject);

// Update project
router.put('/:id', ProjectController.updateProject);

// Delete project
router.delete('/:id', ProjectController.deleteProject);

export default router;