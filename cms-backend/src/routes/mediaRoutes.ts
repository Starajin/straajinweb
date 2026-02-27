import { Router } from 'express';
import { MediaController, upload } from '../controllers/mediaController';

const router = Router();

// Get all media files
router.get('/', MediaController.getAllMedia);

// Get media statistics
router.get('/stats', MediaController.getMediaStats);

// Get media by ID
router.get('/:id', MediaController.getMediaById);

// Upload single file
router.post('/upload', upload.single('file'), MediaController.uploadSingle);

// Upload multiple files
router.post('/upload-multiple', upload.array('files', 10), MediaController.uploadMultiple);

// Update media metadata
router.put('/:id', MediaController.updateMedia);

// Delete media
router.delete('/:id', MediaController.deleteMedia);

export default router;