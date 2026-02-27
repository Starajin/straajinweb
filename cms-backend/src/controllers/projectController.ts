import { Request, Response } from 'express';
import { prisma } from '../index';

export class ProjectController {
  // Get all projects with optional filtering and pagination
  static async getAllProjects(req: Request, res: Response) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        category, 
        status,
        search 
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      const where: any = {
        ...(status && { status: status as string }),
        ...(category && { category: category as string }),
        ...(search && {
          OR: [
            { title_en: { contains: search as string, mode: 'insensitive' } },
            { title_ko: { contains: search as string, mode: 'insensitive' } },
            { description_en: { contains: search as string, mode: 'insensitive' } },
            { description_ko: { contains: search as string, mode: 'insensitive' } },
            { technologies: { contains: search as string, mode: 'insensitive' } }
          ]
        })
      };

      const [projects, totalCount] = await Promise.all([
        prisma.project.findMany({
          where,
          include: {
            creator: {
              select: { id: true, username: true, email: true }
            },
            media: true
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take
        }),
        prisma.project.count({ where })
      ]);

      res.json({
        success: true,
        data: projects,
        pagination: {
          current: Number(page),
          total: Math.ceil(totalCount / take),
          pageSize: take,
          totalItems: totalCount
        }
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch projects',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get single project by ID
  static async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const project = await prisma.project.findUnique({
        where: { id: Number(id) },
        include: {
          creator: {
            select: { id: true, username: true, email: true }
          },
          media: true
        }
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          error: 'Project not found'
        });
      }

      res.json({
        success: true,
        data: project
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch project',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get single project by slug (for public URLs)
  static async getProjectBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;

      // Since our schema doesn't have a slug field, we'll search by title
      const project = await prisma.project.findFirst({
        where: {
          OR: [
            { title_en: { contains: slug } },
            { title_ko: { contains: slug } }
          ],
          isPublished: true
        },
        include: {
          creator: {
            select: { id: true, username: true, email: true }
          },
          media: true
        }
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          error: 'Project not found'
        });
      }

      res.json({
        success: true,
        data: project
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch project',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Create new project
  static async createProject(req: Request, res: Response) {
    try {
      const {
        title_en,
        title_ko,
        description_en,
        description_ko,
        shortDesc_en,
        shortDesc_ko,
        category,
        status = 'ACTIVE',
        location_en,
        location_ko,
        startDate,
        endDate,
        budget,
        clientName_en,
        clientName_ko,
        technologies,
        features_en,
        features_ko,
        challenges_en,
        challenges_ko,
        results_en,
        results_ko,
        projectUrl,
        githubUrl,
        isPublished = true,
        isFeatured = false,
        sortOrder = 0,
        seoTitle_en,
        seoTitle_ko,
        seoDescription_en,
        seoDescription_ko,
        createdBy
      } = req.body;

      const project = await prisma.project.create({
        data: {
          title_en,
          title_ko,
          description_en,
          description_ko,
          shortDesc_en,
          shortDesc_ko,
          category,
          status,
          location_en,
          location_ko,
          startDate: startDate ? new Date(startDate) : null,
          endDate: endDate ? new Date(endDate) : null,
          budget: budget ? parseFloat(budget) : null,
          clientName_en,
          clientName_ko,
          technologies,
          features_en,
          features_ko,
          challenges_en,
          challenges_ko,
          results_en,
          results_ko,
          projectUrl,
          githubUrl,
          isPublished,
          isFeatured,
          sortOrder,
          seoTitle_en,
          seoTitle_ko,
          seoDescription_en,
          seoDescription_ko,
          createdBy: Number(createdBy)
        },
        include: {
          creator: {
            select: { id: true, username: true, email: true }
          },
          media: true
        }
      });

      res.status(201).json({
        success: true,
        data: project,
        message: 'Project created successfully'
      });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create project',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update project
  static async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Remove id and createdBy from update data
      delete updateData.id;
      delete updateData.createdBy;

      // Convert date fields
      if (updateData.startDate) {
        updateData.startDate = new Date(updateData.startDate);
      }
      if (updateData.endDate) {
        updateData.endDate = new Date(updateData.endDate);
      }
      if (updateData.budget) {
        updateData.budget = parseFloat(updateData.budget);
      }

      const project = await prisma.project.update({
        where: { id: Number(id) },
        data: {
          ...updateData,
          updatedAt: new Date()
        },
        include: {
          creator: {
            select: { id: true, username: true, email: true }
          },
          media: true
        }
      });

      res.json({
        success: true,
        data: project,
        message: 'Project updated successfully'
      });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update project',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete project
  static async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingProject = await prisma.project.findUnique({
        where: { id: Number(id) }
      });

      if (!existingProject) {
        return res.status(404).json({
          success: false,
          error: 'Project not found'
        });
      }

      await prisma.project.delete({
        where: { id: Number(id) }
      });

      res.json({
        success: true,
        message: 'Project deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete project',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get project categories (enum values)
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = [
        'MOBILE_APP',
        'WEB_APPLICATION',
        'ENTERPRISE_SOFTWARE',
        'ECOMMERCE',
        'CONSULTING',
        'INFRASTRUCTURE',
        'AI_ML',
        'BLOCKCHAIN',
        'OTHER'
      ];

      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch categories',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get project statistics
  static async getProjectStats(req: Request, res: Response) {
    try {
      const [totalProjects, publishedProjects, categoryStats] = await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { isPublished: true } }),
        prisma.project.groupBy({
          by: ['category'],
          _count: { id: true }
        })
      ]);

      const stats = {
        total: totalProjects,
        published: publishedProjects,
        draft: totalProjects - publishedProjects,
        byCategory: categoryStats.map(stat => ({
          category: stat.category,
          count: stat._count.id
        }))
      };

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching project statistics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch project statistics',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}


