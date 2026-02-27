import { Request, Response } from 'express';
import { prisma } from '../index';

export class BlogController {
  // Get all blog posts with optional filtering and pagination
  static async getAllPosts(req: Request, res: Response) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        category, 
        search,
        isPublished 
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      const where: any = {
        ...(isPublished !== undefined && { isPublished: isPublished === 'true' }),
        ...(category && { category: { contains: category as string, mode: 'insensitive' } }),
        ...(search && {
          OR: [
            { title_en: { contains: search as string, mode: 'insensitive' } },
            { title_ko: { contains: search as string, mode: 'insensitive' } },
            { excerpt_en: { contains: search as string, mode: 'insensitive' } },
            { excerpt_ko: { contains: search as string, mode: 'insensitive' } },
            { content_en: { contains: search as string, mode: 'insensitive' } },
            { content_ko: { contains: search as string, mode: 'insensitive' } },
            { tags: { contains: search as string, mode: 'insensitive' } }
          ]
        })
      };

      const [posts, totalCount] = await Promise.all([
        prisma.blogPost.findMany({
          where,
          include: {
            creator: {
              select: { id: true, username: true, email: true }
            },
            media: true
          },
          orderBy: { publishedAt: 'desc' },
          skip,
          take
        }),
        prisma.blogPost.count({ where })
      ]);

      res.json({
        success: true,
        data: posts,
        pagination: {
          current: Number(page),
          total: Math.ceil(totalCount / take),
          pageSize: take,
          totalItems: totalCount
        }
      });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch blog posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get single blog post by ID
  static async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await prisma.blogPost.findUnique({
        where: { id: Number(id) },
        include: {
          creator: {
            select: { id: true, username: true, email: true }
          },
          media: true
        }
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          error: 'Blog post not found'
        });
      }

      // Increment view count
      await prisma.blogPost.update({
        where: { id: Number(id) },
        data: { viewCount: { increment: 1 } }
      });

      res.json({
        success: true,
        data: post
      });
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch blog post',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get blog post by slug
  static async getPostBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const { lang = 'en' } = req.query;

      const whereCondition = lang === 'ko' && slug 
        ? { slug_ko: slug } 
        : { slug_en: slug };

      const post = await prisma.blogPost.findFirst({
        where: {
          ...whereCondition,
          isPublished: true
        },
        include: {
          creator: {
            select: { id: true, username: true, email: true }
          },
          media: true
        }
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          error: 'Blog post not found'
        });
      }

      // Increment view count
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } }
      });

      res.json({
        success: true,
        data: post
      });
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch blog post',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Create new blog post
  static async createPost(req: Request, res: Response) {
    try {
      const {
        title_en,
        title_ko,
        slug_en,
        slug_ko,
        excerpt_en,
        excerpt_ko,
        content_en,
        content_ko,
        category,
        tags,
        isPublished = false,
        isFeatured = false,
        publishedAt,
        readingTime,
        seoTitle_en,
        seoTitle_ko,
        seoDescription_en,
        seoDescription_ko,
        createdBy
      } = req.body;

      // Check if slug already exists
      const existingPost = await prisma.blogPost.findFirst({
        where: {
          OR: [
            { slug_en: slug_en },
            ...(slug_ko ? [{ slug_ko: slug_ko }] : [])
          ]
        }
      });

      if (existingPost) {
        return res.status(400).json({
          success: false,
          error: 'Slug already exists'
        });
      }

      const post = await prisma.blogPost.create({
        data: {
          title_en,
          title_ko,
          slug_en,
          slug_ko,
          excerpt_en,
          excerpt_ko,
          content_en,
          content_ko,
          category,
          tags,
          isPublished,
          isFeatured,
          publishedAt: publishedAt ? new Date(publishedAt) : (isPublished ? new Date() : null),
          readingTime: readingTime || Math.ceil((content_en?.split(' ').length || 0) / 200) || 1,
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
        data: post,
        message: 'Blog post created successfully'
      });
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create blog post',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update blog post
  static async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Remove id and createdBy from update data
      delete updateData.id;
      delete updateData.createdBy;

      // Convert date fields
      if (updateData.publishedAt) {
        updateData.publishedAt = new Date(updateData.publishedAt);
      }

      const post = await prisma.blogPost.update({
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
        data: post,
        message: 'Blog post updated successfully'
      });
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update blog post',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete blog post
  static async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingPost = await prisma.blogPost.findUnique({
        where: { id: Number(id) }
      });

      if (!existingPost) {
        return res.status(404).json({
          success: false,
          error: 'Blog post not found'
        });
      }

      await prisma.blogPost.delete({
        where: { id: Number(id) }
      });

      res.json({
        success: true,
        message: 'Blog post deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete blog post',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get blog categories
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.blogPost.findMany({
        select: { category: true },
        distinct: ['category']
      });

      const uniqueCategories = categories
        .map(c => c.category)
        .filter(Boolean)
        .sort();

      res.json({
        success: true,
        data: uniqueCategories
      });
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch blog categories',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get popular posts
  static async getPopularPosts(req: Request, res: Response) {
    try {
      const { limit = 5 } = req.query;

      const posts = await prisma.blogPost.findMany({
        where: { isPublished: true },
        include: {
          creator: {
            select: { id: true, username: true }
          }
        },
        orderBy: { viewCount: 'desc' },
        take: Number(limit)
      });

      res.json({
        success: true,
        data: posts
      });
    } catch (error) {
      console.error('Error fetching popular posts:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch popular posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get recent posts
  static async getRecentPosts(req: Request, res: Response) {
    try {
      const { limit = 5 } = req.query;

      const posts = await prisma.blogPost.findMany({
        where: { isPublished: true },
        include: {
          creator: {
            select: { id: true, username: true }
          }
        },
        orderBy: { publishedAt: 'desc' },
        take: Number(limit)
      });

      res.json({
        success: true,
        data: posts
      });
    } catch (error) {
      console.error('Error fetching recent posts:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch recent posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}