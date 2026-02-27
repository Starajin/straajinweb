import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { prisma } from '../index';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        role: string;
      };
    }
  }
}

export interface JWTPayload {
  id: number;
  username: string;
  email: string;
  role: string;
}

export class AuthMiddleware {
  // Generate JWT token
  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h'
    });
  }

  // Generate refresh token
  static generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key', {
      expiresIn: '7d'
    });
  }

  // Verify JWT token
  static verifyToken(token: string): JWTPayload {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as JWTPayload;
  }

  // Verify refresh token
  static verifyRefreshToken(token: string): JWTPayload {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'
    ) as JWTPayload;
  }

  // Middleware to authenticate requests
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : req.cookies?.token;

      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
          message: 'No token provided'
        });
      }

      const decoded = AuthMiddleware.verifyToken(token);
      
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
          error: 'Authentication failed',
          message: 'User not found or inactive'
        });
      }

      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          success: false,
          error: 'Authentication failed',
          message: 'Invalid token'
        });
      }

      console.error('Authentication error:', error);
      return res.status(500).json({
        success: false,
        error: 'Authentication error',
        message: 'Internal server error'
      });
    }
  }

  // Middleware to check user roles
  static authorize(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
          message: 'No user context found'
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          error: 'Access denied',
          message: `Requires one of the following roles: ${roles.join(', ')}`
        });
      }

      next();
    };
  }

  // Middleware for admin only access
  static adminOnly = AuthMiddleware.authorize('ADMIN');

  // Middleware for admin and editor access
  static editorOrAdmin = AuthMiddleware.authorize('ADMIN', 'EDITOR');

  // Optional authentication (doesn't fail if no token)
  static async optionalAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : req.cookies?.token;

      if (token) {
        const decoded = AuthMiddleware.verifyToken(token);
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

        if (user && user.isActive) {
          req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          };
        }
      }

      next();
    } catch (error) {
      // Continue without authentication
      next();
    }
  }
}