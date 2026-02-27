import { Request, Response } from 'express';
import { prisma } from '../index';

export class TeamController {
  // Get all team members with optional filtering and pagination
  static async getAllMembers(req: Request, res: Response) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        department,
        search 
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      const where: any = {
        ...(department && { 
          OR: [
            { department_en: { contains: department as string, mode: 'insensitive' } },
            { department_ko: { contains: department as string, mode: 'insensitive' } }
          ]
        }),
        ...(search && {
          OR: [
            { name_en: { contains: search as string, mode: 'insensitive' } },
            { name_ko: { contains: search as string, mode: 'insensitive' } },
            { position_en: { contains: search as string, mode: 'insensitive' } },
            { position_ko: { contains: search as string, mode: 'insensitive' } },
            { department_en: { contains: search as string, mode: 'insensitive' } },
            { department_ko: { contains: search as string, mode: 'insensitive' } },
            { bio_en: { contains: search as string, mode: 'insensitive' } },
            { bio_ko: { contains: search as string, mode: 'insensitive' } }
          ]
        })
      };

      const [members, totalCount] = await Promise.all([
        prisma.teamMember.findMany({
          where,
          include: {
            creator: {
              select: { id: true, username: true, email: true }
            },
            profileImage: true
          },
          orderBy: { sortOrder: 'asc' },
          skip,
          take
        }),
        prisma.teamMember.count({ where })
      ]);

      res.json({
        success: true,
        data: members,
        pagination: {
          current: Number(page),
          total: Math.ceil(totalCount / take),
          pageSize: take,
          totalItems: totalCount
        }
      });
    } catch (error) {
      console.error('Error fetching team members:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch team members',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get single team member by ID
  static async getMemberById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const member = await prisma.teamMember.findUnique({
        where: { id: Number(id) },
        include: {
          creator: {
            select: { id: true, username: true, email: true }
          },
          profileImage: true
        }
      });

      if (!member) {
        return res.status(404).json({
          success: false,
          error: 'Team member not found'
        });
      }

      res.json({
        success: true,
        data: member
      });
    } catch (error) {
      console.error('Error fetching team member:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch team member',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Create new team member
  static async createMember(req: Request, res: Response) {
    try {
      const {
        name_en,
        name_ko,
        position_en,
        position_ko,
        department_en,
        department_ko,
        bio_en,
        bio_ko,
        email,
        phone,
        linkedinUrl,
        githubUrl,
        twitterUrl,
        skills,
        experience,
        education_en,
        education_ko,
        languages,
        isActive = true,
        isFeatured = false,
        joinDate,
        sortOrder = 0,
        profileImageId,
        createdBy
      } = req.body;

      const member = await prisma.teamMember.create({
        data: {
          name_en,
          name_ko,
          position_en,
          position_ko,
          department_en,
          department_ko,
          bio_en,
          bio_ko,
          email,
          phone,
          linkedinUrl,
          githubUrl,
          twitterUrl,
          skills,
          experience: experience ? Number(experience) : null,
          education_en,
          education_ko,
          languages,
          isActive,
          isFeatured,
          joinDate: joinDate ? new Date(joinDate) : null,
          sortOrder,
          profileImageId: profileImageId ? Number(profileImageId) : null,
          createdBy: Number(createdBy)
        },
        include: {
          creator: {
            select: { id: true, username: true, email: true }
          },
          profileImage: true
        }
      });

      res.status(201).json({
        success: true,
        data: member,
        message: 'Team member created successfully'
      });
    } catch (error) {
      console.error('Error creating team member:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create team member',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update team member
  static async updateMember(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Remove id and createdBy from update data
      delete updateData.id;
      delete updateData.createdBy;

      // Convert date fields
      if (updateData.joinDate) {
        updateData.joinDate = new Date(updateData.joinDate);
      }
      if (updateData.experience) {
        updateData.experience = Number(updateData.experience);
      }
      if (updateData.profileImageId) {
        updateData.profileImageId = Number(updateData.profileImageId);
      }

      const member = await prisma.teamMember.update({
        where: { id: Number(id) },
        data: {
          ...updateData,
          updatedAt: new Date()
        },
        include: {
          creator: {
            select: { id: true, username: true, email: true }
          },
          profileImage: true
        }
      });

      res.json({
        success: true,
        data: member,
        message: 'Team member updated successfully'
      });
    } catch (error) {
      console.error('Error updating team member:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update team member',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete team member
  static async deleteMember(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingMember = await prisma.teamMember.findUnique({
        where: { id: Number(id) }
      });

      if (!existingMember) {
        return res.status(404).json({
          success: false,
          error: 'Team member not found'
        });
      }

      await prisma.teamMember.delete({
        where: { id: Number(id) }
      });

      res.json({
        success: true,
        message: 'Team member deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting team member:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete team member',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get departments list
  static async getDepartments(req: Request, res: Response) {
    try {
      const departments = await prisma.teamMember.findMany({
        where: {
          isActive: true,
          OR: [
            { department_en: { not: null } },
            { department_ko: { not: null } }
          ]
        },
        select: { 
          department_en: true,
          department_ko: true
        },
        distinct: ['department_en']
      });

      const uniqueDepartments = departments
        .map(d => d.department_en)
        .filter(dept => dept)
        .filter((dept, index, self) => self.indexOf(dept) === index);

      res.json({
        success: true,
        data: uniqueDepartments
      });
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch departments',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get team statistics
  static async getTeamStats(req: Request, res: Response) {
    try {
      const [totalMembers, activeMembers, departmentStats] = await Promise.all([
        prisma.teamMember.count(),
        prisma.teamMember.count({ where: { isActive: true } }),
        prisma.teamMember.groupBy({
          by: ['department_en'],
          _count: { id: true },
          where: {
            isActive: true,
            department_en: { not: null }
          }
        })
      ]);

      const stats = {
        total: totalMembers,
        active: activeMembers,
        inactive: totalMembers - activeMembers,
        totalDepartments: departmentStats.filter(d => d.department_en).length,
        byDepartment: departmentStats
          .filter(dc => dc.department_en)
          .map(dc => ({
            department: dc.department_en,
            count: dc._count.id
          }))
      };

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching team statistics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch team statistics',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}