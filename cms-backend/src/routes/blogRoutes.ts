import { Router } from 'express';
import { BlogController } from '../controllers/blogController';

const router = Router();

// Get all blog posts
router.get('/', BlogController.getAllPosts);

// Get blog categories
router.get('/categories', BlogController.getCategories);

// Get popular posts
router.get('/popular', BlogController.getPopularPosts);

// Get recent posts
router.get('/recent', BlogController.getRecentPosts);

// Get blog post by slug
router.get('/slug/:slug', BlogController.getPostBySlug);

// Get blog post by ID
router.get('/:id', BlogController.getPostById);

// Create new blog post
router.post('/', BlogController.createPost);

// Update blog post
router.put('/:id', BlogController.updatePost);

// Delete blog post
router.delete('/:id', BlogController.deletePost);

export default router;