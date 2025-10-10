import mongoose, { Document, Schema } from 'mongoose';

// Interface for Note document
export interface INote extends Document {
  title: string;
  content: string;
  tags: string[];
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Note Schema
const noteSchema = new Schema<INote>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title must be at least 1 character'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    minlength: [1, 'Content must be at least 1 character']
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function(tags: string[]) {
        return tags.every(tag => tag.length > 0 && tag.length <= 50);
      },
      message: 'Each tag must be between 1 and 50 characters'
    }
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Index for faster queries
noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ title: 'text', content: 'text', tags: 'text' }); // Text search index

// Create and export the Note model
const Note = mongoose.model<INote>('Note', noteSchema);

export default Note;

