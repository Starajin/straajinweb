import { Request, Response } from 'express';
import { prisma } from '../index';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allow images, documents, and videos
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx|mp4|mov|avi|mkv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, documents, and videos are allowed.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

export class MediaController {
  // Upload single file
  static async uploadSingle(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded'
        });
      }

      const { altText_en, altText_ko, caption_en, caption_ko, uploadedBy = 1 } = req.body;
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

      // Determine media type based on file extension
      const ext = path.extname(req.file.originalname).toLowerCase();
      let mediaCategory: 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO' | 'OTHER' = 'OTHER';
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        mediaCategory = 'IMAGE';
      } else if (['.mp4', '.mov', '.avi', '.mkv'].includes(ext)) {
        mediaCategory = 'VIDEO';
      } else if (['.pdf', '.doc', '.docx'].includes(ext)) {
        mediaCategory = 'DOCUMENT';
      } else if (['.mp3', '.wav', '.aac', '.flac'].includes(ext)) {
        mediaCategory = 'AUDIO';
      }

      // Save to database
      const media = await prisma.media.create({
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          url: fileUrl,
          path: `uploads/${req.file.filename}`,
          category: mediaCategory,
          size: req.file.size,
          mimeType: req.file.mimetype,
          altText_en: altText_en || '',
          altText_ko: altText_ko || '',
          caption_en: caption_en || '',
          caption_ko: caption_ko || '',
          uploadedBy: Number(uploadedBy)
        },
        include: {
          uploader: {
            select: { id: true, username: true, email: true }
          }
        }
      });

      res.status(201).json({
        success: true,
        data: media,
        message: 'File uploaded successfully'
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to upload file',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Upload multiple files
  static async uploadMultiple(req: Request, res: Response) {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No files uploaded'
        });
      }

      const { uploadedBy = 1 } = req.body;
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const uploadedFiles = [];

      for (const file of req.files as Express.Multer.File[]) {
        const fileUrl = `${baseUrl}/uploads/${file.filename}`;

        // Determine media type based on file extension
        const ext = path.extname(file.originalname).toLowerCase();
        let mediaCategory: 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO' | 'OTHER' = 'OTHER';
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          mediaCategory = 'IMAGE';
        } else if (['.mp4', '.mov', '.avi', '.mkv'].includes(ext)) {
          mediaCategory = 'VIDEO';
        } else if (['.pdf', '.doc', '.docx'].includes(ext)) {
          mediaCategory = 'DOCUMENT';
        } else if (['.mp3', '.wav', '.aac', '.flac'].includes(ext)) {
          mediaCategory = 'AUDIO';
        }

        // Save to database
        const media = await prisma.media.create({
          data: {
            filename: file.filename,
            originalName: file.originalname,
            url: fileUrl,
            path: `uploads/${file.filename}`,
            category: mediaCategory,
            size: file.size,
            mimeType: file.mimetype,
            altText_en: '',
            altText_ko: '',
            caption_en: '',
            caption_ko: '',
            uploadedBy: Number(uploadedBy)
          },
          include: {
            uploader: {
              select: { id: true, username: true, email: true }
            }
          }
        });

        uploadedFiles.push(media);
      }

      res.status(201).json({
        success: true,
        data: uploadedFiles,
        message: `${uploadedFiles.length} files uploaded successfully`
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to upload files',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get all media files
  static async getAllMedia(req: Request, res: Response) {
    try {
      const { 
        page = 1, 
        limit = 20, 
        category,
        search 
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      const where: any = {
        ...(category && { category: category as string }),
        ...(search && {
          OR: [
            { originalName: { contains: search as string, mode: 'insensitive' } },
            { altText_en: { contains: search as string, mode: 'insensitive' } },
            { altText_ko: { contains: search as string, mode: 'insensitive' } },
            { caption_en: { contains: search as string, mode: 'insensitive' } },
            { caption_ko: { contains: search as string, mode: 'insensitive' } }
          ]
        })
      };

      const [media, totalCount] = await Promise.all([
        prisma.media.findMany({
          where,
          include: {
            uploader: {
              select: { id: true, username: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take
        }),
        prisma.media.count({ where })
      ]);

      res.json({
        success: true,
        data: media,
        pagination: {
          current: Number(page),
          total: Math.ceil(totalCount / take),
          pageSize: take,
          totalItems: totalCount
        }
      });
    } catch (error) {
      console.error('Error fetching media:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch media',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get media by ID
  static async getMediaById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const media = await prisma.media.findUnique({
        where: { id: Number(id) },
        include: {
          uploader: {
            select: { id: true, username: true, email: true }
          }
        }
      });

      if (!media) {
        return res.status(404).json({
          success: false,
          error: 'Media not found'
        });
      }

      res.json({
        success: true,
        data: media
      });
    } catch (error) {
      console.error('Error fetching media:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch media',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update media metadata
  static async updateMedia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { altText_en, altText_ko, caption_en, caption_ko } = req.body;

      const existingMedia = await prisma.media.findUnique({
        where: { id: Number(id) }
      });

      if (!existingMedia) {
        return res.status(404).json({
          success: false,
          error: 'Media not found'
        });
      }

      const media = await prisma.media.update({
        where: { id: Number(id) },
        data: {
          altText_en,
          altText_ko,
          caption_en,
          caption_ko,
          updatedAt: new Date()
        },
        include: {
          uploader: {
            select: { id: true, username: true, email: true }
          }
        }
      });

      res.json({
        success: true,
        data: media,
        message: 'Media updated successfully'
      });
    } catch (error) {
      console.error('Error updating media:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update media',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete media
  static async deleteMedia(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingMedia = await prisma.media.findUnique({
        where: { id: Number(id) }
      });

      if (!existingMedia) {
        return res.status(404).json({
          success: false,
          error: 'Media not found'
        });
      }

      // Delete file from filesystem
      const filePath = path.join(process.cwd(), 'uploads', existingMedia.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Delete from database
      await prisma.media.delete({
        where: { id: Number(id) }
      });

      res.json({
        success: true,
        message: 'Media deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting media:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete media',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get media statistics
  static async getMediaStats(req: Request, res: Response) {
    try {
      const [totalMedia, imageCount, videoCount, documentCount, totalSize] = await Promise.all([
        prisma.media.count(),
        prisma.media.count({ where: { category: 'IMAGE' } }),
        prisma.media.count({ where: { category: 'VIDEO' } }),
        prisma.media.count({ where: { category: 'DOCUMENT' } }),
        prisma.media.aggregate({
          _sum: { size: true }
        })
      ]);

      const stats = {
        totalFiles: totalMedia,
        images: imageCount,
        videos: videoCount,
        documents: documentCount,
        totalSize: totalSize._sum.size || 0,
        totalSizeMB: Math.round((totalSize._sum.size || 0) / (1024 * 1024) * 100) / 100
      };

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching media statistics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch media statistics',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}