import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Usermodel';

// Register/Signup User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        token
      }
    });
  } catch (error: any) {
    console.error('Register Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
      return;
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        token
      }
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId; // From auth middleware

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error: any) {
    console.error('Get Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
