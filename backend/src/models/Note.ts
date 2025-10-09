import mongoose, { Document, Schema } from 'mongoose';

export interface ITag {
  name: string;
  color?: string;
}

export interface INote extends Document {
  title: string;
  content: string;
  tags: ITag[];
  isPinned: boolean;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
    trim: true,
    maxlength: [20, 'Tag name cannot exceed 20 characters']
  },
  color: {
    type: String,
    default: '#3B82F6', // Default blue color
    match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color']
  }
}, { _id: false });

const NoteSchema = new Schema<INote>({
  title: {
    type: String,
    required: [true, 'Note title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Note content is required'],
    trim: true,
    maxlength: [10000, 'Content cannot exceed 10000 characters']
  },
  tags: [TagSchema],
  isPinned: {
    type: Boolean,
    default: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Note author is required']
  }
}, {
  timestamps: true
});

// Indexes for better performance
NoteSchema.index({ author: 1, createdAt: -1 });
NoteSchema.index({ author: 1, title: 'text', content: 'text' });
NoteSchema.index({ author: 1, 'tags.name': 1 });

// Virtual for formatted date
NoteSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString();
});

// Ensure virtual fields are serialized
NoteSchema.set('toJSON', {
  virtuals: true
});

export const Note = mongoose.model<INote>('Note', NoteSchema);
