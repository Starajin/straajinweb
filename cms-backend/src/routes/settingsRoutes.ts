import { Router } from 'express';
import { SettingsController } from '../controllers/settingsController';

const router = Router();

// Get all settings
router.get('/', SettingsController.getAllSettings);

// Get contact information
router.get('/contact', SettingsController.getContactInfo);

// Get SEO settings
router.get('/seo', SettingsController.getSEOSettings);

// Get setting by key
router.get('/:key', SettingsController.getSettingByKey);

// Update or create setting
router.put('/:key', SettingsController.upsertSetting);

// Update multiple settings
router.post('/bulk', SettingsController.updateMultipleSettings);

// Delete setting
router.delete('/:key', SettingsController.deleteSetting);

export default router;