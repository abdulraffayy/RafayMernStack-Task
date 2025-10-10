import mongoose, { Document, Schema } from 'mongoose';

// Interface for User document
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters'],
    maxlength: [50, 'Full name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(this: IUser, confirmPassword: string) {
        return confirmPassword === this.password;
      },
      message: 'Passwords do not match'
    }
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
