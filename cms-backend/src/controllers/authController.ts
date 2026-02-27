import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthMiddleware, JWTPayload } from '../middleware/auth';
import { PasswordUtils } from '../utils/password';

export class AuthController {
  // User registration
  static async register(req: Request, res: Response) {
    try {
      const {
        username,
        email,
        password,
        role = 'EDITOR'
      } = req.body;

      // Validate required fields
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
          message: 'Username, email, and password are required'
        });
      }

      // Validate password strength
      const passwordValidation = PasswordUtils.validatePassword(password);
      if (!passwordValidation.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Invalid password',
          message: 'Password does not meet requirements',
          details: passwordValidation.errors
        });
      }

      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username },
            { email }
          ]
        }
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'User already exists',
          message: existingUser.username === username 
            ? 'Username already taken' 
            : 'Email already registered'
        });
      }

      // Hash password
      const hashedPassword = await PasswordUtils.hashPassword(password);

      // Create user
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: role as 'ADMIN' | 'EDITOR' | 'VIEWER'
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true
        }
      });

      // Generate tokens
      const tokenPayload: JWTPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      const token = AuthMiddleware.generateToken(tokenPayload);
      const refreshToken = AuthMiddleware.generateRefreshToken(tokenPayload);

      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.status(201).json({
        success: true,
        data: {
          user,
          token,
          refreshToken
        },
        message: 'User registered successfully'
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: 'Registration failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // User login
  static async login(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      // Validate required fields
      if ((!username && !email) || !password) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
          message: 'Username/email and password are required'
        });
      }

      // Find user
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            ...(username ? [{ username }] : []),
            ...(email ? [{ email }] : [])
          ]
        }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication failed',
          message: 'Invalid credentials'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: 'Account disabled',
          message: 'Your account has been disabled. Contact administrator.'
        });
      }

      // Verify password
      const isPasswordValid = await PasswordUtils.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: 'Authentication failed',
          message: 'Invalid credentials'
        });
      }

      // Generate tokens
      const tokenPayload: JWTPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      const token = AuthMiddleware.generateToken(tokenPayload);
      const refreshToken = AuthMiddleware.generateRefreshToken(tokenPayload);

      // Set HTTP-only cookies
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Update last login (optional)
      await prisma.user.update({
        where: { id: user.id },
        data: { updatedAt: new Date() }
      });

      const userResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      };

      res.json({
        success: true,
        data: {
          user: userResponse,
          token,
          refreshToken
        },
        message: 'Login successful'
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Login failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // User logout
  static async logout(req: Request, res: Response) {
    try {
      // Clear cookies
      res.clearCookie('token');
      res.clearCookie('refreshToken');

      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        error: 'Logout failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Refresh token
  static async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          error: 'Refresh token required',
          message: 'No refresh token provided'
        });
      }

      // Verify refresh token
      const decoded = AuthMiddleware.verifyRefreshToken(refreshToken);

      // Verify user still exists and is active
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          isActive: true
        }
      });

      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          error: 'Invalid refresh token',
          message: 'User not found or inactive'
        });
      }

      // Generate new tokens
      const tokenPayload: JWTPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      const newToken = AuthMiddleware.generateToken(tokenPayload);
      const newRefreshToken = AuthMiddleware.generateRefreshToken(tokenPayload);

      // Set new cookies
      res.cookie('token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.json({
        success: true,
        data: {
          token: newToken,
          refreshToken: newRefreshToken
        },
        message: 'Token refreshed successfully'
      });
    } catch (error) {
      console.error('Token refresh error:', error);
      res.status(401).json({
        success: false,
        error: 'Token refresh failed',
        message: 'Invalid refresh token'
      });
    }
  }

  // Get current user profile
  static async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
          message: 'No user context found'
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
          message: 'User profile not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get profile',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update user profile
  static async updateProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
          message: 'No user context found'
        });
      }

      const { username, email } = req.body;
      const updates: any = {};

      if (username) {
        // Check if username is already taken by another user
        const existingUser = await prisma.user.findFirst({
          where: {
            username,
            NOT: { id: req.user.id }
          }
        });

        if (existingUser) {
          return res.status(409).json({
            success: false,
            error: 'Username already taken',
            message: 'Please choose a different username'
          });
        }

        updates.username = username;
      }

      if (email) {
        // Check if email is already taken by another user
        const existingUser = await prisma.user.findFirst({
          where: {
            email,
            NOT: { id: req.user.id }
          }
        });

        if (existingUser) {
          return res.status(409).json({
            success: false,
            error: 'Email already taken',
            message: 'Please choose a different email'
          });
        }

        updates.email = email;
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No updates provided',
          message: 'At least one field must be updated'
        });
      }

      const user = await prisma.user.update({
        where: { id: req.user.id },
        data: updates,
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true
        }
      });

      res.json({
        success: true,
        data: user,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update profile',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Change password
  static async changePassword(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
          message: 'No user context found'
        });
      }

      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
          message: 'Current password and new password are required'
        });
      }

      // Validate new password strength
      const passwordValidation = PasswordUtils.validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Invalid password',
          message: 'New password does not meet requirements',
          details: passwordValidation.errors
        });
      }

      // Get current user with password
      const user = await prisma.user.findUnique({
        where: { id: req.user.id }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
          message: 'User not found'
        });
      }

      // Verify current password
      const isCurrentPasswordValid = await PasswordUtils.comparePassword(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(401).json({
          success: false,
          error: 'Invalid current password',
          message: 'Current password is incorrect'
        });
      }

      // Hash new password
      const hashedNewPassword = await PasswordUtils.hashPassword(newPassword);

      // Update password
      await prisma.user.update({
        where: { id: req.user.id },
        data: { password: hashedNewPassword }
      });

      res.json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to change password',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}