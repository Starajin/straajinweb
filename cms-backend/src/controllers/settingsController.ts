import { Request, Response } from 'express';
import { prisma } from '../index';

export class SettingsController {
  // Get all settings
  static async getAllSettings(req: Request, res: Response) {
    try {
      const settings = await prisma.siteSetting.findMany({
        orderBy: { key: 'asc' }
      });

      // Convert to key-value object for easier frontend consumption
      const settingsObject = settings.reduce((acc, setting) => {
        acc[setting.key] = {
          value_en: setting.value_en,
          value_ko: setting.value_ko,
          category: setting.category,
          isPublic: setting.isPublic,
          updatedAt: setting.updatedAt
        };
        return acc;
      }, {} as Record<string, any>);

      res.json({
        success: true,
        data: settingsObject
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch settings',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get setting by key
  static async getSettingByKey(req: Request, res: Response) {
    try {
      const { key } = req.params;

      const setting = await prisma.siteSetting.findUnique({
        where: { key: key as string }
      });

      if (!setting) {
        return res.status(404).json({
          success: false,
          error: 'Setting not found'
        });
      }

      res.json({
        success: true,
        data: setting
      });
    } catch (error) {
      console.error('Error fetching setting:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch setting',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update or create setting
  static async upsertSetting(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const { value_en, value_ko, category = 'general', isPublic = true } = req.body;

      const setting = await prisma.siteSetting.upsert({
        where: { key: key as string },
        update: {
          value_en,
          value_ko,
          category,
          isPublic,
          updatedAt: new Date()
        },
        create: {
          key: key as string,
          value_en,
          value_ko,
          category,
          isPublic
        }
      });

      res.json({
        success: true,
        data: setting,
        message: 'Setting updated successfully'
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update setting',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update multiple settings at once
  static async updateMultipleSettings(req: Request, res: Response) {
    try {
      const { settings } = req.body;

      if (!settings || typeof settings !== 'object') {
        return res.status(400).json({
          success: false,
          error: 'Settings object is required'
        });
      }

      const updatePromises = Object.entries(settings).map(([key, settingData]: [string, any]) => {
        return prisma.siteSetting.upsert({
          where: { key },
          update: {
            value_en: settingData.value_en,
            value_ko: settingData.value_ko,
            category: settingData.category || 'general',
            isPublic: settingData.isPublic !== undefined ? settingData.isPublic : true,
            updatedAt: new Date()
          },
          create: {
            key,
            value_en: settingData.value_en,
            value_ko: settingData.value_ko,
            category: settingData.category || 'general',
            isPublic: settingData.isPublic !== undefined ? settingData.isPublic : true
          }
        });
      });

      const updatedSettings = await Promise.all(updatePromises);

      res.json({
        success: true,
        data: updatedSettings,
        message: 'Settings updated successfully'
      });
    } catch (error) {
      console.error('Error updating multiple settings:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update settings',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete setting
  static async deleteSetting(req: Request, res: Response) {
    try {
      const { key } = req.params;

      const existingSetting = await prisma.siteSetting.findUnique({
        where: { key: key as string }
      });

      if (!existingSetting) {
        return res.status(404).json({
          success: false,
          error: 'Setting not found'
        });
      }

      await prisma.siteSetting.delete({
        where: { key: key as string }
      });

      res.json({
        success: true,
        message: 'Setting deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting setting:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete setting',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get contact information
  static async getContactInfo(req: Request, res: Response) {
    try {
      const contactSettings = await prisma.siteSetting.findMany({
        where: {
          key: {
            in: [
              'contact_email',
              'contact_phone',
              'contact_address',
              'contact_office_hours',
              'social_facebook',
              'social_twitter',
              'social_linkedin',
              'social_instagram',
              'social_youtube'
            ]
          }
        }
      });

      const contactInfo = contactSettings.reduce((acc, setting) => {
        acc[setting.key] = {
          en: setting.value_en,
          ko: setting.value_ko
        };
        return acc;
      }, {} as Record<string, any>);

      res.json({
        success: true,
        data: contactInfo
      });
    } catch (error) {
      console.error('Error fetching contact info:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch contact information',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get SEO settings
  static async getSEOSettings(req: Request, res: Response) {
    try {
      const seoSettings = await prisma.siteSetting.findMany({
        where: {
          key: {
            in: [
              'site_title',
              'site_description',
              'site_keywords',
              'og_title',
              'og_description',
              'og_image',
              'twitter_title',
              'twitter_description',
              'twitter_image',
              'google_analytics',
              'google_tag_manager'
            ]
          }
        }
      });

      const seoInfo = seoSettings.reduce((acc, setting) => {
        acc[setting.key] = {
          en: setting.value_en,
          ko: setting.value_ko
        };
        return acc;
      }, {} as Record<string, any>);

      res.json({
        success: true,
        data: seoInfo
      });
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch SEO settings',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}