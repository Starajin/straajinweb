import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LayoutController {
  // Get header settings
  static async getHeader(req: Request, res: Response) {
    try {
      // First, try to get existing header settings
      let header = await prisma.siteSetting.findFirst({
        where: { key: 'header_settings' }
      });

      if (!header) {
        // Create default header settings if none exist
        const defaultHeaderSettings = {
          siteName: 'StaraJIN',
          tagline: 'Innovative Digital Solutions',
          logo: '/assets/img/logo/logo.png',
          navigationMenu: [
            { id: 1, label: 'Home', url: '/', order: 1, isActive: true },
            { id: 2, label: 'About Us', url: '/about', order: 2, isActive: true },
            { id: 3, label: 'Services', url: '/services', order: 3, isActive: true },
            { id: 4, label: 'Projects', url: '/projects', order: 4, isActive: true },
            { id: 5, label: 'Contact Us', url: '/contact', order: 5, isActive: true },
          ]
        };

        header = await prisma.siteSetting.create({
          data: {
            key: 'header_settings',
            value_en: JSON.stringify(defaultHeaderSettings),
            value_ko: JSON.stringify(defaultHeaderSettings),
          }
        });
      }

      const headerData = JSON.parse(header.value_en);
      res.json({
        success: true,
        data: headerData
      });
    } catch (error) {
      console.error('Error fetching header settings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch header settings'
      });
    }
  }

  // Update header settings
  static async updateHeader(req: Request, res: Response) {
    try {
      const headerData = req.body;

      // Validate required fields
      if (!headerData.siteName) {
        return res.status(400).json({
          success: false,
          message: 'Site name is required'
        });
      }

      // Update or create header settings
      const updatedHeader = await prisma.siteSetting.upsert({
        where: { key: 'header_settings' },
        update: {
          value_en: JSON.stringify(headerData),
          value_ko: JSON.stringify(headerData), // For now, same as English
          updatedAt: new Date()
        },
        create: {
          key: 'header_settings',
          value_en: JSON.stringify(headerData),
          value_ko: JSON.stringify(headerData),
        }
      });

      res.json({
        success: true,
        message: 'Header settings updated successfully',
        data: JSON.parse(updatedHeader.value_en)
      });
    } catch (error) {
      console.error('Error updating header settings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update header settings'
      });
    }
  }

  // Get footer settings
  static async getFooter(req: Request, res: Response) {
    try {
      let footer = await prisma.siteSetting.findFirst({
        where: { key: 'footer_settings' }
      });

      if (!footer) {
        // Create default footer settings if none exist
        const defaultFooterSettings = {
          companyName: 'StaraJIN',
          description: 'We create innovative digital solutions for businesses worldwide.',
          address: '123 Business Street, City, State 12345',
          phone: '+1 (555) 123-4567',
          email: 'info@starajin.com',
          copyright: '© 2025 StaraJIN. All rights reserved.',
          footerLinks: [
            {
              id: 1,
              title: 'Quick Links',
              links: [
                { id: 11, label: 'About Us', url: '/about', isActive: true },
                { id: 12, label: 'Services', url: '/services', isActive: true },
                { id: 13, label: 'Projects', url: '/projects', isActive: true },
              ]
            },
            {
              id: 2,
              title: 'Services',
              links: [
                { id: 21, label: 'Web Development', url: '/services/web', isActive: true },
                { id: 22, label: 'Mobile Apps', url: '/services/mobile', isActive: true },
                { id: 23, label: 'Consulting', url: '/services/consulting', isActive: true },
              ]
            },
            {
              id: 3,
              title: 'Support',
              links: [
                { id: 31, label: 'Contact Us', url: '/contact', isActive: true },
                { id: 32, label: 'FAQ', url: '/faq', isActive: true },
                { id: 33, label: 'Privacy Policy', url: '/privacy', isActive: true },
              ]
            }
          ],
          socialLinks: [
            { id: 1, platform: 'facebook', url: 'https://facebook.com/starajin', isActive: true },
            { id: 2, platform: 'twitter', url: 'https://twitter.com/starajin', isActive: true },
            { id: 3, platform: 'linkedin', url: 'https://linkedin.com/company/starajin', isActive: true },
            { id: 4, platform: 'instagram', url: 'https://instagram.com/starajin', isActive: true },
          ]
        };

        footer = await prisma.siteSetting.create({
          data: {
            key: 'footer_settings',
            value_en: JSON.stringify(defaultFooterSettings),
            value_ko: JSON.stringify(defaultFooterSettings),
          }
        });
      }

      const footerData = JSON.parse(footer.value_en);
      res.json({
        success: true,
        data: footerData
      });
    } catch (error) {
      console.error('Error fetching footer settings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch footer settings'
      });
    }
  }

  // Update footer settings
  static async updateFooter(req: Request, res: Response) {
    try {
      const footerData = req.body;

      // Validate required fields
      if (!footerData.companyName) {
        return res.status(400).json({
          success: false,
          message: 'Company name is required'
        });
      }

      // Update or create footer settings
      const updatedFooter = await prisma.siteSetting.upsert({
        where: { key: 'footer_settings' },
        update: {
          value_en: JSON.stringify(footerData),
          value_ko: JSON.stringify(footerData), // For now, same as English
          updatedAt: new Date()
        },
        create: {
          key: 'footer_settings',
          value_en: JSON.stringify(footerData),
          value_ko: JSON.stringify(footerData),
        }
      });

      res.json({
        success: true,
        message: 'Footer settings updated successfully',
        data: JSON.parse(updatedFooter.value_en)
      });
    } catch (error) {
      console.error('Error updating footer settings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update footer settings'
      });
    }
  }
}