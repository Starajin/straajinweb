import { Router } from 'express';
import { TeamController } from '../controllers/teamController';

const router = Router();

// Get all team members
router.get('/', TeamController.getAllMembers);

// Get departments
router.get('/departments', TeamController.getDepartments);

// Get team statistics
router.get('/stats', TeamController.getTeamStats);

// Get team member by ID
router.get('/:id', TeamController.getMemberById);

// Create new team member
router.post('/', TeamController.createMember);

// Update team member
router.put('/:id', TeamController.updateMember);

// Delete team member
router.delete('/:id', TeamController.deleteMember);

export default router;